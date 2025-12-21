'use client';
import { Bell, Calendar, Plus } from 'lucide-react';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
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

      {/* Right side: page content */}
      <section>{children}</section>
    </main>
  );
}
