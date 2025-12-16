'use client';

import { useEffect, useRef, ReactNode } from 'react';

type ScrollFocusProps = {
  children: ReactNode;
  className?: string;
};

const ScrollFocus = ({ children, className = '' }: ScrollFocusProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const delta = e.deltaY;

      const canScrollUp = el.scrollTop > 0;
      const canScrollDown = el.scrollTop + el.clientHeight < el.scrollHeight;

      if ((delta < 0 && canScrollUp) || (delta > 0 && canScrollDown)) {
        e.preventDefault(); // block page scroll
        el.scrollTop += delta;
      }
      // else → allow page scroll
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`overflow-y-auto overscroll-contain ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollFocus;
