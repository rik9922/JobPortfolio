import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Edges,
  Float,
  Html,
  Line,
  OrbitControls,
  QuadraticBezierLine,
} from '@react-three/drei';
import * as THREE from 'three';
import { CAMERA_WAYPOINTS, CAPABILITY_DOMAINS } from '../../data/portfolioData';
import { CoreSimulationState, SectionId } from '../../types/portfolio';

interface VerificationCoreSceneProps {
  activeSection: SectionId;
  scrollProgress: number;
  activeCapabilityId: string;
  onSelectCapability: (id: string) => void;
  simulationState: CoreSimulationState;
  inspectMode: boolean;
  reducedMotion: boolean;
}

const VERTEX_SHADER = `
  uniform float uTime;
  uniform float uDisplaceStrength;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  varying float vPattern;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    
    float wave1 = sin(position.x * 3.5 + uTime * 1.8) * cos(position.y * 3.5 + uTime * 1.4);
    float wave2 = sin(position.z * 4.2 - uTime * 2.1);
    float displacement = (wave1 * 0.6 + wave2 * 0.4) * uDisplaceStrength;
    
    vPattern = wave1 * 0.5 + 0.5;
    vec3 displacedPosition = position + normal * displacement;
    vPosition = displacedPosition;

    vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec3 uPrimaryColor;
  uniform vec3 uSecondaryColor;
  uniform float uAccentIntensity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  varying float vPattern;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Fresnel rim calculation
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.4);
    
    // Procedural telemetry scanlines
    float scanlineH = sin(vPosition.y * 28.0 - uTime * 4.0) * 0.5 + 0.5;
    float scanlineV = cos(vPosition.x * 22.0 + uTime * 2.5) * 0.5 + 0.5;
    float gridBand = smoothstep(0.88, 0.98, scanlineH) + smoothstep(0.92, 0.99, scanlineV) * 0.55;
    
    vec3 baseDark = vec3(0.04, 0.05, 0.08);
    vec3 coreMix = mix(uPrimaryColor, uSecondaryColor, vPattern);
    
    vec3 finalColor = mix(baseDark, coreMix, fresnel * 0.82 + gridBand * 0.35);
    finalColor += uPrimaryColor * fresnel * 0.65 * uAccentIntensity;
    finalColor += uSecondaryColor * gridBand * 0.28;

    gl_FragColor = vec4(finalColor, 0.95);
  }
`;

const STATE_COLORS: Record<CoreSimulationState, { primary: string; secondary: string; displace: number }> = {
  nominal: { primary: '#10B981', secondary: '#FF4D29', displace: 0.045 },
  executing: { primary: '#FF4D29', secondary: '#38BDF8', displace: 0.085 },
  defect_trace: { primary: '#F59E0B', secondary: '#FF4D29', displace: 0.115 },
  ai_synthesis: { primary: '#A78BFA', secondary: '#10B981', displace: 0.075 },
};

function TelemetryParticleField({
  reducedMotion,
  simulationState,
}: {
  reducedMotion: boolean;
  simulationState: CoreSimulationState;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 950;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cVermilion = new THREE.Color('#FF4D29');
    const cEmerald = new THREE.Color('#10B981');
    const cSlate = new THREE.Color('#646B78');

    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random distribution using golden angle
      const t = i / count;
      const angle = i * 2.399963229728653;
      const radius = 3.2 + (i % 19) * 0.55;
      const ySpread = ((i % 37) / 37 - 0.5) * 9.5;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = ySpread;
      pos[i * 3 + 2] = Math.sin(angle) * radius - 1.5;

      const picked = t < 0.16 ? cVermilion : t < 0.34 ? cEmerald : cSlate;
      col[i * 3] = picked.r;
      col[i * 3 + 1] = picked.g;
      col[i * 3 + 2] = picked.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    const speedMultiplier = simulationState === 'executing' ? 2.1 : 1.0;
    pointsRef.current.rotation.y += delta * 0.032 * speedMultiplier;
    pointsRef.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.036}
        vertexColors
        transparent
        opacity={0.68}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function ArchitecturalReferenceGrid() {
  const gridPoints = useMemo(() => {
    const lines: [number, number, number][][] = [];
    const extent = 14;
    const step = 1.75;
    for (let i = -extent; i <= extent; i += step) {
      lines.push([
        [i, -3.3, -extent],
        [i, -3.3, extent],
      ]);
      lines.push([
        [-extent, -3.3, i],
        [extent, -3.3, i],
      ]);
    }
    return lines;
  }, []);

  return (
    <group>
      {gridPoints.map((pts, idx) => (
        <Line
          key={idx}
          points={pts}
          color="#232834"
          lineWidth={0.6}
          transparent
          opacity={0.28}
        />
      ))}
    </group>
  );
}

function OrbitalSatelliteNode({
  domain,
  isSelected,
  onSelect,
  ringSpread,
  reducedMotion,
  showLabel,
}: {
  domain: (typeof CAPABILITY_DOMAINS)[0];
  isSelected: boolean;
  onSelect: (id: string) => void;
  ringSpread: number;
  reducedMotion: boolean;
  showLabel: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useMemo<[number, number, number]>(() => {
    const r = domain.orbitRadius * ringSpread;
    return [
      Math.cos(domain.orbitAngle) * r,
      domain.orbitHeight,
      Math.sin(domain.orbitAngle) * r,
    ];
  }, [domain.orbitAngle, domain.orbitHeight, domain.orbitRadius, ringSpread]);

  useFrame((_, delta) => {
    if (meshRef.current && !reducedMotion) {
      meshRef.current.rotation.x += delta * (isSelected || hovered ? 1.4 : 0.45);
      meshRef.current.rotation.y += delta * (isSelected || hovered ? 1.8 : 0.6);
    }
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.damp(
        groupRef.current.position.x,
        basePosition[0],
        4,
        delta
      );
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        basePosition[1],
        4,
        delta
      );
      groupRef.current.position.z = THREE.MathUtils.damp(
        groupRef.current.position.z,
        basePosition[2],
        4,
        delta
      );
    }
  });

  const activeHighlight = isSelected || hovered;

  return (
    <group>
      <QuadraticBezierLine
        start={[0, 0, 0]}
        mid={[basePosition[0] * 0.45, basePosition[1] + 0.55, basePosition[2] * 0.45]}
        end={basePosition}
        color={activeHighlight ? domain.color : '#2E3442'}
        lineWidth={activeHighlight ? 2.2 : 0.9}
        transparent
        opacity={activeHighlight ? 0.92 : 0.35}
        dashed={!activeHighlight}
        dashScale={6}
        dashSize={0.4}
        gapSize={0.2}
      />

      <group ref={groupRef} position={basePosition}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(domain.id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          scale={activeHighlight ? 1.28 : 1.0}
        >
          <octahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial
            color={activeHighlight ? domain.color : '#171A21'}
            emissive={domain.color}
            emissiveIntensity={activeHighlight ? 0.85 : 0.22}
            metalness={0.85}
            roughness={0.2}
          />
          <Edges scale={1.06} threshold={15} color={domain.color} />
        </mesh>

        {/* Outer orbital halo on active node */}
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={activeHighlight ? 1.45 : 1.0}>
          <ringGeometry args={[0.32, 0.35, 32]} />
          <meshBasicMaterial
            color={domain.color}
            side={THREE.DoubleSide}
            transparent
            opacity={activeHighlight ? 0.85 : 0.25}
          />
        </mesh>

        {showLabel && (
          <Html
            position={[0, 0.44, 0]}
            center
            zIndexRange={[5, 0]}
          >
            <button
              type="button"
              onClick={() => onSelect(domain.id)}
              className={`core-node-tag ${activeHighlight ? 'core-node-tag--active' : ''}`}
              style={
                {
                  '--node-color': domain.color,
                } as React.CSSProperties
              }
              aria-label={`Inspect ${domain.title} node`}
            >
              <span className="core-node-tag__idx">{domain.index}</span>
              <span className="core-node-tag__txt">{domain.shortTitle}</span>
            </button>
          </Html>
        )}
      </group>
    </group>
  );
}

function VerificationCoreAssembly({
  activeSection,
  scrollProgress,
  activeCapabilityId,
  onSelectCapability,
  simulationState,
  inspectMode,
  reducedMotion,
}: VerificationCoreSceneProps) {
  const { camera } = useThree();
  const rootGroupRef = useRef<THREE.Group>(null);
  const kernelMeshRef = useRef<THREE.Mesh>(null);
  const cageMeshRef = useRef<THREE.Mesh>(null);
  const ringExploreRef = useRef<THREE.Mesh>(null);
  const ringAutomateRef = useRef<THREE.Mesh>(null);
  const ringAiRef = useRef<THREE.Mesh>(null);
  const platformGroupRef = useRef<THREE.Group>(null);
  const shaderMatRef = useRef<THREE.ShaderMaterial>(null);

  const cameraLookAtRef = useRef(new THREE.Vector3(0.85, 0.05, 0));

  const selectedDomain = useMemo(
    () => CAPABILITY_DOMAINS.find((d) => d.id === activeCapabilityId) || CAPABILITY_DOMAINS[0],
    [activeCapabilityId]
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDisplaceStrength: { value: 0.045 },
      uPrimaryColor: { value: new THREE.Color('#10B981') },
      uSecondaryColor: { value: new THREE.Color('#FF4D29') },
      uAccentIntensity: { value: 1.0 },
    }),
    []
  );

  useFrame((state, delta) => {
    const waypoint = CAMERA_WAYPOINTS[activeSection] || CAMERA_WAYPOINTS.hero;
    const stateSpec = STATE_COLORS[simulationState] || STATE_COLORS.nominal;

    // Update shader uniforms without triggering React re-renders
    if (shaderMatRef.current) {
      if (!reducedMotion) {
        shaderMatRef.current.uniforms.uTime.value +=
          delta * (simulationState === 'executing' ? 1.85 : 1.0);
      }
      shaderMatRef.current.uniforms.uDisplaceStrength.value = THREE.MathUtils.damp(
        shaderMatRef.current.uniforms.uDisplaceStrength.value,
        reducedMotion ? 0.015 : stateSpec.displace,
        4,
        delta
      );

      const targetPrimary = new THREE.Color(
        activeSection === 'capabilities' ? selectedDomain.color : stateSpec.primary
      );
      const targetSecondary = new THREE.Color(stateSpec.secondary);

      shaderMatRef.current.uniforms.uPrimaryColor.value.lerp(targetPrimary, delta * 3.5);
      shaderMatRef.current.uniforms.uSecondaryColor.value.lerp(targetSecondary, delta * 3.5);
      shaderMatRef.current.uniforms.uAccentIntensity.value = THREE.MathUtils.damp(
        shaderMatRef.current.uniforms.uAccentIntensity.value,
        waypoint.accentIntensity,
        4,
        delta
      );
    }

    // Camera choreography when not in manual OrbitControls inspect mode
    if (!inspectMode) {
      const pointerOffsetX = reducedMotion ? 0 : state.pointer.x * 0.38;
      const pointerOffsetY = reducedMotion ? 0 : state.pointer.y * 0.26;

      // Subtle viewport compensation for narrow screens so the 3D core stays centered and visible
      const isCompactViewport = state.size.width < 900;
      const targetCamX = isCompactViewport ? 0 : waypoint.position[0] + pointerOffsetX;
      const targetCamY = (isCompactViewport ? waypoint.position[1] + 0.35 : waypoint.position[1]) + pointerOffsetY;
      const targetCamZ = isCompactViewport ? waypoint.position[2] + 1.45 : waypoint.position[2];

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 3.2, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 3.2, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 3.2, delta);

      const lookX = isCompactViewport ? 0 : waypoint.target[0];
      const lookY = isCompactViewport ? 0.1 : waypoint.target[1];
      const lookZ = waypoint.target[2];

      cameraLookAtRef.current.x = THREE.MathUtils.damp(cameraLookAtRef.current.x, lookX, 3.8, delta);
      cameraLookAtRef.current.y = THREE.MathUtils.damp(cameraLookAtRef.current.y, lookY, 3.8, delta);
      cameraLookAtRef.current.z = THREE.MathUtils.damp(cameraLookAtRef.current.z, lookZ, 3.8, delta);
      camera.lookAt(cameraLookAtRef.current);
    }

    // Rotate core assembly & gyroscopic calibration rings
    if (rootGroupRef.current) {
      const targetRotX =
        waypoint.coreRotation[0] + (reducedMotion ? 0 : state.pointer.y * 0.18);
      const targetRotY =
        waypoint.coreRotation[1] +
        scrollProgress * Math.PI * 1.4 +
        (reducedMotion ? 0 : state.pointer.x * 0.25);
      const targetRotZ = waypoint.coreRotation[2];

      rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        3.5,
        delta
      );
      rootGroupRef.current.rotation.y = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.y,
        targetRotY,
        3.5,
        delta
      );
      rootGroupRef.current.rotation.z = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.z,
        targetRotZ,
        3.5,
        delta
      );
    }

    if (!reducedMotion) {
      const rate = simulationState === 'executing' ? 1.9 : simulationState === 'defect_trace' ? 1.4 : 1.0;
      if (kernelMeshRef.current) {
        kernelMeshRef.current.rotation.y += delta * 0.28 * rate;
        kernelMeshRef.current.rotation.z += delta * 0.14 * rate;
      }
      if (cageMeshRef.current) {
        cageMeshRef.current.rotation.y -= delta * 0.18 * rate;
        cageMeshRef.current.rotation.x += delta * 0.12 * rate;
      }
      if (ringExploreRef.current) {
        ringExploreRef.current.rotation.z += delta * 0.35 * rate;
      }
      if (ringAutomateRef.current) {
        ringAutomateRef.current.rotation.x -= delta * 0.42 * rate;
        ringAutomateRef.current.rotation.y += delta * 0.18 * rate;
      }
      if (ringAiRef.current) {
        ringAiRef.current.rotation.y += delta * 0.5 * rate;
        ringAiRef.current.rotation.z -= delta * 0.22 * rate;
      }
      if (platformGroupRef.current) {
        platformGroupRef.current.rotation.y -= delta * 0.22;
      }
    }
  });

  const waypoint = CAMERA_WAYPOINTS[activeSection] || CAMERA_WAYPOINTS.hero;
  const activeColor =
    simulationState === 'defect_trace'
      ? '#F59E0B'
      : simulationState === 'executing'
        ? '#FF4D29'
        : simulationState === 'ai_synthesis'
          ? '#A78BFA'
          : '#10B981';

  return (
    <group ref={rootGroupRef} position={[1.15, 0, 0]}>
      <Float
        speed={reducedMotion ? 0 : 1.6}
        rotationIntensity={reducedMotion ? 0 : 0.18}
        floatIntensity={reducedMotion ? 0 : 0.35}
      >
        {/* 1. Inner Crystalline Verification Kernel (Custom GLSL Shader) */}
        <mesh ref={kernelMeshRef}>
          <icosahedronGeometry args={[1.08, 6]} />
          <shaderMaterial
            ref={shaderMatRef}
            vertexShader={VERTEX_SHADER}
            fragmentShader={FRAGMENT_SHADER}
            uniforms={uniforms}
            transparent
          />
        </mesh>

        {/* 2. Outer Geodesic Wireframe Telemetry Cage */}
        <mesh ref={cageMeshRef} scale={1.32}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial
            color="#111318"
            metalness={0.9}
            roughness={0.15}
            wireframe
            transparent
            opacity={0.42}
          />
          <Edges scale={1.01} threshold={12} color={activeColor} />
        </mesh>

        {/* 3. Gyroscopic Calibration Ring I — EXPLORE */}
        <mesh
          ref={ringExploreRef}
          rotation={[Math.PI / 2.6, 0.2, 0]}
          scale={waypoint.ringSpread}
        >
          <torusGeometry args={[1.78, 0.018, 16, 120]} />
          <meshStandardMaterial
            color="#F4F4F0"
            emissive="#10B981"
            emissiveIntensity={0.4}
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>

        {/* 4. Gyroscopic Calibration Ring II — AUTOMATE */}
        <mesh
          ref={ringAutomateRef}
          rotation={[0.35, Math.PI / 3, Math.PI / 4]}
          scale={waypoint.ringSpread * 1.08}
        >
          <torusGeometry args={[2.12, 0.022, 16, 120]} />
          <meshStandardMaterial
            color="#FF4D29"
            emissive="#FF4D29"
            emissiveIntensity={0.65}
            metalness={0.88}
            roughness={0.22}
          />
        </mesh>

        {/* 5. Gyroscopic Calibration Ring III — AI-ASSISTED ENGINEERING */}
        <mesh
          ref={ringAiRef}
          rotation={[-Math.PI / 3.2, -0.4, Math.PI / 2.2]}
          scale={waypoint.ringSpread * 1.15}
        >
          <torusGeometry args={[2.46, 0.015, 16, 120]} />
          <meshStandardMaterial
            color="#9CA3AF"
            emissive={activeColor}
            emissiveIntensity={0.45}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* 6. Four Cross-Platform Verification Planes (Web, PWA, Android, iOS) */}
        <group ref={platformGroupRef}>
          {[0, 1, 2, 3].map((idx) => {
            const angle = (idx * Math.PI) / 2 + Math.PI / 4;
            const r = 1.92;
            return (
              <mesh
                key={idx}
                position={[Math.cos(angle) * r, Math.sin(idx * 1.5) * 0.25, Math.sin(angle) * r]}
                rotation={[0, -angle, 0]}
              >
                <boxGeometry args={[0.32, 0.18, 0.03]} />
                <meshStandardMaterial
                  color="#171A21"
                  emissive={idx % 2 === 0 ? '#10B981' : '#FF4D29'}
                  emissiveIntensity={activeSection === 'about' ? 0.9 : 0.35}
                  metalness={0.85}
                  roughness={0.2}
                />
                <Edges color="#F4F4F0" />
              </mesh>
            );
          })}
        </group>

        {/* 7. Six Interactive 3D Orbital Satellites (Capability Domains) */}
        {CAPABILITY_DOMAINS.map((domain) => (
          <OrbitalSatelliteNode
            key={domain.id}
            domain={domain}
            isSelected={activeCapabilityId === domain.id}
            onSelect={onSelectCapability}
            ringSpread={waypoint.ringSpread}
            reducedMotion={reducedMotion}
            showLabel={inspectMode || activeSection === 'hero'}
          />
        ))}
      </Float>
    </group>
  );
}

function checkWebGLSupport(): boolean {
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

export const VerificationCoreScene: React.FC<VerificationCoreSceneProps> = (props) => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setWebglSupported(checkWebGLSupport());
  }, []);

  if (!webglSupported) {
    return (
      <div className="webgl-fallback" role="img" aria-label="Verification Core Interactive Schematic">
        <div className="webgl-fallback__grid" />
        <div className="webgl-fallback__core">
          <div className="webgl-fallback__ring webgl-fallback__ring--outer" />
          <div className="webgl-fallback__ring webgl-fallback__ring--mid" />
          <div className="webgl-fallback__ring webgl-fallback__ring--inner" />
          <div className="webgl-fallback__badge">
            VERIFICATION CORE // SCHEMATIC MODE
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`canvas-stage ${props.inspectMode ? 'canvas-stage--inspect' : ''}`}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [2.35, 0.45, 6.2], fov: 44, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#090A0D']} />
        <fog attach="fog" args={['#090A0D', 6.5, 19.5]} />

        <ambientLight intensity={0.65} />
        <directionalLight position={[6, 8, 5]} intensity={1.8} color="#F4F4F0" />
        <pointLight position={[-5, -3, -4]} intensity={1.4} color="#FF4D29" />
        <pointLight position={[3, 4, 2]} intensity={1.2} color="#10B981" />

        <VerificationCoreAssembly {...props} />
        <TelemetryParticleField
          reducedMotion={props.reducedMotion}
          simulationState={props.simulationState}
        />
        <ArchitecturalReferenceGrid />

        {props.inspectMode && (
          <OrbitControls
            enablePan={false}
            minDistance={3.2}
            maxDistance={10.5}
            dampingFactor={0.06}
            enableDamping
          />
        )}
      </Canvas>
    </div>
  );
};

