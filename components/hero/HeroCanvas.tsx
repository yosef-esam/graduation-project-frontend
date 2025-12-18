'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';
import CowFollow from './CowFollow';
import CanvasLoader from '@/app/utils/CanvasLoader';

export default function HeroCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 4, 5], fov: 50 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        intensity={0.8}
        position={[5, 5, 5]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Suspense for loading 3D assets */}
      <Suspense fallback={<CanvasLoader/>}>
        <Environment preset="sunset" />
        <CowFollow />
      </Suspense>
    </Canvas>
  );
}
