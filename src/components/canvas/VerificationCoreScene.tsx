import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  Lightformer,
  Line,
  MeshTransmissionMaterial,
  QuadraticBezierLine,
  RoundedBox,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';
import { CHAPTER_WAYPOINTS, CHAPTERS } from '../../data/portfolioData';
import { CapabilityId, ChapterId } from '../../types/portfolio';

interface SculpturalWorldProps {
  activeChapter: ChapterId;
  scrollProgress: number;
  activePlatformIndex: number;
  activeCapabilityId: CapabilityId;
  activeLensIndex: number;
  reducedMotion: boolean;
}

const RIBBON_VERTEX_SHADER = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vWave;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    float wave = sin(position.x * 2.4 + uTime * 1.4) * cos(position.y * 2.0 + uTime * 1.1) * 0.14;
    vWave = wave;
    vec3 pos = position + normal * wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const RIBBON_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vWave;

  void main() {
    float rim = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.8);
    float shimmer = sin(vUv.x * 18.0 + uTime * 2.0) * 0.5 + 0.5;
    vec3 col = mix(uColorA, uColorB, vUv.y + vWave * 2.2);
    col += vec3(0.96, 0.94, 0.90) * rim * 0.55;
    col += uColorB * shimmer * 0.18;
    gl_FragColor = vec4(col, 0.92);
  }
`;

function StudioLightingRig() {
  return (
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 4, -0.3, 0]}>
        <Lightformer
          form="rect"
          intensity={3.5}
          position={[8, 6, -4]}
          scale={[10, 6, 1]}
          color="#F5F2EB"
        />
        <Lightformer
          form="circle"
          intensity={4.2}
          position={[-7, 4, -2]}
          scale={[5, 5, 1]}
          color="#E85D3F"
        />
        <Lightformer
          form="ring"
          intensity={2.4}
          position={[0, -6, 2]}
          scale={[9, 9, 1]}
          color="#6EE7B7"
        />
        <Lightformer
          form="rect"
          intensity={2.0}
          position={[0, 8, 5]}
          scale={[12, 2, 1]}
          color="#D6C7B2"
        />
      </group>
    </Environment>
  );
}

/* ==========================================================================
   CHAPTER 1 INSTALLATION (z = 0): THE KINETIC PRISM MONOLITH
   ========================================================================== */
function HeroPrismMonolith({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const monolithLeftRef = useRef<THREE.Mesh>(null);
  const monolithCenterRef = useRef<THREE.Mesh>(null);
  const monolithRightRef = useRef<THREE.Mesh>(null);
  const sculptureKnotRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#E85D3F') },
      uColorB: { value: new THREE.Color('#D6C7B2') },
    }),
    []
  );

  useFrame((state, delta) => {
    if (shaderRef.current && !reducedMotion) {
      shaderRef.current.uniforms.uTime.value += delta;
    }
    if (!groupRef.current) return;

    const px = reducedMotion ? 0 : state.pointer.x * 0.28;
    const py = reducedMotion ? 0 : state.pointer.y * 0.2;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      -0.32 + px,
      3.5,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      0.08 - py,
      3.5,
      delta
    );

    if (!reducedMotion) {
      const t = state.clock.elapsedTime;
      if (monolithLeftRef.current) {
        monolithLeftRef.current.position.y = Math.sin(t * 0.9) * 0.14 + 0.15;
        monolithLeftRef.current.rotation.z = Math.sin(t * 0.5) * 0.04 + 0.12;
      }
      if (monolithCenterRef.current) {
        monolithCenterRef.current.position.y = Math.cos(t * 0.8) * 0.12;
      }
      if (monolithRightRef.current) {
        monolithRightRef.current.position.y = Math.sin(t * 0.85 + 1.5) * 0.15 - 0.15;
        monolithRightRef.current.rotation.z = -0.14 + Math.cos(t * 0.45) * 0.04;
      }
      if (sculptureKnotRef.current) {
        sculptureKnotRef.current.rotation.y += delta * 0.28;
        sculptureKnotRef.current.rotation.x += delta * 0.16;
      }
    }
  });

  return (
    <group ref={groupRef} position={[1.75, 0.05, 0]}>
      <Float
        speed={reducedMotion ? 0 : 1.4}
        rotationIntensity={reducedMotion ? 0 : 0.12}
        floatIntensity={reducedMotion ? 0 : 0.28}
      >
        {/* Left Brushed Champagne Titanium Monolith Slab */}
        <RoundedBox
          ref={monolithLeftRef}
          args={[0.82, 3.1, 0.28]}
          radius={0.06}
          smoothness={4}
          position={[-0.95, 0.15, -0.35]}
          rotation={[0.08, 0.28, 0.12]}
        >
          <meshPhysicalMaterial
            color="#1c1b22"
            metalness={0.92}
            roughness={0.18}
            clearcoat={0.8}
            clearcoatRoughness={0.15}
          />
        </RoundedBox>

        {/* Center Refractive Crystal Prism */}
        <RoundedBox
          ref={monolithCenterRef}
          args={[1.18, 3.45, 0.42]}
          radius={0.08}
          smoothness={4}
          position={[0.05, 0, 0.15]}
          rotation={[-0.04, -0.18, -0.05]}
        >
          <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={128}
            transmission={0.94}
            roughness={0.08}
            thickness={1.4}
            ior={1.45}
            chromaticAberration={0.05}
            anisotropy={0.2}
            color="#F5F2EB"
          />
        </RoundedBox>

        {/* Right Warm Cinnabar Sculptural Wing */}
        <RoundedBox
          ref={monolithRightRef}
          args={[0.76, 2.85, 0.26]}
          radius={0.06}
          smoothness={4}
          position={[1.05, -0.15, -0.25]}
          rotation={[0.1, -0.35, -0.14]}
        >
          <meshPhysicalMaterial
            color="#2a1615"
            emissive="#E85D3F"
            emissiveIntensity={0.22}
            metalness={0.78}
            roughness={0.22}
            clearcoat={1}
          />
        </RoundedBox>

        {/* Central Sculptural Liquid-Light Ribbon Core */}
        <mesh ref={sculptureKnotRef} position={[0.05, 0.05, 0.2]}>
          <torusKnotGeometry args={[0.62, 0.16, 128, 32, 2, 3]} />
          <shaderMaterial
            ref={shaderRef}
            vertexShader={RIBBON_VERTEX_SHADER}
            fragmentShader={RIBBON_FRAGMENT_SHADER}
            uniforms={uniforms}
            transparent
          />
        </mesh>

        {/* Subtle Architectural Halo Arch */}
        <mesh rotation={[0.45, -0.25, 0]} position={[0, 0, -0.6]}>
          <torusGeometry args={[2.15, 0.012, 16, 120]} />
          <meshStandardMaterial
            color="#D6C7B2"
            emissive="#D6C7B2"
            emissiveIntensity={0.35}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ==========================================================================
   CHAPTER 2 INSTALLATION (z = -16): THE MULTI-PLATFORM OPTICAL STRATA
   ========================================================================== */
function PhilosophyStrataInstallation({
  activePlatformIndex,
  reducedMotion,
}: {
  activePlatformIndex: number;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const slabRefs = useRef<(THREE.Mesh | null)[]>([]);
  const lensRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const px = reducedMotion ? 0 : state.pointer.x * 0.2;
    const py = reducedMotion ? 0 : state.pointer.y * 0.15;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      0.35 + px,
      3.5,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      0.1 - py,
      3.5,
      delta
    );

    slabRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const isSelected = idx === activePlatformIndex;
      const baseY = (1.5 - idx) * 0.68;
      const targetZ = isSelected ? 0.55 : 0;
      const targetScale = isSelected ? 1.08 : 0.96;

      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, baseY, 4, delta);
      mesh.position.z = THREE.MathUtils.damp(mesh.position.z, targetZ, 4, delta);
      mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, targetScale, 4, delta));
    });

    if (lensRef.current) {
      const targetLensY = (1.5 - activePlatformIndex) * 0.68;
      lensRef.current.position.y = THREE.MathUtils.damp(
        lensRef.current.position.y,
        targetLensY,
        4.5,
        delta
      );
      if (!reducedMotion) {
        lensRef.current.rotation.z += delta * 0.4;
      }
    }
  });

  const slabColors = ['#6EE7B7', '#38BDF8', '#E85D3F', '#D6C7B2'];

  return (
    <group ref={groupRef} position={[1.9, 0.0, -16]}>
      {/* Four Architectural Platform Strata (Web, PWA, Android, iOS) */}
      {[0, 1, 2, 3].map((idx) => {
        const isSelected = idx === activePlatformIndex;
        return (
          <RoundedBox
            key={idx}
            ref={(el) => {
              slabRefs.current[idx] = el;
            }}
            args={[2.3, 0.36, 1.35]}
            radius={0.05}
            smoothness={4}
            position={[0, (1.5 - idx) * 0.68, 0]}
            rotation={[0.12, -0.35, 0]}
          >
            <meshPhysicalMaterial
              color={isSelected ? '#1c242b' : '#12141a'}
              emissive={slabColors[idx]}
              emissiveIntensity={isSelected ? 0.42 : 0.08}
              metalness={0.75}
              roughness={0.18}
              transmission={0.45}
              transparent
              opacity={isSelected ? 0.96 : 0.72}
              clearcoat={1}
            />
          </RoundedBox>
        );
      })}

      {/* Optical Exploration Lens Ring */}
      <mesh ref={lensRef} position={[0.25, 0, 0.75]} rotation={[0.15, -0.2, 0]}>
        <torusGeometry args={[0.92, 0.028, 24, 96]} />
        <meshStandardMaterial
          color="#F5F2EB"
          emissive="#6EE7B7"
          emissiveIntensity={0.65}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

/* ==========================================================================
   CHAPTER 3 INSTALLATION (z = -32): SIX INTERACTIVE 3D CAPABILITY DIORAMAS
   ========================================================================== */
function CapabilitiesDioramaStage({
  activeCapabilityId,
  activeLensIndex,
  reducedMotion,
}: {
  activeCapabilityId: CapabilityId;
  activeLensIndex: number;
  reducedMotion: boolean;
}) {
  const stageRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!stageRef.current) return;
    const px = reducedMotion ? 0 : state.pointer.x * 0.25;
    const py = reducedMotion ? 0 : state.pointer.y * 0.18;

    stageRef.current.rotation.y = THREE.MathUtils.damp(
      stageRef.current.rotation.y,
      -0.28 + px + (activeLensIndex - 1) * 0.22,
      3.5,
      delta
    );
    stageRef.current.rotation.x = THREE.MathUtils.damp(
      stageRef.current.rotation.x,
      0.12 - py,
      3.5,
      delta
    );

    if (pulseRef.current && !reducedMotion) {
      const t = (state.clock.elapsedTime * 0.85) % 1;
      pulseRef.current.position.x = -1.55 + t * 3.1;
      pulseRef.current.position.y = Math.sin(t * Math.PI) * 0.45;
    }
  });

  return (
    <group ref={stageRef} position={[1.95, -0.05, -32]}>
      <Float
        speed={reducedMotion ? 0 : 1.3}
        rotationIntensity={reducedMotion ? 0 : 0.1}
        floatIntensity={reducedMotion ? 0 : 0.22}
      >
        {/* 1. QUALITY ENGINEERING: Multi-Angle Behavioural Prism */}
        {activeCapabilityId === 'quality-engineering' && (
          <group>
            <mesh rotation={[0.3, 0.5, 0]} scale={1.15 + activeLensIndex * 0.08}>
              <octahedronGeometry args={[1.25, 0]} />
              <MeshTransmissionMaterial
                samples={4}
                resolution={128}
                transmission={0.92}
                roughness={0.1}
                thickness={1.5}
                chromaticAberration={0.08}
                color="#6EE7B7"
              />
            </mesh>
            {[0, 1, 2, 3].map((beamIdx) => {
              const angle = (beamIdx * Math.PI) / 2 + activeLensIndex * 0.4;
              return (
                <Line
                  key={beamIdx}
                  points={[
                    [0, 0, 0],
                    [Math.cos(angle) * 2.2, Math.sin(angle) * 1.6, 0.4],
                  ]}
                  color={beamIdx === activeLensIndex ? '#E85D3F' : '#6EE7B7'}
                  lineWidth={2.2}
                />
              );
            })}
          </group>
        )}

        {/* 2. TEST AUTOMATION: 3D Deconstructed Browser & Page Object Layers */}
        {activeCapabilityId === 'test-automation' && (
          <group rotation={[0.06, -0.2, 0]}>
            {/* Outer Browser Frame */}
            <RoundedBox args={[2.7, 1.75, 0.1]} radius={0.06} position={[0, 0, -0.45]}>
              <meshPhysicalMaterial
                color="#14161d"
                metalness={0.85}
                roughness={0.2}
                clearcoat={1}
              />
            </RoundedBox>
            {/* Exploded Page Object Layer */}
            <RoundedBox
              args={[2.2, 1.25, 0.08]}
              radius={0.05}
              position={[0, 0, 0.05 + activeLensIndex * 0.18]}
            >
              <meshPhysicalMaterial
                color="#261818"
                emissive="#E85D3F"
                emissiveIntensity={0.32}
                metalness={0.7}
                roughness={0.2}
                transparent
                opacity={0.9}
              />
            </RoundedBox>
            {/* Floating Interactive DOM / Assertion Cards */}
            {[-0.65, 0, 0.65].map((xPos, i) => (
              <RoundedBox
                key={i}
                args={[0.56, 0.72, 0.08]}
                radius={0.04}
                position={[
                  xPos,
                  i === activeLensIndex ? 0.12 : -0.04,
                  0.52 + (i === activeLensIndex ? 0.25 : 0),
                ]}
              >
                <meshStandardMaterial
                  color={i === activeLensIndex ? '#E85D3F' : '#D6C7B2'}
                  emissive={i === activeLensIndex ? '#E85D3F' : '#1a1a1a'}
                  emissiveIntensity={i === activeLensIndex ? 0.55 : 0.1}
                  metalness={0.85}
                  roughness={0.18}
                />
              </RoundedBox>
            ))}
          </group>
        )}

        {/* 3. API & DATA VALIDATION: 3D Request–Response & SQL Conduit */}
        {activeCapabilityId === 'api-data-validation' && (
          <group>
            {/* Client Node */}
            <RoundedBox args={[0.68, 1.35, 0.68]} radius={0.08} position={[-1.55, 0, 0]}>
              <meshPhysicalMaterial color="#1d222b" metalness={0.85} roughness={0.2} clearcoat={1} />
            </RoundedBox>
            {/* REST Gateway Ring */}
            <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
              <torusGeometry args={[0.68, 0.06, 24, 64]} />
              <meshStandardMaterial
                color="#F59E0B"
                emissive="#F59E0B"
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.15}
              />
            </mesh>
            {/* Relational SQL Crystal Pillar */}
            <mesh position={[1.55, 0, 0]}>
              <cylinderGeometry args={[0.52, 0.52, 1.55, 6]} />
              <meshPhysicalMaterial
                color="#162925"
                emissive="#6EE7B7"
                emissiveIntensity={0.35}
                metalness={0.8}
                roughness={0.15}
                clearcoat={1}
              />
            </mesh>
            {/* Request & Response Curved Conduits */}
            <QuadraticBezierLine
              start={[-1.55, 0.2, 0]}
              mid={[0, 0.85, 0.3]}
              end={[1.55, 0.2, 0]}
              color="#F59E0B"
              lineWidth={2.4}
            />
            <QuadraticBezierLine
              start={[1.55, -0.2, 0]}
              mid={[0, -0.85, -0.3]}
              end={[-1.55, -0.2, 0]}
              color="#6EE7B7"
              lineWidth={2.4}
            />
            {/* Traveling Payload Pulse */}
            <mesh ref={pulseRef} position={[0, 0.4, 0]}>
              <sphereGeometry args={[0.14, 24, 24]} />
              <meshStandardMaterial
                color="#F5F2EB"
                emissive="#F59E0B"
                emissiveIntensity={1.2}
              />
            </mesh>
          </group>
        )}

        {/* 4. SOFTWARE DEVELOPMENT: Interlocking Full-Stack Architectural Strata */}
        {activeCapabilityId === 'software-development' && (
          <group rotation={[0.18, -0.35, 0]}>
            {[0, 1, 2].map((layerIdx) => {
              const isFocused = layerIdx === activeLensIndex;
              return (
                <RoundedBox
                  key={layerIdx}
                  args={[2.1 - layerIdx * 0.2, 0.34, 1.45 - layerIdx * 0.12]}
                  radius={0.06}
                  position={[
                    0,
                    (layerIdx - 1) * (0.65 + activeLensIndex * 0.08),
                    isFocused ? 0.3 : 0,
                  ]}
                >
                  <meshPhysicalMaterial
                    color={isFocused ? '#1c2d38' : '#151821'}
                    emissive={isFocused ? '#38BDF8' : '#D6C7B2'}
                    emissiveIntensity={isFocused ? 0.45 : 0.1}
                    metalness={0.85}
                    roughness={0.18}
                    clearcoat={1}
                  />
                </RoundedBox>
              );
            })}
          </group>
        )}

        {/* 5. AI-ASSISTED DEVELOPMENT: Human & AI Agent Symbiosis Sculpture */}
        {activeCapabilityId === 'ai-assisted-development' && (
          <group>
            {/* Human Judgment Golden Ring */}
            <mesh rotation={[0.4, 0.3, 0]}>
              <torusGeometry args={[1.35, 0.08, 32, 100]} />
              <meshPhysicalMaterial
                color="#D6C7B2"
                emissive="#D6C7B2"
                emissiveIntensity={0.25}
                metalness={0.95}
                roughness={0.12}
                clearcoat={1}
              />
            </mesh>
            {/* AI Synthesis Sculptural Knot */}
            <mesh scale={0.95 + activeLensIndex * 0.08}>
              <torusKnotGeometry args={[0.68, 0.18, 128, 32, 3, 4]} />
              <MeshTransmissionMaterial
                samples={4}
                resolution={128}
                transmission={0.9}
                roughness={0.12}
                thickness={1.2}
                chromaticAberration={0.07}
                color="#C084FC"
              />
            </mesh>
          </group>
        )}

        {/* 6. QA PROCESSES: Quality Lifecycle Continuum */}
        {activeCapabilityId === 'qa-processes' && (
          <group rotation={[0.25, -0.2, 0]}>
            <mesh>
              <torusGeometry args={[1.45, 0.045, 24, 120]} />
              <meshStandardMaterial
                color="#D6C7B2"
                emissive="#D6C7B2"
                emissiveIntensity={0.3}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            {[0, 1, 2, 3, 4, 5].map((stepIdx) => {
              const angle = (stepIdx * Math.PI) / 3;
              const highlight = stepIdx % 3 === activeLensIndex;
              return (
                <mesh
                  key={stepIdx}
                  position={[Math.cos(angle) * 1.45, Math.sin(angle) * 1.45, 0]}
                  scale={highlight ? 1.35 : 1.0}
                >
                  <octahedronGeometry args={[0.18, 0]} />
                  <meshStandardMaterial
                    color={highlight ? '#6EE7B7' : '#F5F2EB'}
                    emissive={highlight ? '#6EE7B7' : '#D6C7B2'}
                    emissiveIntensity={highlight ? 0.8 : 0.2}
                    metalness={0.85}
                    roughness={0.2}
                  />
                </mesh>
              );
            })}
          </group>
        )}
      </Float>
    </group>
  );
}

/* ==========================================================================
   CHAPTER 4 INSTALLATION (z = -48): THE CHRONOS ARCH & ACADEMIC MONOLITH
   ========================================================================== */
function JourneyChronosInstallation({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const px = reducedMotion ? 0 : state.pointer.x * 0.18;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      0.24 + px,
      3.5,
      delta
    );
  });

  return (
    <group ref={groupRef} position={[1.85, 0.0, -48]}>
      {/* Rising Architectural Arches */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0, -0.2 + i * 0.15, -i * 0.85]}
          rotation={[0, -0.25, 0]}
        >
          <torusGeometry args={[1.65 - i * 0.22, 0.035, 24, 96, Math.PI * 1.35]} />
          <meshPhysicalMaterial
            color="#D6C7B2"
            emissive="#D6C7B2"
            emissiveIntensity={0.22}
            metalness={0.92}
            roughness={0.18}
            clearcoat={1}
          />
        </mesh>
      ))}

      {/* Central Faceted Academic & Career Monolith */}
      <Float
        speed={reducedMotion ? 0 : 1.2}
        rotationIntensity={reducedMotion ? 0 : 0.15}
        floatIntensity={reducedMotion ? 0 : 0.25}
      >
        <mesh position={[0, 0.1, -0.4]} rotation={[0.2, 0.6, 0]}>
          <dodecahedronGeometry args={[0.88, 0]} />
          <MeshTransmissionMaterial
            samples={4}
            resolution={128}
            transmission={0.92}
            roughness={0.12}
            thickness={1.4}
            color="#F5F2EB"
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ==========================================================================
   CHAPTER 5 INSTALLATION (z = -64): THE HORIZON BEACON (CONTACT)
   ========================================================================== */
function ContactHorizonBeacon({ reducedMotion }: { reducedMotion: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.18;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.32;
      innerRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group position={[0, 0.15, -64]}>
      <mesh ref={ringRef} rotation={[0.15, 0, 0]}>
        <torusGeometry args={[2.1, 0.04, 32, 128]} />
        <meshStandardMaterial
          color="#F5F2EB"
          emissive="#E85D3F"
          emissiveIntensity={0.55}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.72, 0]} />
        <meshPhysicalMaterial
          color="#172326"
          emissive="#6EE7B7"
          emissiveIntensity={0.35}
          metalness={0.88}
          roughness={0.15}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

/* ==========================================================================
   MASTER CAMERA DIRECTOR (SMOOTH SCROLL CHOREOGRAPHY ACROSS ALL 5 CHAPTERS)
   ========================================================================== */
function MasterCameraDirector({
  scrollProgress,
  reducedMotion,
}: {
  scrollProgress: number;
  reducedMotion: boolean;
}) {
  const lookAtTarget = useRef(new THREE.Vector3(1.15, 0.05, 0));

  const waypoints = useMemo(
    () => CHAPTERS.map((ch) => CHAPTER_WAYPOINTS[ch.id]),
    []
  );

  useFrame((state, delta) => {
    const totalSegments = waypoints.length - 1;
    const scaled = Math.min(totalSegments, Math.max(0, scrollProgress * totalSegments));
    const idx = Math.min(totalSegments - 1, Math.floor(scaled));
    const frac = scaled - idx;

    // Smoothstep interpolation between adjacent chapters
    const smoothFrac = frac * frac * (3 - 2 * frac);

    const wpA = waypoints[idx];
    const wpB = waypoints[idx + 1];

    const isMobileViewport = state.size.width < 880;
    const mobileXOffset = isMobileViewport ? -0.95 : 0;
    const mobileZOffset = isMobileViewport ? 1.45 : 0;

    const targetCamX =
      THREE.MathUtils.lerp(wpA.cameraPosition[0], wpB.cameraPosition[0], smoothFrac) +
      mobileXOffset +
      (reducedMotion ? 0 : state.pointer.x * 0.22);
    const targetCamY =
      THREE.MathUtils.lerp(wpA.cameraPosition[1], wpB.cameraPosition[1], smoothFrac) +
      (reducedMotion ? 0 : state.pointer.y * 0.16);
    const targetCamZ =
      THREE.MathUtils.lerp(wpA.cameraPosition[2], wpB.cameraPosition[2], smoothFrac) +
      mobileZOffset;

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      targetCamX,
      3.6,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      targetCamY,
      3.6,
      delta
    );
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetCamZ,
      3.6,
      delta
    );

    const lookX =
      THREE.MathUtils.lerp(wpA.cameraTarget[0], wpB.cameraTarget[0], smoothFrac) +
      (isMobileViewport ? -0.55 : 0);
    const lookY = THREE.MathUtils.lerp(wpA.cameraTarget[1], wpB.cameraTarget[1], smoothFrac);
    const lookZ = THREE.MathUtils.lerp(wpA.cameraTarget[2], wpB.cameraTarget[2], smoothFrac);

    lookAtTarget.current.x = THREE.MathUtils.damp(lookAtTarget.current.x, lookX, 4.2, delta);
    lookAtTarget.current.y = THREE.MathUtils.damp(lookAtTarget.current.y, lookY, 4.2, delta);
    lookAtTarget.current.z = THREE.MathUtils.damp(lookAtTarget.current.z, lookZ, 4.2, delta);

    state.camera.lookAt(lookAtTarget.current);
  });

  return null;
}

function checkWebGL(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const VerificationCoreScene: React.FC<SculpturalWorldProps> = (props) => {
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    setWebglAvailable(checkWebGL());
  }, []);

  if (!webglAvailable) {
    return (
      <div className="sculptural-fallback" aria-hidden="true">
        <div className="sculptural-fallback__orb sculptural-fallback__orb--primary" />
        <div className="sculptural-fallback__orb sculptural-fallback__orb--secondary" />
      </div>
    );
  }

  return (
    <div className="sculptural-canvas-wrap" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0.65, 0.25, 6.2], fov: 42, near: 0.1, far: 120 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#07070A']} />
        <fog attach="fog" args={['#07070A', 5.5, 16.5]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 10, 6]} intensity={1.6} color="#F5F2EB" />
        <pointLight position={[-5, 2, 3]} intensity={1.8} color="#E85D3F" />

        <StudioLightingRig />

        <MasterCameraDirector
          scrollProgress={props.scrollProgress}
          reducedMotion={props.reducedMotion}
        />

        {/* Atmospheric Studio Dust Motes Along the Entire 5-Chapter Gallery */}
        <Sparkles
          count={220}
          scale={[12, 6, 76]}
          position={[0, 0, -32]}
          size={1.6}
          speed={props.reducedMotion ? 0 : 0.25}
          opacity={0.35}
          color="#D6C7B2"
        />

        {/* 5 Distinct Sculptural Installations in 3D World Space */}
        <HeroPrismMonolith reducedMotion={props.reducedMotion} />

        <PhilosophyStrataInstallation
          activePlatformIndex={props.activePlatformIndex}
          reducedMotion={props.reducedMotion}
        />

        <CapabilitiesDioramaStage
          activeCapabilityId={props.activeCapabilityId}
          activeLensIndex={props.activeLensIndex}
          reducedMotion={props.reducedMotion}
        />

        <JourneyChronosInstallation reducedMotion={props.reducedMotion} />

        <ContactHorizonBeacon reducedMotion={props.reducedMotion} />
      </Canvas>
    </div>
  );
};
