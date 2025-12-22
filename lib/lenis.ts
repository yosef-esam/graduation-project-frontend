// lib/useLenis.ts
'use client';
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

export default function useLenis() {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    lenis.current = new Lenis({
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time: number) {
      lenis.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.current = null;
    };
  }, []);

  return lenis;
}
