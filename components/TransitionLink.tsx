"use client";
import React, { forwardRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: React.ReactNode;
  className?: string;
}

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, children, className, onClick, ...props }, ref) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Execute original onClick if it exists
      if (onClick) onClick(e);

      // Prevent default and check if target is same as current
      e.preventDefault();
      if (pathname === href) return;

      // 1. Trigger the "Close" animation from global window object
      if (typeof window !== "undefined" && window.triggerExitTransition) {
        try {
          await window.triggerExitTransition();
        } catch (error) {
          console.error("Transition failed:", error);
        }
      }

      // 2. Navigate using Next.js router
      router.push(href);
    };

    return (
      <a
        {...props}
        ref={ref}
        href={href}
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
    );
  }
);

TransitionLink.displayName = 'TransitionLink';
