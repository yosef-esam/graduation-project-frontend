'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      // Format: Today, Oct 24 • 12:40 PM
      const formatted = `Today, ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
      setCurrentTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-[#023b26] to-[#012217] p-10 text-white shadow-2xl border border-white/5"
    >
      <div className="absolute right-0 top-0 h-full w-1/2 bg-linear-to-l from-emerald-500/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="mb-4 flex items-center gap-3">
             <div className="h-1.5 w-12 rounded-full bg-emerald-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 opacity-80 decoration-none">System Active</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-none mb-4">
            {title}
          </h1>
          <p className="max-w-xl text-emerald-100/60 font-bold text-sm leading-relaxed tracking-tight">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
          <span className="text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.2em]">Temporal Sync</span>
          <div className="text-xl font-black tracking-tight text-white/90 font-mono">
            {currentTime.toUpperCase()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
