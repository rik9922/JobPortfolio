import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const W = 1024;
const H = 640;

/** Abstract, project-free visual per capability (index matches CAPABILITY_ITEMS). */
function drawScreen(ctx: CanvasRenderingContext2D, idx: number, accent: string, label: string) {
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0c0d14');
  bg.addColorStop(1, '#050508');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle architectural grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  for (let gx = 64; gx < W; gx += 64) {
    ctx.beginPath();
    ctx.moveTo(gx, 54);
    ctx.lineTo(gx, H);
    ctx.stroke();
  }
  for (let gy = 110; gy < H; gy += 64) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(W, gy);
    ctx.stroke();
  }

  // Window chrome header
  ctx.fillStyle = '#161822';
  ctx.fillRect(0, 0, W, 56);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  ctx.moveTo(0, 56);
  ctx.lineTo(W, 56);
  ctx.stroke();

  ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(34 + i * 26, 28, 7.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Capability index pill
  ctx.fillStyle = accent;
  ctx.font = '800 18px Syne, sans-serif';
  ctx.fillText(`0${idx + 1}`, 130, 34);

  ctx.fillStyle = '#e8eaf2';
  ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(label, 172, 34);

  ctx.fillStyle = accent;
  ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('VERIFIED STAGE', W - 165, 34);

  ctx.save();
  ctx.translate(0, 56);
  const h = H - 56;
  ctx.strokeStyle = accent;
  ctx.fillStyle = accent;
  ctx.lineWidth = 3.2;

  // Radial glow behind active graphic
  const glow = ctx.createRadialGradient(W / 2, h / 2, 10, W / 2, h / 2, 260);
  glow.addColorStop(0, `${accent}33`);
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, h);
  ctx.fillStyle = accent;

  if (idx === 0) {
    // Prism / multi-angle rays
    for (let i = 0; i < 9; i += 1) {
      ctx.globalAlpha = 0.24 + i * 0.08;
      ctx.beginPath();
      ctx.moveTo(W / 2, 66);
      ctx.lineTo(120 + i * 98, h - 64);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(W / 2, 66);
    ctx.lineTo(W / 2 - 165, h - 145);
    ctx.lineTo(W / 2 + 165, h - 145);
    ctx.closePath();
    ctx.stroke();
  } else if (idx === 1) {
    // Layered DOM & automation tracks
    for (let i = 0; i < 6; i += 1) {
      ctx.globalAlpha = 0.32 + i * 0.11;
      const w = 540 - i * 38;
      ctx.fillRect(130 + i * 22, 54 + i * 62, w * (0.55 + (i % 3) * 0.15), 28);
      ctx.fillStyle = '#e8e8ee';
      ctx.fillRect(130 + i * 22, 90 + i * 62, w * 0.32, 9);
      ctx.fillStyle = accent;
    }
    ctx.globalAlpha = 1;
  } else if (idx === 2) {
    // Request <-> Response contract validation
    ctx.strokeRect(90, 110, 250, 260);
    ctx.strokeRect(W - 340, 110, 250, 260);
    ctx.fillStyle = '#e8eaf2';
    ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('CLIENT / API', 155, 92);
    ctx.fillText('SCHEMA / SQL', W - 280, 92);
    ctx.fillStyle = accent;
    for (let i = 0; i < 4; i += 1) {
      ctx.globalAlpha = 0.92 - i * 0.16;
      ctx.beginPath();
      ctx.moveTo(360, 162 + i * 52);
      ctx.lineTo(W - 360, 162 + i * 52);
      ctx.stroke();
      ctx.beginPath();
      const x = i % 2 === 0 ? W - 360 : 360;
      const dir = i % 2 === 0 ? -1 : 1;
      ctx.moveTo(x, 162 + i * 52);
      ctx.lineTo(x + dir * 16, 152 + i * 52);
      ctx.lineTo(x + dir * 16, 172 + i * 52);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  } else if (idx === 3) {
    // Full-stack interlocking strata
    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 6; c += 1) {
        ctx.globalAlpha = 0.25 + ((r + c) % 4) * 0.18;
        ctx.fillRect(90 + c * 148 + r * 12, 58 + r * 102, 126, 76);
      }
    }
    ctx.globalAlpha = 1;
  } else if (idx === 4) {
    // Human <-> Agent collaboration loops
    const pts = [
      [260, h / 2],
      [W - 260, h / 2],
    ];
    ctx.beginPath();
    ctx.arc(pts[0][0], pts[0][1], 56, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(pts[1][0], pts[1][1], 56, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 3; i += 1) {
      ctx.globalAlpha = 0.92 - i * 0.22;
      ctx.beginPath();
      ctx.ellipse(W / 2, h / 2, 235 - i * 36, 122 + i * 34, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  } else {
    // QA Lifecycle orbit
    const n = 6;
    for (let i = 0; i < n; i += 1) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const x = W / 2 + Math.cos(a) * 190;
      const y = h / 2 + Math.sin(a) * 145;
      ctx.globalAlpha = 0.4 + (i / n) * 0.6;
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.ellipse(W / 2, h / 2, 190, 145, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

function makeKeyboardTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 768;
  c.height = 460;
  const ctx = c.getContext('2d');
  if (ctx) {
    // Recessed keyboard well
    ctx.fillStyle = '#181a22';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = '#3a3f4d';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, c.width - 20, 308);

    // Backlit keys with subtle silver keycap rim
    for (let r = 0; r < 5; r += 1) {
      for (let k = 0; k < 14; k += 1) {
        const kx = 22 + k * 52;
        const ky = 20 + r * 50;
        ctx.fillStyle = '#0e1015';
        ctx.fillRect(kx, ky, 44, 40);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(kx + 1, ky + 1, 42, 38);
      }
    }
    // Spacebar row
    ctx.fillStyle = '#0e1015';
    ctx.fillRect(210, 270, 348, 38);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
    ctx.strokeRect(211, 271, 346, 36);

    // Force-touch trackpad
    ctx.fillStyle = '#242834';
    ctx.fillRect(244, 330, 280, 114);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 2;
    ctx.strokeRect(244, 330, 280, 114);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const Laptop: React.FC<{ index: number; accent: string; label: string; reduced: boolean }> = ({
  index,
  accent,
  label,
  reduced,
}) => {
  const group = useRef<THREE.Group>(null);
  const flash = useRef(0);

  const screen = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, []);
  const keys = useMemo(() => makeKeyboardTexture(), []);

  useEffect(() => {
    const ctx = screen.image.getContext('2d') as CanvasRenderingContext2D | null;
    if (!ctx) return;
    drawScreen(ctx, index, accent, label);
    screen.needsUpdate = true;
    flash.current = 1;
  }, [index, accent, label, screen]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const px = reduced ? 0 : state.pointer.x;
    const py = reduced ? 0 : state.pointer.y;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.34 + px * 0.32, 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.18 - py * 0.08, 3, delta);
    group.current.position.y = reduced ? -0.58 : -0.58 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
    flash.current = Math.max(0, flash.current - delta * 3);
  });

  return (
    <group ref={group} position={[0, -0.58, 0]}>
      {/* Studio desk reflection pad so the chassis silhouette pops against black */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0.1]}>
        <circleGeometry args={[2.35, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={0.11} />
      </mesh>

      {/* Anodized Space-Silver aluminum unibody base */}
      <RoundedBox args={[3.32, 0.12, 2.22]} radius={0.055} smoothness={4} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#8a92a3"
          emissive="#1a1d24"
          emissiveIntensity={0.35}
          metalness={0.72}
          roughness={0.22}
          clearcoat={0.45}
        />
      </RoundedBox>

      {/* Keyboard & trackpad deck */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.062, 0.08]}>
        <planeGeometry args={[3.04, 1.84]} />
        <meshStandardMaterial map={keys} roughness={0.5} metalness={0.25} />
      </mesh>

      {/* Display lid hinged at back edge */}
      <group position={[0, 0.06, -1.05]} rotation={[-0.24, 0, 0]}>
        <RoundedBox args={[3.32, 2.16, 0.075]} radius={0.04} smoothness={4} position={[0, 1.08, 0]}>
          <meshPhysicalMaterial
            color="#7e8698"
            emissive="#171a22"
            emissiveIntensity={0.3}
            metalness={0.75}
            roughness={0.22}
            clearcoat={0.5}
          />
        </RoundedBox>
        {/* Dark glass bezel */}
        <mesh position={[0, 1.08, 0.039]}>
          <planeGeometry args={[3.2, 2.04]} />
          <meshBasicMaterial color="#090a0f" />
        </mesh>
        {/* Active retina screen */}
        <mesh position={[0, 1.08, 0.041]}>
          <planeGeometry args={[3.08, 1.92]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
      </group>

      {/* Screen glow on the keyboard */}
      <pointLight position={[0, 1.15, 1.1]} intensity={1.8 + flash.current} color={accent} distance={6.5} />
    </group>
  );
};

interface LaptopStageProps {
  index: number;
  accent: string;
  label: string;
  reduced: boolean;
}

export const LaptopStage: React.FC<LaptopStageProps> = (props) => (
  <Canvas
    className="laptop-canvas"
    dpr={[1, 2]}
    camera={{ position: [0, 1.05, 6.35], fov: 35 }}
    gl={{ antialias: true, alpha: true }}
    aria-hidden="true"
  >
    <ambientLight intensity={0.65} />
    <directionalLight position={[3, 6, 5]} intensity={2.2} color="#ffffff" />
    <directionalLight position={[-4, 3, 3]} intensity={1.4} color="#dfe7ff" />
    <pointLight position={[-4, 1, -2]} intensity={2.4} color="#ff3322" />
    <Environment resolution={128}>
      <Lightformer form="rect" intensity={4.5} position={[4, 5, 4]} scale={[7, 4, 1]} color="#ffffff" />
      <Lightformer form="rect" intensity={3.2} position={[0, 3, 5]} scale={[6, 2, 1]} color="#e6ecff" />
      <Lightformer form="rect" intensity={2.5} position={[-5, 2, -2]} scale={[4, 4, 1]} color="#ff3322" />
    </Environment>
    <Laptop {...props} />
  </Canvas>
);
