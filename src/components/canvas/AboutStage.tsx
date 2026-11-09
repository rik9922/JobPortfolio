import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { RealDeviceChassis } from './RealDeviceChassis';
import {
  paintRealAndroidScreen,
  paintRealIosScreen,
  paintRealPwaScreen,
  paintRealWebScreen,
} from './realScreenPainters';

export interface AboutStageProps {
  activePlatform: number; // 0: Web, 1: PWA, 2: Android, 3: iOS
  onSelectPlatform?: (index: number) => void;
  activeScreen?: number; // 0, 1, 2
  onSelectScreen?: (index: number) => void;
  viewAngle?: 'front' | 'side' | 'back' | 'free';
  onSelectViewAngle?: (angle: 'front' | 'side' | 'back' | 'free') => void;
  autoSpin?: boolean;
  onToggleAutoSpin?: () => void;
  xrayFlipped?: boolean;
  onToggleXray?: () => void;
  reduced?: boolean;
}

interface PlatformHardwareSpec {
  id: string;
  num: string;
  name: string;
  accent: string;
  formFactor: 'web' | 'pwa' | 'android' | 'ios';
  texW: number;
  texH: number;
}

const HARDWARE_SPECS: PlatformHardwareSpec[] = [
  {
    id: 'web',
    num: '01',
    name: 'WEB APPLICATIONS',
    accent: '#ff3322',
    formFactor: 'web',
    texW: 1600,
    texH: 1000,
  },
  {
    id: 'pwa',
    num: '02',
    name: 'PROGRESSIVE WEB APPS',
    accent: '#38bdf8',
    formFactor: 'pwa',
    texW: 1400,
    texH: 1000,
  },
  {
    id: 'android',
    num: '03',
    name: 'ANDROID APPLICATIONS',
    accent: '#34d399',
    formFactor: 'android',
    texW: 750,
    texH: 1550,
  },
  {
    id: 'ios',
    num: '04',
    name: 'iOS APPLICATIONS',
    accent: '#a855f7',
    formFactor: 'ios',
    texW: 750,
    texH: 1620,
  },
];

interface DeviceItem3DProps {
  spec: PlatformHardwareSpec;
  index: number;
  activePlatform: number;
  activeScreen: number;
  onCycleScreen: () => void;
  onSelect: (index: number) => void;
  reduced: boolean;
}

const DeviceItem3D: React.FC<DeviceItem3DProps> = ({
  spec,
  index,
  activePlatform,
  activeScreen,
  onCycleScreen,
  onSelect,
  reduced,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const isActive = index === activePlatform;

  const { canvas, tex } = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = spec.texW;
    c.height = spec.texH;
    const ctx = c.getContext('2d');
    if (ctx) {
      if (spec.formFactor === 'web') paintRealWebScreen(ctx, 0, activeScreen);
      else if (spec.formFactor === 'pwa') paintRealPwaScreen(ctx, 0, activeScreen);
      else if (spec.formFactor === 'android') paintRealAndroidScreen(ctx, 0, activeScreen);
      else paintRealIosScreen(ctx, 0, activeScreen);
    }

    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.generateMipmaps = false;
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.anisotropy = Math.min(16, gl.capabilities.getMaxAnisotropy());
    t.needsUpdate = true;
    return { canvas: c, tex: t };
  }, [spec, gl, activeScreen]);

  useEffect(() => {
    return () => {
      tex.dispose();
    };
  }, [tex]);

  const lastPaintRef = useRef(0);

  useFrame((state, delta) => {
    (window as any).__ABOUT_SCENE__ = state.scene;
    const g = groupRef.current;
    if (!g) return;

    const t = state.clock.elapsedTime;
    const interval = isActive ? 0.04 : 0.25;

    if (t - lastPaintRef.current >= interval) {
      lastPaintRef.current = t;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (spec.formFactor === 'web') paintRealWebScreen(ctx, t, activeScreen);
        else if (spec.formFactor === 'pwa') paintRealPwaScreen(ctx, t, activeScreen);
        else if (spec.formFactor === 'android') paintRealAndroidScreen(ctx, t, activeScreen);
        else paintRealIosScreen(ctx, t, activeScreen);
        tex.needsUpdate = true;
      }
    }

    // Circular 3D orbital deck placement
    const rel = (index - activePlatform + 4) % 4;
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let targetScale = 1;

    if (rel === 0) {
      // Hero center
      targetX = 0;
      targetY = reduced ? 0 : Math.sin(t * 1.5) * 0.04;
      targetZ = 0.9;
      targetRotY = reduced ? 0 : Math.sin(t * 0.6) * 0.05;
      targetRotX = reduced ? 0 : Math.cos(t * 0.8) * 0.02;
      targetScale = spec.formFactor === 'android' || spec.formFactor === 'ios' ? 0.88 : 0.96;
    } else if (rel === 1) {
      // Right orbital slot
      targetX = 2.65;
      targetY = 0.15 + (reduced ? 0 : Math.sin(t * 1.2 + 1) * 0.03);
      targetZ = -1.45;
      targetRotY = -0.52;
      targetRotX = 0.02;
      targetScale = 0.58;
    } else if (rel === 2) {
      // Deep top orbital slot
      targetX = 0;
      targetY = 1.45 + (reduced ? 0 : Math.cos(t * 1.1 + 2) * 0.03);
      targetZ = -2.6;
      targetRotY = 0.08;
      targetRotX = 0.14;
      targetScale = 0.46;
    } else {
      // Left orbital slot
      targetX = -2.65;
      targetY = -0.15 + (reduced ? 0 : Math.sin(t * 1.3 + 3) * 0.03);
      targetZ = -1.45;
      targetRotY = 0.52;
      targetRotX = -0.02;
      targetScale = 0.58;
    }

    const damp = Math.min(1, delta * 6.5);
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, damp);
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, damp);
    g.position.z = THREE.MathUtils.lerp(g.position.z, targetZ, damp);

    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRotX, damp);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRotY, damp);

    const s = THREE.MathUtils.lerp(g.scale.x, targetScale, damp);
    g.scale.setScalar(s);
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        if (isActive) {
          onCycleScreen();
        } else {
          onSelect(index);
        }
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'grab';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <RealDeviceChassis
        formFactor={spec.formFactor}
        screenTexture={tex}
        accent={spec.accent}
        isHero={isActive}
      />
    </group>
  );
};

interface HardwareSceneProps {
  activePlatform: number;
  onSelectPlatform: (idx: number) => void;
  activeScreen: number;
  onCycleScreen: () => void;
  viewAngle: 'front' | 'side' | 'back' | 'free';
  autoSpin: boolean;
  reduced: boolean;
}

const HardwareScene: React.FC<HardwareSceneProps> = ({
  activePlatform,
  onSelectPlatform,
  activeScreen,
  onCycleScreen,
  viewAngle,
  autoSpin,
  reduced,
}) => {
  const rigRef = useRef<THREE.Group>(null);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const userRotRef = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const rig = rigRef.current;
    if (!rig) return;

    if (autoSpin && !draggingRef.current) {
      userRotRef.current.y += delta * 0.55;
    } else if (!draggingRef.current) {
      if (viewAngle === 'front') {
        userRotRef.current.y = THREE.MathUtils.lerp(userRotRef.current.y, 0, Math.min(1, delta * 6));
        userRotRef.current.x = THREE.MathUtils.lerp(userRotRef.current.x, 0, Math.min(1, delta * 6));
      } else if (viewAngle === 'side') {
        userRotRef.current.y = THREE.MathUtils.lerp(userRotRef.current.y, Math.PI / 2, Math.min(1, delta * 6));
      } else if (viewAngle === 'back') {
        userRotRef.current.y = THREE.MathUtils.lerp(userRotRef.current.y, Math.PI, Math.min(1, delta * 6));
      }
    }

    const px = state.pointer.x * 0.08;
    const py = state.pointer.y * 0.05;

    rig.rotation.y = THREE.MathUtils.lerp(
      rig.rotation.y,
      userRotRef.current.y + px,
      Math.min(1, delta * 8)
    );
    rig.rotation.x = THREE.MathUtils.lerp(
      rig.rotation.x,
      userRotRef.current.x - py,
      Math.min(1, delta * 8)
    );
  });

  return (
    <group
      ref={rigRef}
      onPointerDown={(e) => {
        draggingRef.current = true;
        dragStartRef.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerMove={(e) => {
        if (!draggingRef.current) return;
        const dx = (e.clientX - dragStartRef.current.x) * 0.009;
        const dy = (e.clientY - dragStartRef.current.y) * 0.007;
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        // Unconstrained full 360-degree rotation along Y
        userRotRef.current.y += dx;
        userRotRef.current.x = THREE.MathUtils.clamp(
          userRotRef.current.x + dy,
          -Math.PI / 3,
          Math.PI / 3
        );
      }}
      onPointerUp={() => {
        draggingRef.current = false;
      }}
      onPointerLeave={() => {
        draggingRef.current = false;
      }}
    >
      {HARDWARE_SPECS.map((spec, idx) => (
        <DeviceItem3D
          key={spec.id}
          spec={spec}
          index={idx}
          activePlatform={activePlatform}
          activeScreen={activeScreen}
          onCycleScreen={onCycleScreen}
          onSelect={onSelectPlatform}
          reduced={reduced}
        />
      ))}
    </group>
  );
};

export const AboutStage: React.FC<AboutStageProps> = ({
  activePlatform,
  onSelectPlatform,
  activeScreen = 0,
  onSelectScreen,
  viewAngle = 'free',
  autoSpin = false,
  reduced = false,
}) => {
  const [webglReady, setWebglReady] = useState(true);

  if (!webglReady) {
    const active = HARDWARE_SPECS[activePlatform] ?? HARDWARE_SPECS[0];
    return (
      <div className="about-stage__fallback">
        <span className="panel__eyebrow">0{activePlatform + 1} · {active.formFactor.toUpperCase()}</span>
        <h3>{active.name}</h3>
      </div>
    );
  }

  const handleCycleScreen = () => {
    if (onSelectScreen) {
      onSelectScreen((activeScreen + 1) % 3);
    }
  };

  return (
    <div className="about-stage" aria-label="Interactive Real 3D Hardware Devices Stage">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.05, 5.85], fov: 37 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={() => setWebglReady(false)}
      >
        <ambientLight intensity={0.9} />
        {/* Front key lighting */}
        <directionalLight position={[4, 6, 5]} intensity={1.8} />
        <directionalLight position={[-4, -2, 3]} intensity={0.8} color="#ff3322" />

        {/* Rear studio lighting for Backside & Camera Inspection */}
        <directionalLight position={[0, 5, -6]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-4, 2, -5]} intensity={1.4} color="#38bdf8" />

        <Environment resolution={256}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            {/* Front Lightformers */}
            <Lightformer intensity={3.5} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[8, 2, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, 1]} scale={[6, 2, 1]} />
            {/* Rear Lightformers for Backside & Lens Reflections */}
            <Lightformer intensity={3.0} rotation-x={-Math.PI / 2} position={[0, 4, -4]} scale={[8, 2, 1]} color="#ffffff" />
            <Lightformer intensity={2.2} rotation-y={-Math.PI / 2} position={[5, 1, -3]} scale={[6, 2, 1]} color="#38bdf8" />
          </group>
        </Environment>

        <HardwareScene
          activePlatform={activePlatform}
          onSelectPlatform={(idx) => onSelectPlatform?.(idx)}
          activeScreen={activeScreen}
          onCycleScreen={handleCycleScreen}
          viewAngle={viewAngle}
          autoSpin={autoSpin}
          reduced={reduced}
        />

        <ContactShadows
          position={[0, -2.15, 0]}
          opacity={0.65}
          scale={12}
          blur={2.8}
          far={5}
          color="#000000"
        />
      </Canvas>
    </div>
  );
};
