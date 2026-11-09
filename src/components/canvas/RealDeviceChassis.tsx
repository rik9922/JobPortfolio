import React from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { RealIPhone15Device } from './RealIPhone15Device';
import { RealMacBookDevice } from './RealMacBookDevice';
import { RealIPadDevice } from './RealIPadDevice';

export interface DeviceChassisProps {
  formFactor: 'web' | 'pwa' | 'android' | 'ios';
  screenTexture: THREE.CanvasTexture;
  accent: string;
  isHero: boolean;
}

export const RealDeviceChassis: React.FC<DeviceChassisProps> = ({
  formFactor,
  screenTexture,
  isHero,
}) => {
  if (formFactor === 'ios') {
    // Real 3D Apple iPhone 16 Pro Max / 15 Pro Max GLB Model (Grade 5 Titanium, Triple Sapphire Camera Plateau)
    return <RealIPhone15Device screenTexture={screenTexture} isHero={isHero} />;
  }

  if (formFactor === 'web') {
    return <RealMacBookDevice screenTexture={screenTexture} isHero={isHero} />;
  }

  if (formFactor === 'pwa') {
    return <RealIPadDevice screenTexture={screenTexture} isHero={isHero} />;
  }

  // High-End Latest Android: Samsung Galaxy S24 Ultra Titanium Flagship
  // Sharp rectangular unibody, Grade 5 Titanium rails, S-Pen stylus, floating 5-camera array
  const W = 1.32;
  const H = 2.68;
  const D = 0.082;
  return (
    <group>
      {/* 1. Grade 5 Titanium Armor Unibody Chassis with S24 Ultra Sharp Profile */}
      <RoundedBox args={[W, H, D]} radius={0.032} smoothness={5}>
        <meshPhysicalMaterial
          color={isHero ? '#1d2124' : '#121417'}
          metalness={0.96}
          roughness={0.2}
          clearcoat={0.4}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>

      {/* 2. Antenna Bands (Polymer cuts on top, bottom, and side rails) */}
      <mesh position={[-0.38, H / 2 + 0.001, 0]}>
        <boxGeometry args={[0.012, 0.004, D]} />
        <meshBasicMaterial color="#0d1114" />
      </mesh>
      <mesh position={[0.38, H / 2 + 0.001, 0]}>
        <boxGeometry args={[0.012, 0.004, D]} />
        <meshBasicMaterial color="#0d1114" />
      </mesh>
      <mesh position={[-0.38, -H / 2 - 0.001, 0]}>
        <boxGeometry args={[0.012, 0.004, D]} />
        <meshBasicMaterial color="#0d1114" />
      </mesh>
      <mesh position={[0.38, -H / 2 - 0.001, 0]}>
        <boxGeometry args={[0.012, 0.004, D]} />
        <meshBasicMaterial color="#0d1114" />
      </mesh>

      {/* 3. Titanium Side Buttons on Right Rail */}
      <group position={[W / 2 + 0.005, 0.32, 0]}>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.012, 0.28, 0.032]} />
          <meshPhysicalMaterial color="#2c3632" metalness={0.96} roughness={0.15} />
        </mesh>
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[0.012, 0.16, 0.032]} />
          <meshPhysicalMaterial color="#2c3632" metalness={0.96} roughness={0.15} />
        </mesh>
      </group>

      {/* 4. Bottom Rail Features: Clickable S-Pen Stylus + USB-C Port + Speaker Grille */}
      <group position={[0, -H / 2 - 0.002, 0]}>
        {/* S-Pen Stylus Clickable Titanium End Cap (Bottom Left) */}
        <mesh position={[-W / 2 + 0.12, 0, 0]}>
          <boxGeometry args={[0.07, 0.008, 0.04]} />
          <meshPhysicalMaterial color="#26302c" metalness={0.96} roughness={0.18} />
        </mesh>
        <mesh position={[-W / 2 + 0.12, -0.003, 0]}>
          <circleGeometry args={[0.015, 12]} />
          <meshBasicMaterial color="#0a0d0c" />
        </mesh>

        {/* USB-C Port with Gold Connector Pin Blade */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.13, 0.006, 0.038]} />
          <meshBasicMaterial color="#060809" />
        </mesh>
        <mesh position={[0, -0.001, 0]}>
          <boxGeometry args={[0.08, 0.003, 0.012]} />
          <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Speaker Grille Pill Cutout (Bottom Right) */}
        <mesh position={[0.26, 0, 0]}>
          <boxGeometry args={[0.22, 0.005, 0.024]} />
          <meshBasicMaterial color="#070a0b" />
        </mesh>

        {/* Primary Microphone Pinhole */}
        <mesh position={[-0.14, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.006, 12]} />
          <meshBasicMaterial color="#030405" />
        </mesh>
      </group>

      {/* 5. Top Rail Features: Dual Microphones + Earpiece Speaker */}
      <group position={[0, H / 2 + 0.002, 0]}>
        <mesh position={[-0.2, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.006, 12]} />
          <meshBasicMaterial color="#030405" />
        </mesh>
        <mesh position={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.006, 12]} />
          <meshBasicMaterial color="#030405" />
        </mesh>
      </group>

      {/* Earpiece Speaker Micro-Slit on Front Edge */}
      <mesh position={[0, H / 2 - 0.018, D / 2 + 0.003]}>
        <boxGeometry args={[0.22, 0.006, 0.004]} />
        <meshBasicMaterial color="#060908" />
      </mesh>

      {/* 6. Front Razor Bezel & Dynamic AMOLED 2X Display */}
      <mesh position={[0, 0, D / 2 + 0.002]}>
        <planeGeometry args={[W - 0.032, H - 0.036]} />
        <meshPhysicalMaterial color="#030504" roughness={0.12} metalness={0.08} />
      </mesh>

      {/* Corning Gorilla Glass Armor Display */}
      <mesh position={[0, 0, D / 2 + 0.004]}>
        <planeGeometry args={[W - 0.068, H - 0.072]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>

      {/* Infinity-O Centered Punch Hole Selfie Camera */}
      <mesh position={[0, H / 2 - 0.08, D / 2 + 0.005]}>
        <circleGeometry args={[0.024, 20]} />
        <meshBasicMaterial color="#020304" />
      </mesh>
      <mesh position={[0.006, H / 2 - 0.076, D / 2 + 0.0055]}>
        <circleGeometry args={[0.007, 12]} />
        <meshBasicMaterial color="#34d399" />
      </mesh>

      {/* 7. Rear Glass Backplate & Samsung Galaxy S24 Ultra Floating Camera System */}
      <mesh position={[0, 0, -D / 2 - 0.002]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[W - 0.02, H - 0.02]} />
        <meshPhysicalMaterial
          color="#4b5560"
          metalness={0.45}
          roughness={0.4}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Rear SAMSUNG Engraved Logo */}
      <mesh position={[0, -0.82, -D / 2 - 0.003]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.32, 0.045]} />
        <meshPhysicalMaterial color="#3c464e" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* S24 Ultra Floating 5-Camera Array (upper left) */}
      <group position={[-0.34, 0, -D / 2 - 0.018]}>
        {/* Lens 1: 200MP Main Wide */}
        <group position={[0, 0.88, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 0.038, 28]} />
            <meshPhysicalMaterial color="#26302c" metalness={0.96} roughness={0.16} />
          </mesh>
          <mesh position={[0, -0.016, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.01, 24]} />
            <meshPhysicalMaterial color="#080d0a" metalness={0.9} roughness={0.08} />
          </mesh>
          <mesh position={[0, -0.021, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.004, 18]} />
            <meshBasicMaterial color="#072216" />
          </mesh>
        </group>

        {/* Lens 2: 12MP Ultra-Wide */}
        <group position={[0, 0.54, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 0.038, 28]} />
            <meshPhysicalMaterial color="#26302c" metalness={0.96} roughness={0.16} />
          </mesh>
          <mesh position={[0, -0.016, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.01, 24]} />
            <meshPhysicalMaterial color="#080d0a" metalness={0.9} roughness={0.08} />
          </mesh>
          <mesh position={[0, -0.021, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.004, 18]} />
            <meshBasicMaterial color="#072216" />
          </mesh>
        </group>

        {/* Lens 3: 50MP 5x Periscope Telephoto with Rectangular Aperture */}
        <group position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.13, 0.13, 0.038, 28]} />
            <meshPhysicalMaterial color="#26302c" metalness={0.96} roughness={0.16} />
          </mesh>
          <mesh position={[0, -0.016, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.01, 24]} />
            <meshPhysicalMaterial color="#080d0a" metalness={0.9} roughness={0.08} />
          </mesh>
          <mesh position={[0, -0.021, 0]}>
            <boxGeometry args={[0.075, 0.004, 0.058]} />
            <meshBasicMaterial color="#04120c" />
          </mesh>
        </group>

        {/* Right sub-column: Laser AF + LED Flash + 10MP 3x Telephoto */}
        <group position={[0.26, 0.88, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.058, 0.058, 0.025, 20]} />
            <meshPhysicalMaterial color="#1f2824" metalness={0.94} roughness={0.18} />
          </mesh>
          <mesh position={[0, -0.012, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.006, 16]} />
            <meshBasicMaterial color="#030604" />
          </mesh>
        </group>

        {/* Dual-Tone LED Flash with Fresnel Pattern */}
        <group position={[0.26, 0.68, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.045, 0.045, 0.02, 16]} />
            <meshPhysicalMaterial color="#2c3631" metalness={0.92} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.009, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.006, 16]} />
            <meshBasicMaterial color="#ffe8aa" />
          </mesh>
        </group>

        {/* 10MP 3x Optical Telephoto Lens */}
        <group position={[0.26, 0.44, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.095, 0.095, 0.03, 24]} />
            <meshPhysicalMaterial color="#26302c" metalness={0.96} roughness={0.16} />
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
