import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uAssemble;
  uniform float uScale;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uRepel;
  attribute vec3 aScatter;
  attribute vec3 aColor;
  attribute float aRnd;
  attribute float aSize;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vBoost;

  void main() {
    vec3 p = position;
    float t = clamp(uAssemble * 1.5 - aRnd * 0.5, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 3.0);
    p = mix(aScatter, p, t);

    p.z += sin(uTime * 0.9 + aRnd * 18.0) * 0.008;
    p.xy += vec2(sin(uTime * 0.65 + aRnd * 24.0), cos(uTime * 0.55 + aRnd * 15.0)) * 0.0022;

    vec2 d = p.xy - uMouse;
    float dist = length(d);
    float f = exp(-dist * dist * 28.0) * uRepel;
    vec2 dir = d / max(dist, 0.0001);
    p.xy += dir * f * 0.16 + vec2(-dir.y, dir.x) * f * 0.07 * (aRnd - 0.5);
    p.z += f * 0.28 * (aRnd - 0.2);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * uScale * uPixelRatio * (5.0 / -mv.z) * (1.0 + f * 0.55);
    gl_Position = projectionMatrix * mv;
    vColor = aColor;
    vAlpha = mix(0.0, 1.0, t);
    vBoost = f;
  }
`;

const FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vBoost;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.08, d);
    vec3 col = mix(vColor, vec3(1.0, 0.26, 0.18), clamp(vBoost * 0.65, 0.0, 0.75));
    gl_FragColor = vec4(col, a * vAlpha);
  }
`;

interface ParticleData {
  position: Float32Array;
  scatter: Float32Array;
  color: Float32Array;
  rnd: Float32Array;
  size: Float32Array;
  count: number;
}

const PORTRAIT_SIZE = 3.35;
const GRID = 260;

function buildParticles(img: HTMLImageElement): ParticleData {
  const canvas = document.createElement('canvas');
  canvas.width = GRID;
  canvas.height = GRID;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('2D context unavailable');
  ctx.drawImage(img, 0, 0, GRID, GRID);
  const data = ctx.getImageData(0, 0, GRID, GRID).data;

  const pos: number[] = [];
  const scat: number[] = [];
  const col: number[] = [];
  const rnd: number[] = [];
  const size: number[] = [];

  for (let y = 0; y < GRID; y += 1) {
    for (let x = 0; x < GRID; x += 1) {
      const i = (y * GRID + x) * 4;
      const a = data[i + 3] / 255;
      if (a < 0.45) continue;

      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      // Keep every foreground pixel on the grid so facial features (eyes, brows, nose, lips) have zero missing holes
      const px = (x / GRID - 0.5) * PORTRAIT_SIZE + (Math.random() - 0.5) * 0.0035;
      const py = -(y / GRID - 0.5) * PORTRAIT_SIZE + (Math.random() - 0.5) * 0.0035;
      pos.push(px, py, 0);

      const angle = Math.random() * Math.PI * 2;
      const radius = 2.0 + Math.random() * 2.8;
      scat.push(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.72, (Math.random() - 0.5) * 3.8);

      // Preserve natural skin/hair/suit tones with slight studio contrast lift; sprinkle subtle red rim sparks on outer silhouette
      const isEdge = a < 0.82 && Math.random() < 0.22;
      if (isEdge) {
        col.push(1.0, 0.22, 0.15);
      } else {
        const contrast = Math.pow(lum, 0.92);
        const m = 0.78;
        const baseLift = 0.05;
        col.push(
          Math.min(1, (contrast * (1 - m) + r * m) * 1.08 + baseLift),
          Math.min(1, (contrast * (1 - m) + g * m) * 1.08 + baseLift),
          Math.min(1, (contrast * (1 - m) + b * m) * 1.08 + baseLift)
        );
      }

      rnd.push(Math.random());
      size.push(1.05 + lum * 0.68);
    }
  }

  return {
    position: new Float32Array(pos),
    scatter: new Float32Array(scat),
    color: new Float32Array(col),
    rnd: new Float32Array(rnd),
    size: new Float32Array(size),
    count: rnd.length,
  };
}

const Portrait: React.FC<{ reduced: boolean }> = ({ reduced }) => {
  const [data, setData] = useState<ParticleData | null>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2(9, 9));
  const lastPointer = useRef(new THREE.Vector2(0, 0));
  const repel = useRef(0);
  const { size, viewport, camera } = useThree();

  useEffect(() => {
    const img = new Image();
    img.src = '/ritik-cutout.png';
    img.onload = () => setData(buildParticles(img));
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAssemble: { value: 0 },
      uScale: { value: 1 },
      uPixelRatio: { value: 1 },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uRepel: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    if (!data) return;
    if (reduced) {
      uniforms.uAssemble.value = 1;
      return;
    }
    const tween = gsap.to(uniforms.uAssemble, { value: 1, duration: 2.4, ease: 'power2.out', delay: 0.12 });
    return () => {
      tween.kill();
    };
  }, [data, reduced, uniforms]);

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uPixelRatio.value = state.gl.getPixelRatio();
    uniforms.uScale.value = (size.height / 900) * (size.width > 900 ? 4.1 : 3.3);

    const cam = camera as THREE.PerspectiveCamera;
    const visH = 2 * Math.tan((cam.fov * Math.PI) / 360) * cam.position.z;
    const visW = visH * (size.width / size.height);
    const s = Math.min(1.08, (visW * 1.04) / PORTRAIT_SIZE);
    if (groupRef.current) {
      groupRef.current.scale.setScalar(s);
      groupRef.current.position.y = size.width < 760 ? -0.22 : -0.08;
    }

    if (!reduced) {
      const wx = (state.pointer.x * visW) / 2 / s;
      const wy = ((state.pointer.y * visH) / 2 - (groupRef.current?.position.y ?? 0)) / s;
      mouse.current.lerp(new THREE.Vector2(wx, wy), 1 - Math.pow(0.0005, delta));
      uniforms.uMouse.value.copy(mouse.current);

      const moveDist = Math.hypot(
        state.pointer.x - lastPointer.current.x,
        state.pointer.y - lastPointer.current.y
      );
      lastPointer.current.set(state.pointer.x, state.pointer.y);
      const velocityBoost = Math.min(1, moveDist * 28);
      repel.current = Math.max(velocityBoost, repel.current * Math.pow(0.12, delta));
      uniforms.uRepel.value = repel.current;
    }
    void viewport;
  });

  if (!data) return null;

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.position, 3]} />
          <bufferAttribute attach="attributes-aScatter" args={[data.scatter, 3]} />
          <bufferAttribute attach="attributes-aColor" args={[data.color, 3]} />
          <bufferAttribute attach="attributes-aRnd" args={[data.rnd, 1]} />
          <bufferAttribute attach="attributes-aSize" args={[data.size, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          vertexShader={VERTEX}
          fragmentShader={FRAGMENT}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export const PortraitParticles: React.FC<{ reduced: boolean }> = ({ reduced }) => (
  <Canvas
    className="portrait-canvas"
    dpr={[1, 2]}
    camera={{ position: [0, 0, 5], fov: 35 }}
    gl={{ antialias: true, alpha: true }}
    aria-hidden="true"
  >
    <Portrait reduced={reduced} />
  </Canvas>
);
