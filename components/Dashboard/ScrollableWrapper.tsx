'use client';

import React, { useRef, useEffect } from 'react';

interface ScrollableWrapperProps {
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
}

export const ScrollableWrapper: React.FC<ScrollableWrapperProps> = ({
  children,
  maxHeight = '90vh',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    el.addEventListener('wheel', handleWheel, { passive: true });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className={`overflow-y-auto overscroll-contain custom-scrollbar ${className}`}
      style={{
        maxHeight,
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollableWrapper;
