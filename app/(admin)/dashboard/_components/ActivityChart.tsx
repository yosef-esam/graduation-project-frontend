'use client';

import { PremiumChart } from '@/components/Dashboard/PremiumChart';

const data = [
  { name: 'Mon', value: 65, max: 85 },
  { name: 'Tue', value: 70, max: 95 },
  { name: 'Wed', value: 85, max: 100 },
  { name: 'Thu', value: 75, max: 90 },
  { name: 'Fri', value: 90, max: 95 },
  { name: 'Sat', value: 88, max: 100 },
  { name: 'Sun', value: 80, max: 95 },
];

export function ActivityChart() {
  return (
    <PremiumChart 
      title="Activity Trends" 
      subtitle="Herd Movement & Daily activity patterns"
      type="bar" 
      data={data} 
      dataKey="value" 
      color="#3B82F6"
      height={250}
    />
  );
}
