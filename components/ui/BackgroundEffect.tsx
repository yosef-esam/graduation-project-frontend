'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundEffect() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-emerald-50">
      {/* Mesh Gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-emerald-100/40 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[20%] -right-[5%] w-[40%] h-[60%] bg-blue-50/50 rounded-full blur-[120px]"
      />

      {/* Noise Texture for Grain/Depth */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Subtle SVG Mesh Pattern with Gradient Stroke */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
          <pattern id="mesh" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="url(#grid-grad)" strokeWidth="1"/>
            <circle cx="0" cy="0" r="1.5" fill="#10b981" fillOpacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mesh)" />
      </svg>

      <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-white/80" />
    </div>
  );
}
