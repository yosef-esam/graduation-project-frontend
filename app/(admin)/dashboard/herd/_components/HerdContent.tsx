'use client';

import React, { useState, useMemo } from 'react';

import { 
  MdSearch, 
  MdPets, 
} from "react-icons/md";
import { ViewAll } from "../../_components/ViewAll";
import { PageHeader } from '@/components/Dashboard/PageHeader';

interface Cow {
  id: string | number;
  name?: string;
  breed?: string;
  status?: string;
  [key: string]: unknown;
}

interface HerdContentProps {
  initialCows: Cow[];
}

export default function HerdContent({ initialCows }: HerdContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredCows = useMemo(() => {
    return initialCows.filter(cow => {
      const nameMatch = (cow.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (cow.id || '').toString().toLowerCase().includes(searchQuery.toLowerCase());
      const statusMatch = statusFilter === 'All' || cow.status === statusFilter;
      return nameMatch && statusMatch;
    });
  }, [initialCows, searchQuery, statusFilter]);

  const stats = {
    total: initialCows.length,
    healthy: initialCows.filter(c => c.status === 'Healthy').length,
    warning: initialCows.filter(c => c.status === 'Warning' || c.status === 'Unhealthy').length,
  };

  return (
    <div className="space-y-10">
      <PageHeader 
        title="Active Inventory" 
        subtitle="Biometric overview of all livestock within the current provisioning zone. Synchronized real-time telemetry from IoT gateways." 
      />

      {/* Stats Quickbar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white shadow-xl transition-all hover:bg-white/60 group">
            <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800/40 mb-3 group-hover:text-emerald-600 transition-colors">Total Headcount</span>
            <span className="text-5xl font-black tracking-tighter text-gray-900 leading-none">{stats.total}</span>
          </div>
          <div className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white shadow-xl transition-all hover:bg-white/60 group">
            <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800/40 mb-3 group-hover:text-emerald-500 transition-colors">Stable Vitals</span>
            <span className="text-5xl font-black tracking-tighter text-gray-900 leading-none">{stats.healthy}</span>
          </div>
          <div className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white shadow-xl transition-all hover:bg-white/60 group">
            <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800/40 mb-3 group-hover:text-rose-500 transition-colors">Warning Flag</span>
            <span className="text-5xl font-black tracking-tighter text-gray-900 leading-none">{stats.warning}</span>
          </div>
          <div className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white shadow-xl transition-all hover:bg-white/60 group">
            <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800/40 mb-3 group-hover:text-blue-500 transition-colors">Sync Rate</span>
            <span className="text-5xl font-black tracking-tighter text-gray-900 leading-none">98.2%</span>
          </div>
      </div>

      {/* Advanced Control Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/60 p-6 rounded-[2.5rem] border border-white backdrop-blur-3xl shadow-xl">
        <div className="relative w-full md:w-md">
          <MdSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={28} />
          <input
            type="text"
            placeholder="Query inventory by Tag ID, Name, or Breed..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-16 w-full rounded-2xl border border-gray-100 bg-white/50 pl-16 pr-6 font-bold text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            {['All', 'Healthy', 'Warning', 'Critical'].map(status => (
                <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`h-14 px-8 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-sm ${statusFilter === status ? 'bg-[#023b26] text-white shadow-emerald-900/20' : 'bg-white text-gray-400 border border-gray-100 hover:bg-gray-50'}`}
                >
                    {status}
                </button>
            ))}
        </div>
      </div>

      {/* Matrix Display */}
      <div className="rounded-[3.5rem] border border-white bg-white/40 p-12 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] -z-10" />
        
        <div className="mb-12">
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase mb-2">Livestock Records</h3>
            <p className="font-bold text-gray-400 text-sm italic">Synchronized biometric telemetry from IoT gateways.</p>
        </div>

        <ViewAll cows={filteredCows} />
        
        {filteredCows.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 grayscale opacity-40">
                <MdPets size={100} className="mb-6 text-gray-200" />
                <p className="text-3xl font-black text-gray-400 uppercase tracking-widest">Zero Entity Matches</p>
                <p className="mt-2 font-bold text-gray-400">Matrix query returned no matching livestock data.</p>
            </div>
        )}
      </div>
    </div>
  );
}
