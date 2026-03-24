'use client';

import { PremiumChart } from '@/components/Dashboard/PremiumChart';

const data = [
  { name: '12am', value: 38.2 },
  { name: '3am', value: 38.8 },
  { name: '6am', value: 38.4 },
  { name: '9am', value: 38.9 },
  { name: '12pm', value: 38.3 },
  { name: '3pm', value: 38.6 },
  { name: '6pm', value: 39.2 },
  { name: '9pm', value: 38.5 },
];

export function TemperatureChart() {
  return (
    <PremiumChart 
      title="Temperature Trends" 
      subtitle="Last 24 Hours physiological tracking"
      type="area" 
      data={data} 
      dataKey="value" 
      color="#10B981"
      height={250}
    />
  );
}
