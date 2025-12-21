'use client';
import { Calendar, Bell, Plus } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { TemperatureChart } from './TemperatureChart';
import { ActivityChart } from './ActivityChart';
import { AlertsList } from './AlertList';

export function DashboardContent() {
  return (
    <div className="flex-1 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Farm Overview</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Today, Oct 24 • 12:40 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-white hover:bg-green-600">
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add Cow</span>
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-50">
              <Bell className="h-5 w-5" />
              <span className="font-medium">View Alerts</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-3 gap-6">
          <StatsCard
            icon="🐄"
            iconBg="bg-blue-100"
            label="Total Cows"
            value="1,240"
            badge="+12%"
            badgeType="success"
          />
          <StatsCard
            icon="⚠️"
            iconBg="bg-red-100"
            label="Cows with Alerts"
            value="3"
            badge="+1 new"
            badgeType="danger"
          />
          <StatsCard
            icon="🌡️"
            iconBg="bg-orange-100"
            label="Avg Temperature"
            value="38.6°C"
            badge="Stable"
            badgeType="success"
          />
        </div>

        {/* Charts */}
        <div className="mb-8 grid grid-cols-2 gap-6">
          <TemperatureChart />
          <ActivityChart />
        </div>

        {/* Latest Alerts */}
        <AlertsList />
      </div>
    </div>
  );
}
