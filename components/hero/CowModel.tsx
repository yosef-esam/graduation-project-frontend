'use client';

import { useGLTF } from '@react-three/drei';
import type { JSX } from 'react';

type GroupProps = JSX.IntrinsicElements['group'];

type GLTFResult = {
  nodes: {
    Object_4: { geometry: JSX.IntrinsicElements['mesh']['geometry'] };
    Object_5: { geometry: JSX.IntrinsicElements['mesh']['geometry'] };
    Object_7: { geometry: JSX.IntrinsicElements['mesh']['geometry'] };
    Object_8: { geometry: JSX.IntrinsicElements['mesh']['geometry'] };
    Object_10: { geometry: JSX.IntrinsicElements['mesh']['geometry'] };
    Object_11: { geometry: JSX.IntrinsicElements['mesh']['geometry'] };
    Object_13: { geometry: JSX.IntrinsicElements['mesh']['geometry'] };
    Object_14: { geometry: JSX.IntrinsicElements['mesh']['geometry'] };
    Object_16: { geometry: JSX.IntrinsicElements['mesh']['geometry'] };
    Object_17: { geometry: JSX.IntrinsicElements['mesh']['geometry'] };
    Object_19: { geometry: JSX.IntrinsicElements['mesh']['geometry'] };
    Object_20: { geometry: JSX.IntrinsicElements['mesh']['geometry'] };
  };
  materials: Record<string, JSX.IntrinsicElements['mesh']['material']>;
};

export function CowModel(props: GroupProps) {
 const { nodes, materials } = useGLTF(
   '/models/cow_havest_moon.glb'
 ) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group scale={[1.027, 0.939, 0.897]}>
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.Cow_havestmoon_back_nature_mat}
        />
        <mesh
          geometry={nodes.Object_5.geometry}
          material={materials.Line_cow}
        />
      </group>

      <group
        position={[0, -1.384, 0.158]}
        rotation={[-0.578, 0, 0]}
        scale={0.312}
      >
        <mesh geometry={nodes.Object_7.geometry} material={materials.chuong} />
        <mesh
          geometry={nodes.Object_8.geometry}
          material={materials.line_vong_co}
        />
      </group>

      <group
        position={[0, -1.357, 0.183]}
        rotation={[-0.578, 0, 0]}
        scale={0.312}
      >
        <mesh
          geometry={nodes.Object_10.geometry}
          material={materials.vong_co}
        />
        <mesh
          geometry={nodes.Object_11.geometry}
          material={materials.line_vong_co}
        />
      </group>

      <group
        position={[0, -1.384, 0.158]}
        rotation={[-0.578, 0, 0]}
        scale={0.312}
      >
        <mesh
          geometry={nodes.Object_13.geometry}
          material={materials.qua_lac}
        />
        <mesh
          geometry={nodes.Object_14.geometry}
          material={materials.line_vong_co}
        />
      </group>

      <group
        position={[0.026, 0.078, 0.393]}
        rotation={[-0.153, -0.32, 0]}
        scale={[0.02, 0.031, 0.008]}
      >
        <mesh
          geometry={nodes.Object_16.geometry}
          material={materials.bong_mat}
        />
        <mesh geometry={nodes.Object_17.geometry} material={materials.eyes} />
      </group>

      <group position={[0.618, 1.512, 0.408]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Object_19.geometry}
          material={materials.material}
        />
        <mesh geometry={nodes.Object_20.geometry} material={materials.eyes} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/cow_havest_moon.glb');
