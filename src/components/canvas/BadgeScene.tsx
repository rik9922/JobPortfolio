import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { PERSONAL_IDENTITY } from '../../data/portfolioData';

const CW = 600;
const CH = 880;
const ANCHOR = new THREE.Vector2(0, 3.3);
const ROPE = 2.3;
const CARD_W = 1.5;
const CARD_H = 2.2;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function paintFront(ctx: CanvasRenderingContext2D, photo: HTMLImageElement | null) {
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(0, 0, CW, CH);

  // Subtle card border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 4;
  roundRect(ctx, 8, 8, CW - 16, CH - 16, 36);
  ctx.stroke();

  // Clip slot
  ctx.fillStyle = '#000';
  roundRect(ctx, CW / 2 - 60, 26, 120, 22, 11);
  ctx.fill();

  // Photo window
  ctx.save();
  roundRect(ctx, 36, 84, CW - 72, 470, 28);
  ctx.clip();
  const g = ctx.createRadialGradient(CW / 2, 360, 20, CW / 2, 360, 420);
  g.addColorStop(0, '#ff3322');
  g.addColorStop(0.55, '#5a0f0b');
  g.addColorStop(1, '#0d0505');
  ctx.fillStyle = g;
  ctx.fillRect(36, 84, CW - 72, 470);
  if (photo) {
    const size = 560;
    ctx.drawImage(photo, CW / 2 - size / 2, 84 + 40, size, size);
  }
  ctx.restore();

  ctx.fillStyle = '#f4f4f6';
  ctx.font = '800 54px Syne, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('RITIK', 40, 640);
  ctx.fillText('THAKRE', 40, 698);

  ctx.fillStyle = '#ff3322';
  ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('QA ENGINEER', 42, 752);
  ctx.fillStyle = '#a7a7b0';
  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Test Automation · AI-Assisted Development', 42, 788);
  ctx.fillText('Nagpur, India', 42, 822);

  // Decorative barcode
  ctx.fillStyle = '#f4f4f6';
  for (let i = 0; i < 26; i += 1) {
    const w = 2 + ((i * 7) % 4);
    ctx.fillRect(CW - 40 - i * 7.2, 800, w, 44);
  }
}

function paintBack(ctx: CanvasRenderingContext2D) {
  const g = ctx.createLinearGradient(0, 0, CW, CH);
  g.addColorStop(0, '#16090a');
  g.addColorStop(1, '#050506');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, CW, CH);

  ctx.strokeStyle = 'rgba(255, 51, 34, 0.35)';
  ctx.lineWidth = 4;
  roundRect(ctx, 8, 8, CW - 16, CH - 16, 36);
  ctx.stroke();

  ctx.fillStyle = '#000';
  roundRect(ctx, CW / 2 - 60, 26, 120, 22, 11);
  ctx.fill();

  ctx.textAlign = 'left';
  ctx.fillStyle = '#ff3322';
  ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('SAY HELLO', 48, 150);

  ctx.fillStyle = '#f4f4f6';
  ctx.font = '800 64px Syne, sans-serif';
  ctx.fillText("Let's", 48, 240);
  ctx.fillText('talk.', 48, 310);

  const rows: [string, string][] = [
    ['EMAIL', PERSONAL_IDENTITY.email],
    ['LINKEDIN', PERSONAL_IDENTITY.linkedinLabel],
    ['LOCATION', PERSONAL_IDENTITY.location],
  ];
  rows.forEach(([k, v], i) => {
    const y = 430 + i * 108;
    ctx.fillStyle = '#7f7f89';
    ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(k, 48, y);
    ctx.fillStyle = '#f4f4f6';
    ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(v.length > 30 ? `${v.slice(0, 30)}…` : v, 48, y + 38);
  });

  ctx.fillStyle = '#7f7f89';
  ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Drag me around · click to flip', 48, 836);
}

function makeTexture(paint: (ctx: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = CW;
  c.height = CH;
  const ctx = c.getContext('2d');
  if (ctx) paint(ctx);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

interface PhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  dragging: boolean;
  offX: number;
  offY: number;
  downX: number;
  downY: number;
  moved: number;
  flipTarget: number;
  flip: number;
}

const Badge: React.FC<{ reduced: boolean }> = ({ reduced }) => {
  const clip = useRef<THREE.Group>(null);
  const card = useRef<THREE.Group>(null);
  const strap = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const front = useMemo(() => makeTexture((ctx) => paintFront(ctx, null)), []);
  const back = useMemo(() => makeTexture(paintBack), []);

  const s = useRef<PhysicsState>({
    x: ANCHOR.x + 0.65,
    y: ANCHOR.y - 2.15,
    vx: reduced ? 0 : 1.6,
    vy: 0,
    dragging: false,
    offX: 0,
    offY: 0,
    downX: 0,
    downY: 0,
    moved: 0,
    flipTarget: 0,
    flip: 0,
  });

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = '/ritik-cutout.png';
    const repaint = () => {
      if (cancelled) return;
      const fctx = (front.image as HTMLCanvasElement).getContext('2d');
      const bctx = (back.image as HTMLCanvasElement).getContext('2d');
      if (fctx) paintFront(fctx, img.complete && img.naturalWidth ? img : null);
      if (bctx) paintBack(bctx);
      front.needsUpdate = true;
      back.needsUpdate = true;
    };
    img.onload = () => {
      if (document.fonts?.ready) document.fonts.ready.then(repaint, repaint);
      else repaint();
    };
    if (document.fonts?.load) {
      Promise.all([document.fonts.load('800 40px Syne'), document.fonts.load('600 20px "Plus Jakarta Sans"')]).then(
        repaint,
        repaint
      );
    }
    return () => {
      cancelled = true;
    };
  }, [front, back]);

  const pointerWorld = (px: number, py: number) => ({
    x: (px * viewport.width) / 2,
    y: (py * viewport.height) / 2,
  });

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 30);
    const p = s.current;
    const pw = pointerWorld(state.pointer.x, state.pointer.y);
    const maxX = Math.max(0.35, viewport.width * 0.5 - CARD_W * 0.85);

    if (p.dragging) {
      const nx = THREE.MathUtils.clamp(pw.x + p.offX, -maxX, maxX);
      const ny = THREE.MathUtils.clamp(pw.y + p.offY, -0.4, ANCHOR.y - 0.8);
      p.vx = (nx - p.x) / Math.max(dt, 0.001);
      p.vy = (ny - p.y) / Math.max(dt, 0.001);
      p.x = nx;
      p.y = ny;
      p.moved = Math.max(p.moved, Math.hypot(pw.x - p.downX, pw.y - p.downY));
    } else {
      p.vy -= 22 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.992;
      p.vy *= 0.992;
    }

    // Rope constraint
    const dx = p.x - ANCHOR.x;
    const dy = p.y - ANCHOR.y;
    const dist = Math.hypot(dx, dy) || 0.0001;
    if (dist > ROPE) {
      const nx = dx / dist;
      const ny = dy / dist;
      p.x = ANCHOR.x + nx * ROPE;
      p.y = ANCHOR.y + ny * ROPE;
      const radial = p.vx * nx + p.vy * ny;
      if (radial > 0) {
        p.vx -= nx * radial;
        p.vy -= ny * radial;
      }
    }

    // Soft viewport edge guard accounting for card swing below clip
    const swingPad = Math.abs(Math.sin(Math.atan2(p.x - ANCHOR.x, -(p.y - ANCHOR.y)))) * (CARD_H + 0.15);
    const safeX = Math.max(0.25, viewport.width * 0.5 - CARD_W * 0.58 - swingPad);
    if (p.x > safeX) {
      p.x = safeX;
      if (p.vx > 0) p.vx *= -0.45;
    } else if (p.x < -safeX) {
      p.x = -safeX;
      if (p.vx < 0) p.vx *= -0.45;
    }

    const cdx = p.x - ANCHOR.x;
    const cdy = p.y - ANCHOR.y;
    const cd = Math.hypot(cdx, cdy) || 0.0001;
    const angle = Math.atan2(cdx, -cdy);

    if (clip.current) {
      clip.current.position.set(p.x, p.y, 0);
      clip.current.rotation.z = angle;
    }
    if (strap.current) {
      strap.current.position.set((p.x + ANCHOR.x) / 2, (p.y + ANCHOR.y) / 2, -0.01);
      strap.current.rotation.z = angle;
      strap.current.scale.set(1, cd, 1);
    }
    if (card.current) {
      p.flip += (p.flipTarget - p.flip) * Math.min(1, dt * 7);
      card.current.rotation.y = p.flip * Math.PI;
    }
  });

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const p = s.current;
    const pw = pointerWorld(e.pointer?.x ?? 0, e.pointer?.y ?? 0);
    p.dragging = true;
    p.offX = p.x - pw.x;
    p.offY = p.y - pw.y;
    p.downX = pw.x;
    p.downY = pw.y;
    p.moved = 0;
    (e.target as unknown as Element)?.setPointerCapture?.(e.pointerId);
    document.body.style.cursor = 'grabbing';
  };
  const onUp = () => {
    const p = s.current;
    if (!p.dragging) return;
    p.dragging = false;
    if (p.moved < 0.14) p.flipTarget = p.flipTarget === 0 ? 1 : 0;
    document.body.style.cursor = 'grab';
  };

  return (
    <>
      <mesh ref={strap}>
        <planeGeometry args={[0.16, 1]} />
        <meshStandardMaterial color="#d3180c" roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      <group ref={clip}>
        {/* metal clip */}
        <mesh position={[0, -0.02, 0.02]}>
          <boxGeometry args={[0.3, 0.2, 0.06]} />
          <meshStandardMaterial color="#cfd2d8" metalness={1} roughness={0.25} />
        </mesh>
        <group
          ref={card}
          position={[0, -(CARD_H / 2) - 0.12, 0]}
          onPointerDown={onDown}
          onPointerUp={onUp}
          onPointerOver={() => {
            if (!s.current.dragging) document.body.style.cursor = 'grab';
          }}
          onPointerOut={() => {
            if (!s.current.dragging) document.body.style.cursor = '';
          }}
        >
          <RoundedBox args={[CARD_W, CARD_H, 0.05]} radius={0.07} smoothness={5}>
            <meshPhysicalMaterial color="#181920" metalness={0.5} roughness={0.3} clearcoat={1} />
          </RoundedBox>
          <mesh position={[0, 0, 0.0262]}>
            <planeGeometry args={[CARD_W - 0.02, CARD_H - 0.02]} />
            <meshPhysicalMaterial map={front} roughness={0.38} clearcoat={0.85} clearcoatRoughness={0.18} />
          </mesh>
          <mesh position={[0, 0, -0.0262]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[CARD_W - 0.02, CARD_H - 0.02]} />
            <meshPhysicalMaterial map={back} roughness={0.38} clearcoat={0.85} clearcoatRoughness={0.18} />
          </mesh>
        </group>
      </group>
    </>
  );
};

export const BadgeScene: React.FC<{ reduced: boolean }> = ({ reduced }) => (
  <Canvas
    className="badge-canvas"
    dpr={[1, 2]}
    camera={{ position: [0, 0.9, 7.4], fov: 38 }}
    gl={{ antialias: true, alpha: true }}
    onPointerMissed={() => {
      document.body.style.cursor = '';
    }}
    onPointerUp={() => {
      document.body.style.cursor = '';
    }}
  >
    <ambientLight intensity={0.45} />
    <directionalLight position={[3, 5, 6]} intensity={1.5} />
    <pointLight position={[-3, 1, 3]} intensity={3} color="#ff3322" />
    <Environment resolution={128}>
      <Lightformer form="rect" intensity={4} position={[3, 4, 4]} scale={[6, 4, 1]} color="#ffffff" />
      <Lightformer form="rect" intensity={2.5} position={[-5, 0, 2]} scale={[3, 6, 1]} color="#ff3322" />
    </Environment>
    <Badge reduced={reduced} />
  </Canvas>
);
