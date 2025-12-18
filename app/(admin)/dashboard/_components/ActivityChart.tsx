'use client';

import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { day: 'Mon', value: 65, max: 85 },
  { day: 'Tue', value: 70, max: 95 },
  { day: 'Wed', value: 85, max: 100 },
  { day: 'Thu', value: 75, max: 90 },
  { day: 'Fri', value: 90, max: 95 },
  { day: 'Sat', value: 88, max: 100 },
  { day: 'Sun', value: 80, max: 95 },
];

export function ActivityChart() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="mb-1 font-semibold">Activity Trends</h3>
          <p className="text-xs text-gray-500">Herd Movement Analysis</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">Active</p>
          <p className="text-xs text-green-600">Status</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <Bar dataKey="max" fill="#E5E7EB" radius={[8, 8, 8, 8]} />
          <Bar dataKey="value" fill="#10B981" radius={[8, 8, 8, 8]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
