'use client';

import Lenis from '@studio-freight/lenis';
import React, { createContext, useContext, useEffect, useState } from 'react';

const LenisContext = createContext<Lenis | null>(null);
export const useLenisContext = () => useContext(LenisContext);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const l = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
    });

    setLenis(l);

    let rafId: number;
    const raf = (time: number) => {
      l.raf(time);
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
