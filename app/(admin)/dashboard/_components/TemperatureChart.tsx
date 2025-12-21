'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const data = [
  { time: '12am', temp: 38.2 },
  { time: '3am', temp: 38.8 },
  { time: '6am', temp: 38.4 },
  { time: '9am', temp: 38.9 },
  { time: '12pm', temp: 38.3 },
  { time: '3pm', temp: 38.6 },
  { time: '6pm', temp: 39.2 },
  { time: '9pm', temp: 38.5 },
];

export function TemperatureChart() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="mb-1 font-semibold">Temperature Trends</h3>
          <p className="text-xs text-gray-500">Last 24 Hours</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">38.6°C</p>
          <p className="text-xs text-green-600">Avg</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              background: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#10B981"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
