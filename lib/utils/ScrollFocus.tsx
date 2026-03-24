"use client";
import React, { useRef, useEffect } from "react";

/**
 * ScrollFocus Utility
 * Ensures that when hovering over the container, the window's scroll is locked 
 * and only the container's wheel events are processed, focusing all scrolling on it.
 */
export default function ScrollFocus({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (container) {
        // Just let the browser handle it, but we can prevent scaling or other side effects if needed
        // The overscroll-contain CSS property on the container handles the parent scroll locking.
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: true });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  const handleMouseEnter = () => {
    if (containerRef.current) {
        containerRef.current.classList.remove('overflow-hidden');
        containerRef.current.classList.add('overflow-y-auto');
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
         containerRef.current.classList.remove('overflow-y-auto');
         containerRef.current.classList.add('overflow-hidden');
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${className} overscroll-contain scrollbar-hide transition-all duration-300`}
    >
      {children}
    </div>
  );
}
