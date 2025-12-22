'use client';

import Lenis from '@studio-freight/lenis';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const LenisContext = createContext<Lenis | null>(null);
export const useLenisContext = () => useContext(LenisContext);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reducedMotionRef = useRef(false); // ✅ define reducedMotionRef

  useEffect(() => {
    // check if user prefers reduced motion
    reducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const l = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
    });

    setLenis(l);

    let rafId: number;
    const raf = (time: number) => {
      if (!reducedMotionRef.current) {
        l.raf(time);
      }
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      l.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
