'use client';

import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import type { Group } from 'three';
import { Mesh } from 'three';
import { CowModel } from './CowModel';

export default function CowFollow() {
  const cowRef = useRef<Group>(null);
  const shineRef = useRef<Mesh>(null);
  const { viewport, mouse } = useThree();

  // Entrance animation and default rotation
  useEffect(() => {
    if (!cowRef.current) return;

    // Start smaller, lower, almost facing the camera
    cowRef.current.scale.set(0.4, 0.4, 0.4);
    cowRef.current.position.set(0, -viewport.height / 2 + 0.3, 0);
    cowRef.current.rotation.x = -0.5;
    cowRef.current.rotation.y = 0;

    // Animate scale & Y position with overshoot
    gsap.to(cowRef.current.scale, {
      x: 0.7,
      y: 0.7,
      z: 0.7,
      duration: 1,
      ease: 'elastic.out(1, 0.5)',
    });
    gsap.to(cowRef.current.position, {
      y: -viewport.height / 2 + 0.75,
      duration: 0.75,
      ease: 'power3.out',
      onComplete: () => {
        // Start hovering loop after entrance
        gsap.to(cowRef.current!.position, {
          y: '-=0.1', // hover down
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      },
    });
  }, [viewport.height]);

  // Mouse follow
  useFrame(() => {
    if (!cowRef.current) return;

    const factor = 0.5;
    const rotX = -mouse.y * factor - 0.75; // small forward tilt
    const rotY = mouse.x * factor; // horizontal follow

    cowRef.current.rotation.x = rotX;
    cowRef.current.rotation.y = rotY;

    cowRef.current.position.x = 0;
    cowRef.current.position.z = 0;

    // Optional: rotate shine slowly for dynamic effect
    if (shineRef.current) shineRef.current.rotation.z += 0.005;
  });

  return (
    <>
      <CowModel ref={cowRef} />

      {/* Shine plane under the cow */}
    </>
  );
}
