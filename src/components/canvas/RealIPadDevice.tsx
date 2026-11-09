import React, { useMemo } from 'react';
import * as THREE from 'three';

export interface RealIPadProps {
  screenTexture: THREE.CanvasTexture;
  isHero: boolean;
}

// iPad Pro 13" (M4): 281.6 x 215.5 x 5.1 mm  →  1 unit ≈ 85 mm
const W = 3.31;
const H = 2.535;
const D = 0.06;
const BODY_R = 0.17;
const BEZEL = 0.078;
const SCREEN_R = 0.11;

function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

function makeAppleLogoTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const g = c.getContext('2d')!;
  g.clearRect(0, 0, 256, 256);
  g.fillStyle = '#f2f3f5';
  // body
  g.beginPath();
  g.moveTo(128, 82);
  g.bezierCurveTo(108, 62, 62, 76, 66, 134);
  g.bezierCurveTo(70, 186, 104, 222, 122, 218);
  g.bezierCurveTo(128, 216, 130, 214, 136, 218);
  g.bezierCurveTo(156, 224, 190, 190, 192, 142);
  g.bezierCurveTo(176, 136, 168, 104, 186, 92);
  g.bezierCurveTo(170, 72, 142, 70, 128, 82);
  g.fill();
  // leaf
  g.beginPath();
  g.moveTo(128, 78);
  g.bezierCurveTo(124, 54, 142, 34, 166, 32);
  g.bezierCurveTo(168, 56, 152, 76, 128, 78);
  g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export const RealIPadDevice: React.FC<RealIPadProps> = ({ screenTexture, isHero }) => {
  const bodyGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(roundedRectShape(W - 0.04, H - 0.04, BODY_R), {
      depth: D - 0.04,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 6,
      curveSegments: 40,
    });
    geo.translate(0, 0, -(D - 0.04) / 2);
    return geo;
  }, []);

  const glassGeo = useMemo(
    () => new THREE.ShapeGeometry(roundedRectShape(W - 0.035, H - 0.035, BODY_R - 0.015), 40),
    []
  );

  const screenGeo = useMemo(() => {
    const sw = W - BEZEL * 2;
    const sh = H - BEZEL * 2;
    const geo = new THREE.ShapeGeometry(roundedRectShape(sw, sh, SCREEN_R), 40);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const uv = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      uv[i * 2] = pos.getX(i) / sw + 0.5;
      uv[i * 2 + 1] = pos.getY(i) / sh + 0.5;
    }
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    return geo;
  }, []);

  const logoTex = useMemo(() => makeAppleLogoTexture(), []);
  const front = D / 2 + 0.0005;

  return (
    <group>
      {/* Aluminium unibody with real bevelled edges */}
      <mesh geometry={bodyGeo}>
        <meshPhysicalMaterial
          color={isHero ? '#d4d7dc' : '#a5a9b0'}
          metalness={0.7}
          roughness={0.42}
          clearcoat={0.2}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Black front glass */}
      <mesh geometry={glassGeo} position={[0, 0, front]}>
        <meshPhysicalMaterial
          color="#020203"
          roughness={0.04}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.03}
        />
      </mesh>

      {/* Tandem OLED panel with rounded corners */}
      <mesh geometry={screenGeo} position={[0, 0, front + 0.001]}>
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>

      {/* Front camera, ambient light sensor (landscape top bezel) */}
      <mesh position={[0, H / 2 - BEZEL / 2, front + 0.002]}>
        <circleGeometry args={[0.014, 20]} />
        <meshStandardMaterial color="#05060a" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[-0.07, H / 2 - BEZEL / 2, front + 0.002]}>
        <circleGeometry args={[0.005, 12]} />
        <meshBasicMaterial color="#10131a" />
      </mesh>

      {/* Top edge: power/Touch ID button + Pencil Pro charge strip */}
      <mesh position={[W / 2 - 0.55, H / 2 + 0.004, 0]}>
        <boxGeometry args={[0.2, 0.012, 0.036]} />
        <meshPhysicalMaterial color="#c9ccd2" metalness={1} roughness={0.25} />
      </mesh>
      <mesh position={[-0.6, H / 2 + 0.003, 0]}>
        <boxGeometry args={[1.25, 0.006, 0.02]} />
        <meshStandardMaterial color="#6b7079" metalness={0.9} roughness={0.5} />
      </mesh>

      {/* Right edge: volume rocker */}
      <mesh position={[W / 2 + 0.004, 0.55, 0]}>
        <boxGeometry args={[0.012, 0.18, 0.036]} />
        <meshPhysicalMaterial color="#c9ccd2" metalness={1} roughness={0.25} />
      </mesh>
      <mesh position={[W / 2 + 0.004, 0.3, 0]}>
        <boxGeometry args={[0.012, 0.18, 0.036]} />
        <meshPhysicalMaterial color="#c9ccd2" metalness={1} roughness={0.25} />
      </mesh>

      {/* Left edge: USB-C / Thunderbolt port + speaker grilles */}
      <mesh position={[-W / 2 - 0.002, -0.9, 0]}>
        <boxGeometry args={[0.008, 0.2, 0.026]} />
        <meshBasicMaterial color="#030304" />
      </mesh>
      {[-0.35, 0.35].map((y) => (
        <mesh key={`sl${y}`} position={[-W / 2 - 0.002, y, 0]}>
          <boxGeometry args={[0.008, 0.28, 0.014]} />
          <meshBasicMaterial color="#17191d" />
        </mesh>
      ))}
      {[-0.35, 0.35].map((y) => (
        <mesh key={`sr${y}`} position={[W / 2 + 0.002, y - 0.62, 0]}>
          <boxGeometry args={[0.008, 0.28, 0.014]} />
          <meshBasicMaterial color="#17191d" />
        </mesh>
      ))}

      {/* Back: Apple logo */}
      <mesh position={[0, 0, -D / 2 - 0.0015]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.34, 0.34]} />
        <meshBasicMaterial map={logoTex} transparent toneMapped={false} />
      </mesh>

      {/* Back: camera module in the corner (seen from the back) */}
      <group position={[W / 2 - 0.36, H / 2 - 0.36, -D / 2 - 0.012]} rotation={[0, Math.PI, 0]}>
        <mesh>
          <boxGeometry args={[0.38, 0.38, 0.022]} />
          <meshPhysicalMaterial color="#c4c8cf" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* glass plateau */}
        <mesh position={[0, 0, 0.0125]}>
          <planeGeometry args={[0.35, 0.35]} />
          <meshPhysicalMaterial color="#2a2d34" roughness={0.08} metalness={0.4} clearcoat={1} />
        </mesh>
        {/* 12MP wide */}
        <mesh position={[-0.07, 0.07, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.012, 32]} />
          <meshPhysicalMaterial color="#1b1d22" metalness={1} roughness={0.25} />
        </mesh>
        <mesh position={[-0.07, 0.07, 0.027]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.004, 32]} />
          <meshPhysicalMaterial color="#05070b" roughness={0.02} metalness={0.5} clearcoat={1} />
        </mesh>
        {/* Flash */}
        <mesh position={[0.085, 0.085, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.006, 24]} />
          <meshStandardMaterial color="#f4e7c2" emissive="#d9c88f" emissiveIntensity={0.4} />
        </mesh>
        {/* LiDAR / mic */}
        <mesh position={[0.085, -0.07, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 0.006, 20]} />
          <meshBasicMaterial color="#050608" />
        </mesh>
      </group>

      {/* Back: Smart Connector pins */}
      <group position={[0, -0.9, -D / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
        {[-0.05, 0, 0.05].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <circleGeometry args={[0.01, 12]} />
            <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
