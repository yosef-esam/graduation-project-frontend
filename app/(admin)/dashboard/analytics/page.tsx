'use client';

import React from 'react';
import { PageHeader } from '@/components/Dashboard/PageHeader';
import { MdBarChart, MdTimeline, MdTrendingUp, MdInsights } from 'react-icons/md';
import { ActivityChart } from '../_components/ActivityChart';
import { TemperatureChart } from '../_components/TemperatureChart';

export default function AnalyticsPage() {
  return (
    <div className="space-y-10">
      <div className="max-w-[1340px] mx-auto space-y-10">
        <PageHeader 
          title="Predictive Analytics" 
          subtitle="Advanced data visualization and machine learning insights into livestock health trajectories and operational efficiency." 
        />

        {/* First 4 Grid Articles - Fixed Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#023b26] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group transition-all hover:scale-[1.02] flex flex-col items-center text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px]" />
                <MdTimeline className="text-emerald-400 mb-6" size={32} />
                <h3 className="text-5xl font-black tracking-tighter leading-none">12.4%</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/60 mt-2">Growth Forecast</p>
            </div>
            <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 shadow-xl relative overflow-hidden group transition-all hover:scale-[1.02] hover:bg-white/60 flex flex-col items-center text-center">
                <MdTrendingUp className="text-emerald-600 mb-6" size={32} />
                <h3 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">+8%</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#023b26]/40 mt-2">Efficiency Delta</p>
            </div>
            <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 shadow-xl relative overflow-hidden group transition-all hover:scale-[1.02] hover:bg-white/60 flex flex-col items-center text-center">
                <MdInsights className="text-blue-600 mb-6" size={32} />
                <h3 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">A+</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#023b26]/40 mt-2">Health Index</p>
            </div>
            <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 shadow-xl relative overflow-hidden group transition-all hover:scale-[1.02] hover:bg-white/60 flex flex-col items-center text-center">
                <MdBarChart className="text-purple-600 mb-6" size={32} />
                <h3 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">94.2</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#023b26]/40 mt-2">Resource Yield</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <TemperatureChart />
           <ActivityChart />
        </div>

        <div className="rounded-[3.5rem] border border-white bg-white/40 p-12 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] -z-10" />
          
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-1">Intelligence Report</h2>
              <p className="font-bold text-gray-400 text-sm">Automated insights from the machine learning inference module.</p>
            </div>
            <div className="flex -space-x-4">
                {[1,2,3].map(i => (
                    <div key={i} className="h-14 w-14 rounded-full border-4 border-white bg-[#023b26] flex items-center justify-center text-[10px] font-black text-white uppercase tracking-tighter shadow-xl transition-transform hover:translate-y-[-4px] cursor-pointer">
                        AI
                    </div>
                ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-10 rounded-[2.5rem] bg-[#023b26]/5 border border-[#023b26]/10 relative overflow-hidden group transition-all hover:bg-[#023b26]/10">
                <div className="absolute right-0 top-0 h-full w-4 bg-emerald-500" />
                <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    Optimal Pasture Rotation Suggested
                </h4>
                <p className="text-sm font-bold text-gray-500 max-w-3xl leading-relaxed">
                    Based on current grazing telemetry and meteorological forecasts, node sector 4-9 requires priority rotation within the next 48 temporal units. This shift is predicted to improve biomass yield by 7.2%.
                </p>
                <div className="mt-8 flex gap-4">
                    <button className="h-14 px-10 rounded-2xl bg-[#023b26] text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-emerald-800 transition-all shadow-xl active:scale-95">Accept Protocol</button>
                    <button className="h-14 px-10 rounded-2xl bg-white text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 border border-gray-100 transition-all shadow-sm hover:border-gray-200">Postpone Sync</button>
                </div>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-blue-500/5 border border-blue-500/10 relative overflow-hidden group transition-all hover:bg-blue-500/10">
                <div className="absolute right-0 top-0 h-full w-4 bg-blue-500" />
                <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-4">Resource Scaling Opportunity</h4>
                <p className="text-sm font-bold text-gray-500 max-w-3xl leading-relaxed">
                    Synchronization of herds 12A and 14B would optimize resource distribution and reduce gateway node overhead by 14.5% over the next cycle. Operational parameters remain within safety thresholds.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
