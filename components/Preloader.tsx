'use client';

import { usePreloader } from '@/contexts/PreloaderContext';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';

declare global {
  interface Window {
    triggerExitTransition: () => Promise<void>;
  }
}

const Preloader = () => {
  const pathname = usePathname();
  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { setIsLoaded, setIsExiting } = usePreloader();

  const topBox = useRef<HTMLDivElement>(null);
  const bottomBox = useRef<HTMLDivElement>(null);

  const ease = 'expo.inOut';
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const completeSequence = useCallback(() => {
    // If we're already locked into a timeline, clear it first
    if (masterTl.current) masterTl.current.kill();

    if (!contentRef.current || !topBox.current || !bottomBox.current || !loaderRef.current) return;

    const tl = gsap.timeline();
    masterTl.current = tl;

    tl.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    })
    .to(
      [topBox.current, bottomBox.current],
      {
        yPercent: (i) => i === 0 ? -100 : 100,
        duration: 0.8,
        ease: ease,
      },
      '-=0.2'
    )
    .call(() => {
      setIsLoaded(true);
      setIsExiting(false);
      gsap.set(loaderRef.current, { display: 'none', pointerEvents: 'none' });
    });
  }, [setIsLoaded, setIsExiting, ease]);

  const revealTransition = useCallback(() => {
    if (masterTl.current) masterTl.current.kill();

    // Reset state for new page
    setIsLoaded(false);
    gsap.set(loaderRef.current, { display: 'flex', pointerEvents: 'all' });
    gsap.set([topBox.current, bottomBox.current], { yPercent: 0 });

    const tl = gsap.timeline();
    masterTl.current = tl;

    tl.fromTo(contentRef.current,
      { opacity: 0, scale: 0.95, y: 0 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
    );

    // Auto-trigger completion after reveal
    // This handles the case where the page is already loaded (common in Next.js navigation)
    tl.add(() => {
      setTimeout(completeSequence, 400);
    }, '+=0.1');

  }, [completeSequence, setIsLoaded]);

  const closeTransition = useCallback(() => {
    return new Promise<void>(resolve => {
      if (masterTl.current) masterTl.current.kill();
      setIsLoaded(false);
      setIsExiting(true);
      gsap.set(loaderRef.current, { display: 'flex', pointerEvents: 'all' });

      const tl = gsap.timeline({ onComplete: () => resolve() });
      masterTl.current = tl;

      tl.fromTo(
        [topBox.current, bottomBox.current],
        { yPercent: (i) => i === 0 ? -100 : 100 },
        { yPercent: 0, duration: 0.5, ease: ease }
      ).fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );
    });
  }, [setIsLoaded, setIsExiting, ease]);

  useEffect(() => {
    window.triggerExitTransition = closeTransition;
  }, [closeTransition]);

  // Handle initial mount and subsequent route changes
  useLayoutEffect(() => {
    revealTransition();

    // Fail-safe: Always hide after 4 seconds regardless of what happened
    const panicTimeout = setTimeout(() => {
       if (loaderRef.current?.style.display === 'flex') {
         completeSequence();
       }
    }, 4000);

    return () => clearTimeout(panicTimeout);
  }, [pathname, revealTransition, completeSequence]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999999] flex items-center justify-center overflow-hidden"
      style={{ display: 'flex' }}
    >
      {/* Background Panels */}
      <div className="absolute inset-0 flex flex-col">
        <div
          ref={topBox}
          className="h-1/2 w-full bg-[#01180f] will-change-transform"
        />
        <div
          ref={bottomBox}
          className="h-1/2 w-full bg-[#01180f] will-change-transform"
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex w-full max-w-md flex-col items-center px-10 text-center"
      >
        <div className="group relative mb-8 h-12 w-48 md:h-44 md:w-64">
          <Image
            src="/images/logo.svg"
            alt="FarmIQ Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
