'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'framer-motion';

interface PremiumChartProps {
  title?: string;
  subtitle?: string;
  type: 'area' | 'bar' | 'pie';
  data: any[];
  dataKey: string;
  nameKey?: string;
  color?: string;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  showLabel?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-white bg-white/60 p-4 shadow-xl backdrop-blur-md">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-sm font-black text-gray-900">{payload[0].value}</p>
        </div>
      </div>
    );
  }
  return null;
};

export const PremiumChart = ({
  title,
  subtitle,
  type,
  data,
  dataKey,
  nameKey = 'name',
  color = '#10B981',
  height = 300,
  innerRadius = 0,
  outerRadius = 100,
  paddingAngle = 0,
  showLabel = false
}: PremiumChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-[3rem] h-full transition-all group ${title ? 'border border-gray-100 bg-white/40 p-8 md:p-10 backdrop-blur-xl shadow-sm hover:shadow-2xl hover:bg-[#f5f5f5] hover:scale-[1.01]' : ''}`}
    >
      {title && (
        <div className="mb-8">
          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-1">{title}</h3>
          {subtitle && <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/60 ">{subtitle}</p>}
        </div>
      )}

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey={nameKey}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 900, textAnchor: 'middle' }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 900 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorValue)"
                animationDuration={2000}
              />
            </AreaChart>
          ) : type === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey={nameKey}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 900 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 900 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey={dataKey}
                fill={color}
                radius={[8, 8, 0, 0]}
                barSize={32}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={color}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={paddingAngle}
                dataKey={dataKey}
                animationDuration={1500}
                label={showLabel}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || color}
                    opacity={entry.color ? 1 : (1 - index * 0.2)}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
