import React, { useRef } from 'react';
import * as THREE from 'three';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';
import { useSnapshot } from 'valtio';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const group = useRef(); // ref for smooth rotation
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const material = Object.values(materials)[0]; // Use the first material
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  if (logoTexture) logoTexture.anisotropy = 4;
  if (fullTexture) fullTexture.anisotropy = 4;

  useFrame((state, delta) => {
    if (material?.color) {
      easing.dampC(
        material.color,
        new THREE.Color(snap.color),
        0.25,
        delta
      );
    }

    // Smooth idle rotation (optional - looks alive)
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() / 2) / 8;
    }
  });

  const StateString = JSON.stringify(snap);

  return (
    <group ref={group} key={StateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={material}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && fullTexture?.isTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && logoTexture?.isTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
