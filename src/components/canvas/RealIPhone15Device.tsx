import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

export interface RealIPhone15Props {
  screenTexture: THREE.CanvasTexture;
  isHero: boolean;
}

export const RealIPhone15Device: React.FC<RealIPhone15Props> = ({ screenTexture, isHero }) => {
  const gltf = useGLTF('/iphone15.glb');
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // Replace screen material directly on the OLED screen mesh
  useMemo(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh;
        const mat = m.material as THREE.Material | undefined;
        if (m.name === 'xXDHkMplTIDAXLN' || mat?.name === 'pIJKfZsazmcpEiU') {
          m.material = new THREE.MeshBasicMaterial({
            map: screenTexture,
            toneMapped: false,
          });
        }
      }
    });
  }, [scene, screenTexture]);

  return (
    <group scale={16.61} rotation={[0, Math.PI, 0]} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/iphone15.glb');
