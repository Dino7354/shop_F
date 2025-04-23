import React from 'react';
import * as THREE from 'three';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';
import { useSnapshot } from 'valtio';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  if (logoTexture) logoTexture.anisotropy = 4;
  if (fullTexture) fullTexture.anisotropy = 4;


  useFrame((state, delta) => {
    if (materials['Material.001']?.color) {
      easing.dampC(
        materials['Material.001'].color,
        new THREE.Color(snap.color),
        0.25,
        delta
      );
    }
  });

  const StateString = JSON.stringify(snap);

  return (
    <group key={StateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials['Material.001']}
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