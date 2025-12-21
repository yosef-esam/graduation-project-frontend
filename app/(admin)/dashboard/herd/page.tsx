import { getAnimals } from '@/app/actions/animalActions';
import React from 'react';
import { ViewAll } from '../_components/ViewAll';

async function Herd() {
  const cowsResponse = await getAnimals();

  const cows = cowsResponse.data;

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex items-center gap-4 rounded-xl p-3">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by ID, Tag, or Breed..."
            className="w-full rounded-lg border-2 px-4 py-2 placeholder-gray-400 outline-none"
          />
        </div>

        {/* Status Filters (Checkboxes) */}
        <div className="flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" className="accent-black" />
            <span>All Cows</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-green-600">
            <input type="checkbox" className="accent-green-600" />
            <span>Healthy</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-yellow-500">
            <input type="checkbox" className="accent-yellow-500" />
            <span>Unhealthy</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-red-500">
            <input type="checkbox" className="accent-red-500" />
            <span>Critical</span>
          </label>
        </div>
      </div>

      {/* Cows List */}
      <ViewAll cows={cows} />
    </div>
  );
}

export default Herd;
