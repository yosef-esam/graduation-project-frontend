import { Calendar, Bell, Plus } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { TemperatureChart } from './TemperatureChart';
import { ActivityChart } from './ActivityChart';
import { ViewAll } from './ViewAll';
import { getAnimals, getAnimalsCount } from '@/app/actions/animalActions';
import Link from 'next/link';

export async function DashboardContent() {
  const counts = await getAnimalsCount();
  const cows = await getAnimals();
  console.log(cows);

  return (
    <div className="flex-1 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-3 gap-6">
          <StatsCard
            icon="🐄"
            iconBg="bg-blue-100"
            label="Total Cows"
            value={counts.totalCount}
            badgeType="success"
          />
          <StatsCard
            icon="⚠️"
            iconBg="bg-red-100"
            label="Cows with Alerts"
            value={counts.feverCount + counts.lowActivityCount}
            badgeType="danger"
          />
          <StatsCard
            icon="🌡️"
            iconBg="bg-orange-100"
            label="Avg Temperature"
            value="38.6°C"
            badgeType="success"
          />
        </div>

        {/* Charts */}
        <div className="mb-8 grid grid-cols-2 gap-6">
          <TemperatureChart />
          <ActivityChart />
        </div>

        {/* Latest Alerts */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Cows</h3>
            <Link
              href={'/dashboard/herd'}
              className="text-sm font-medium text-green-600"
            >
              View All
            </Link>
          </div>
          <ViewAll cows={cows.data} limit={3} />
        </div>
      </div>
    </div>
  );
}
