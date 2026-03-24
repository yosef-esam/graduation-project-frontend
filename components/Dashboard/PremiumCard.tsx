'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PremiumCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  description?: string;
  color?: 'green' | 'blue' | 'purple' | 'orange' | 'red';
  className?: string;
  style?: React.CSSProperties;
}

export const PremiumCard = ({
  title,
  value,
  icon,
  trend,
  description,
  color = 'green',
  className = '',
  style = {}
}: PremiumCardProps) => {
  const colorMaps = {
    green: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/20 text-emerald-600',
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/20 text-blue-600',
    purple: 'from-purple-500/20 to-indigo-500/20 border-purple-500/20 text-purple-600',
    orange: 'from-orange-500/20 to-amber-500/20 border-orange-500/20 text-orange-600',
    red: 'from-red-500/20 to-rose-500/20 border-red-500/20 text-red-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      style={style}
      className={`relative overflow-hidden rounded-3xl border bg-white/40 p-6 backdrop-blur-xl transition-all shadow-sm hover:shadow-xl ${colorMaps[color].split(' ').slice(2).join(' ')} ${className}`}
    >
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-linear-to-br opacity-10 blur-2xl ${colorMaps[color].split(' ').slice(0, 2).join(' ')}`} />
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-tight">{title}</p>
          <h3 className="mt-2 text-3xl font-black text-gray-900 tracking-tighter">
            {value}
          </h3>
          
          {trend && (
            <div className={`mt-2 flex items-center gap-1 text-xs font-bold ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              <span className={`flex h-4 w-4 items-center justify-center rounded-full ${trend.isPositive ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                {trend.isPositive ? '↑' : '↓'}
              </span>
              {trend.value}
              <span className="font-medium text-gray-400">vs last month</span>
            </div>
          )}
        </div>
        
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${colorMaps[color].split(' ').slice(0, 2).join(' ')} ${colorMaps[color].split(' ').pop()}`}>
          {icon}
        </div>
      </div>
      
      {description && (
        <p className="mt-4 text-xs text-gray-400 font-medium">{description}</p>
      )}
    </motion.div>
  );
};
