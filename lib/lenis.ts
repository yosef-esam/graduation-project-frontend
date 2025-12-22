// lib/lenis.ts
import Lenis from '@studio-freight/lenis';

export const lenis = new Lenis({
  smoothWheel: true,
  smoothTouch: false,
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
