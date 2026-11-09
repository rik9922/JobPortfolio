import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

export interface RealMacBookProps {
  screenTexture: THREE.CanvasTexture;
  isHero: boolean;
}

/**
 * Real photoscanned-grade MacBook GLB (same asset as the Capabilities section).
 * Screen mesh `Object_123` receives the live canvas texture.
 */
export const RealMacBookDevice: React.FC<RealMacBookProps> = ({ screenTexture }) => {
  const gltf = useGLTF('/macbook.glb', '/draco/');
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useMemo(() => {
    scene.traverse((obj) => {
      const m = obj as THREE.Mesh;
      if (m.isMesh && m.name === 'Object_123') {
        m.material = new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false });
      }
    });
  }, [scene, screenTexture]);

  return (
    <group scale={0.118} position={[0, -0.85, 0]}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/macbook.glb', '/draco/');

