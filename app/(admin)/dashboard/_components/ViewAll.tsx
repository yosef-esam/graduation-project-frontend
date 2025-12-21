import { Thermometer, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

export  function ViewAll({ cows ,limit =-1}) {
  return (
   

      <div className="space-y-4">
        {cows.slice(0, limit).map((cow) => {
          const isFever = cow.healthStatus === "Fever";
          const isHealthy = cow.healthStatus === "Healthy";

          const statusColor = isFever
            ? "border-red-500 bg-red-50 text-red-600"
            : "border-green-500 bg-green-50 text-green-600";

          const Icon = isFever ? Thermometer : CheckCircle2;

          return (
            <div
              key={cow.id}
              className={`flex items-center gap-4 p-4 rounded-lg border-l-4 ${statusColor}`}
            >
              
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h4 className="font-medium">{cow.name}</h4>
                <p className="text-sm text-gray-500">
                  {cow.healthStatus}
                </p>

                <div className="flex gap-4 mt-1 text-sm">
                  <span>
                    🌡 {cow.temperature ?? "--"} °C
                  </span>
                  <span>
                    👣 {cow.distance ? cow.distance.toFixed(2) : "--"} km
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white border">
                  {cow.healthStatus}
                </span>
                <button className="flex items-center gap-1 text-sm">
                  View More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
  );
}
