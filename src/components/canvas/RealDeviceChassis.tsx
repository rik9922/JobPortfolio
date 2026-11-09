import React from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { RealIPhone15Device } from './RealIPhone15Device';

export interface DeviceChassisProps {
  formFactor: 'web' | 'pwa' | 'android' | 'ios';
  screenTexture: THREE.CanvasTexture;
  accent: string;
  isHero: boolean;
}

export const RealDeviceChassis: React.FC<DeviceChassisProps> = ({
  formFactor,
  screenTexture,
  accent,
  isHero,
}) => {
  if (formFactor === 'ios') {
    // Real 3D Apple iPhone 15 Pro Max GLB Model
    return <RealIPhone15Device screenTexture={screenTexture} isHero={isHero} />;
  }

  if (formFactor === 'web') {
    // 32-inch 4K Apple Studio Display Desktop
    const W = 3.6;
    const H = 2.25;
    const D = 0.08;
    return (
      <group>
        {/* Rear Aluminum Enclosure */}
        <RoundedBox args={[W, H, D]} radius={0.05} smoothness={5}>
          <meshPhysicalMaterial
            color={isHero ? '#1e222a' : '#14171f'}
            metalness={0.94}
            roughness={0.2}
            clearcoat={0.3}
            clearcoatRoughness={0.2}
          />
        </RoundedBox>

        {/* Display Glass Bezel */}
        <mesh position={[0, 0, D / 2 + 0.002]}>
          <planeGeometry args={[W - 0.04, H - 0.04]} />
          <meshPhysicalMaterial color="#050608" roughness={0.1} metalness={0.1} />
        </mesh>

        {/* Crisp 4K Screen Display */}
        <mesh position={[0, 0, D / 2 + 0.004]}>
          <planeGeometry args={[W - 0.14, H - 0.14]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>

        {/* Top Center Stage Camera Dot */}
        <mesh position={[0, H / 2 - 0.038, D / 2 + 0.005]}>
          <circleGeometry args={[0.016, 16]} />
          <meshBasicMaterial color="#020305" />
        </mesh>

        {/* Studio Display Pedestal Stand */}
        <group position={[0, -H / 2 - 0.38, -0.08]}>
          {/* Tilted vertical arm with cable pass-through hole */}
          <mesh position={[0, 0.22, -0.06]} rotation={[0.08, 0, 0]}>
            <boxGeometry args={[0.38, 0.52, 0.035]} />
            <meshPhysicalMaterial color="#1a1d26" metalness={0.92} roughness={0.22} />
          </mesh>
          {/* Cable hole in stand arm */}
          <mesh position={[0, 0.16, -0.06]} rotation={[0.08, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.04, 24]} />
            <meshBasicMaterial color="#080a0f" />
          </mesh>
          {/* Flat desktop baseplate */}
          <mesh position={[0, 0, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.96, 0.74, 0.018]} />
            <meshPhysicalMaterial color="#1c202a" metalness={0.92} roughness={0.22} />
          </mesh>
        </group>
      </group>
    );
  }

  if (formFactor === 'pwa') {
    // Liquid Retina iPad Pro 12.9" Tablet
    const W = 3.15;
    const H = 2.28;
    const D = 0.072;
    return (
      <group>
        {/* Space Gray Anodized Unibody Chassis */}
        <RoundedBox args={[W, H, D]} radius={0.16} smoothness={6}>
          <meshPhysicalMaterial
            color={isHero ? '#1c212a' : '#12151d'}
            metalness={0.92}
            roughness={0.22}
            clearcoat={0.3}
            clearcoatRoughness={0.2}
          />
        </RoundedBox>

        {/* Symmetrical Liquid Retina Display Bezel */}
        <mesh position={[0, 0, D / 2 + 0.002]}>
          <planeGeometry args={[W - 0.05, H - 0.05]} />
          <meshPhysicalMaterial color="#06070a" roughness={0.15} metalness={0.05} />
        </mesh>

        {/* Crisp Tablet Screen Display */}
        <mesh position={[0, 0, D / 2 + 0.004]}>
          <planeGeometry args={[W - 0.16, H - 0.16]} />
          <meshBasicMaterial map={screenTexture} toneMapped={false} />
        </mesh>

        {/* Landscape TrueDepth Camera Dot */}
        <mesh position={[0, H / 2 - 0.042, D / 2 + 0.005]}>
          <circleGeometry args={[0.02, 16]} />
          <meshBasicMaterial color="#020304" />
        </mesh>

        {/* Magnetic Apple Pencil Connector Strip on Top Edge */}
        <mesh position={[0, H / 2 + 0.002, 0]}>
          <boxGeometry args={[1.1, 0.008, D * 0.7]} />
          <meshPhysicalMaterial color="#2c3342" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Rear Apple Dual-Camera Module + LiDAR */}
        <group position={[-W / 2 + 0.28, H / 2 - 0.28, -D / 2 - 0.015]}>
          <RoundedBox args={[0.34, 0.34, 0.03]} radius={0.06} smoothness={4}>
            <meshPhysicalMaterial color="#141822" metalness={0.9} roughness={0.2} />
          </RoundedBox>
          <mesh position={[-0.07, 0.07, -0.016]}>
            <cylinderGeometry args={[0.055, 0.055, 0.01, 20]} />
            <meshPhysicalMaterial color="#080b10" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[-0.07, -0.07, -0.016]}>
            <cylinderGeometry args={[0.055, 0.055, 0.01, 20]} />
            <meshPhysicalMaterial color="#080b10" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0.08, -0.07, -0.016]}>
            <cylinderGeometry args={[0.035, 0.035, 0.008, 16]} />
            <meshBasicMaterial color="#030406" />
          </mesh>
        </group>
      </group>
    );
  }

  // Android: Samsung Galaxy S24 Ultra Flagship Smartphone
  // Distinctive sharp rectangular corners, titanium rails, floating triple camera lenses
  const W = 1.32;
  const H = 2.68;
  const D = 0.082;
  return (
    <group>
      {/* Titanium Armor Unibody Chassis with S24 Ultra Sharp Profile */}
      <RoundedBox args={[W, H, D]} radius={0.045} smoothness={5}>
        <meshPhysicalMaterial
          color={isHero ? '#1e2225' : '#121518'}
          metalness={0.96}
          roughness={0.2}
          clearcoat={0.4}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>

      {/* Titanium Side Buttons on Right Rail */}
      <group position={[W / 2 + 0.006, 0.32, 0]}>
        {/* Long Volume Rocker */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.01, 0.28, 0.032]} />
          <meshPhysicalMaterial color="#262f2c" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Power / Lock Key */}
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[0.01, 0.16, 0.032]} />
          <meshPhysicalMaterial color="#262f2c" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* Top Earpiece Speaker Micro-Slit */}
      <mesh position={[0, H / 2 - 0.018, D / 2 + 0.003]}>
        <boxGeometry args={[0.22, 0.006, 0.004]} />
        <meshBasicMaterial color="#060908" />
      </mesh>

      {/* Ultra-Narrow Display Bezel */}
      <mesh position={[0, 0, D / 2 + 0.002]}>
        <planeGeometry args={[W - 0.032, H - 0.036]} />
        <meshPhysicalMaterial color="#030504" roughness={0.12} metalness={0.08} />
      </mesh>

      {/* Gorilla Armor Antireflective AMOLED Display */}
      <mesh position={[0, 0, D / 2 + 0.004]}>
        <planeGeometry args={[W - 0.07, H - 0.075]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>

      {/* Infinity-O Centered Punch Hole Selfie Camera with Optical Lens Reflection */}
      <mesh position={[0, H / 2 - 0.08, D / 2 + 0.005]}>
        <circleGeometry args={[0.024, 20]} />
        <meshBasicMaterial color="#020304" />
      </mesh>
      <mesh position={[0.006, H / 2 - 0.076, D / 2 + 0.0055]}>
        <circleGeometry args={[0.007, 12]} />
        <meshBasicMaterial color="#34d399" />
      </mesh>

      {/* Rear S24 Ultra Floating Camera Lens Rings (arranged vertically on upper left) */}
      <group position={[-0.34, 0, -D / 2 - 0.018]}>
        {/* Lens 1: 200MP Main Wide */}
        <group position={[0, 0.88, 0]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Titanium Outer Knurled Ring */}
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 0.038, 28]} />
            <meshPhysicalMaterial color="#222b27" metalness={0.96} roughness={0.18} />
          </mesh>
          {/* Sapphire Glass Disc */}
          <mesh position={[0, -0.016, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.01, 24]} />
            <meshPhysicalMaterial color="#080d0a" metalness={0.9} roughness={0.08} />
          </mesh>
          {/* Inner Optical Pupil */}
          <mesh position={[0, -0.021, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.004, 18]} />
            <meshBasicMaterial color="#05170f" />
          </mesh>
        </group>

        {/* Lens 2: 12MP Ultra-Wide */}
        <group position={[0, 0.54, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 0.038, 28]} />
            <meshPhysicalMaterial color="#222b27" metalness={0.96} roughness={0.18} />
          </mesh>
          <mesh position={[0, -0.016, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.01, 24]} />
            <meshPhysicalMaterial color="#080d0a" metalness={0.9} roughness={0.08} />
          </mesh>
          <mesh position={[0, -0.021, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.004, 18]} />
            <meshBasicMaterial color="#05170f" />
          </mesh>
        </group>

        {/* Lens 3: 50MP Periscope Telephoto */}
        <group position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 0.038, 28]} />
            <meshPhysicalMaterial color="#222b27" metalness={0.96} roughness={0.18} />
          </mesh>
          <mesh position={[0, -0.016, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.01, 24]} />
            <meshPhysicalMaterial color="#080d0a" metalness={0.9} roughness={0.08} />
          </mesh>
          <mesh position={[0, -0.021, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.004, 18]} />
            <meshBasicMaterial color="#05170f" />
          </mesh>
        </group>

        {/* Right sub-column: Laser AF + LED Flash + 10MP Telephoto */}
        <group position={[0.26, 0.88, 0]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Laser Auto Focus Sensor */}
          <mesh>
            <cylinderGeometry args={[0.058, 0.058, 0.025, 20]} />
            <meshPhysicalMaterial color="#1a221e" metalness={0.92} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.012, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.006, 16]} />
            <meshBasicMaterial color="#030604" />
          </mesh>
        </group>

        {/* Dual-Tone LED Flash */}
        <group position={[0.26, 0.68, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.045, 0.045, 0.02, 16]} />
            <meshPhysicalMaterial color="#262f2b" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={[0, -0.009, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.006, 16]} />
            <meshBasicMaterial color="#ffe8aa" />
          </mesh>
        </group>

        {/* 3x Optical Telephoto Lens */}
        <group position={[0.26, 0.44, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.095, 0.095, 0.03, 24]} />
            <meshPhysicalMaterial color="#222b27" metalness={0.96} roughness={0.18} />
          </mesh>
          <mesh position={[0, -0.012, 0]}>
            <cylinderGeometry args={[0.078, 0.078, 0.008, 20]} />
            <meshBasicMaterial color="#07100b" />
          </mesh>
        </group>
      </group>
    </group>
  );
};
