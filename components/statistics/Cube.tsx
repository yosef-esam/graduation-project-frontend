'use client';

import { useGSAP } from '@gsap/react';
import { Float, useGLTF, useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import type { Mesh } from 'three';
import type { GLTF } from 'three-stdlib';

interface CubeProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

const Cube: React.FC<CubeProps> = ({ ...props }) => {
  const { nodes } = useGLTF('models/cube.glb') as unknown as GLTF & {
    nodes: { Cube: Mesh };
  };

  const texture = useTexture('/textures/cube.webp'); // Use public folder directly

  const cubeRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    if (!cubeRef.current) return;

    gsap
      .timeline({ repeat: -1, repeatDelay: 0.5 })
      .to(cubeRef.current.rotation, {
        y: hovered ? '+=2' : Math.PI * 2,
        x: hovered ? '+=2' : -Math.PI * 2,
        duration: 2.5,
        stagger: { each: 0.15 },
      });
  }, [hovered]);

  return (
    <Float floatIntensity={2}>
      <group
        position={[9, -4, 0]}
        rotation={[2.6, 0.8, -1.8]}
        scale={0.74}
        dispose={null}
        {...props}
      >
        <mesh
          ref={cubeRef}
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <meshMatcapMaterial matcap={texture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
};

// Preload only on client side to avoid SSR issues
if (typeof window !== 'undefined') {
  useGLTF.preload('models/cube.glb');
}

export default Cube;
