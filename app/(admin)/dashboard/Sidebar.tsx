import { LayoutGrid, List, Activity, Settings, LogOut, Cloud } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-[220px] bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-orange-300 flex items-center justify-center">
            <span className="text-xl">🐄</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Farm Manager</h2>
            <p className="text-xs text-gray-500">Welcome back</p>
          </div>
        </div>

        <nav className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-green-100 text-green-600">
            <LayoutGrid className="w-5 h-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
            <List className="w-5 h-5" />
            <span className="text-sm font-medium">Herd List</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
            <Activity className="w-5 h-5" />
            <span className="text-sm font-medium">Health Logs</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-gray-500 uppercase">Weather</span>
          </div>
          <p className="text-sm text-gray-700 mb-1">Partly Cloudy</p>
          <p className="text-2xl font-semibold">22°C</p>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}
