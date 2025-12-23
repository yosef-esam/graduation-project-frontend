import { Thermometer, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function ViewAll({ cows, limit = -1 }) {
  return (
    <div className="space-y-4">
      {cows.slice(0, limit).map(cow => {
        const isFever = cow.healthStatus === 'Fever';
        const isHealthy = cow.healthStatus === 'Healthy';

        const statusColor = isFever
          ? 'border-red-500 bg-red-50 text-red-600'
          : 'border-green-500 bg-green-50 text-green-600';

        const Icon = isFever ? Thermometer : CheckCircle2;

        return (
          <div
            key={cow.id}
            className={`flex items-center gap-4 rounded-lg border-l-4 p-4 ${statusColor}`}
          >
            {/* Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
              <Icon className="h-6 w-6" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h4 className="font-medium">{cow.name}</h4>
              <p className="text-sm text-gray-500">{cow.healthStatus}</p>

              <div className="mt-1 flex gap-4 text-sm">
                <span>🌡 {cow.temperature ?? '--'} °C</span>
                <span>
                  👣 {cow.distance ? cow.distance.toFixed(2) : '--'} km
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <span className="rounded-full border bg-white px-3 py-1 text-xs font-medium">
                {cow.healthStatus}
              </span>
              <button className="flex items-center gap-1 text-sm">
                View More <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
