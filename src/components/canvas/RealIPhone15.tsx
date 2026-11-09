import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

export interface RealIPhoneProps {
  screenTexture: THREE.CanvasTexture;
  accentColor?: string;
  flipped?: boolean;
}

export const RealIPhone15: React.FC<RealIPhoneProps> = ({
  screenTexture,
  accentColor = '#ff3322',
  flipped = false,
}) => {
  const { scene } = useGLTF('/iphone15.glb');
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Clone materials and bind screenTexture to the OLED display mesh
  useMemo(() => {
    clonedScene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        // In this gltf model:
        // 'xXDHkMplTIDAXLN' is the front OLED display surface
        if (mesh.name === 'xXDHkMplTIDAXLN' || mesh.name.includes('Display') || mesh.name.includes('Screen')) {
          mesh.material = new THREE.MeshBasicMaterial({
            map: screenTexture,
            toneMapped: false,
          });
        }
      }
    });
  }, [clonedScene, screenTexture]);

  return (
    <group
      scale={0.21}
      rotation={[flipped ? Math.PI : 0, 0, 0]}
      dispose={null}
    >
      <primitive object={clonedScene} />
      {/* Front active screen plane overlay for 100% pixel fidelity */}
      <mesh position={[0, 0.005, -0.062]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.74, 1.6]} />
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>
    </group>
  );
};

useGLTF.preload('/iphone15.glb');

