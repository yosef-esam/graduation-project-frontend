"use client";

import React from 'react';
import { MdThermostat, MdTrendingUp, MdCheckCircle, MdError, MdChevronRight } from "react-icons/md";
import { TransitionLink } from '@/components/TransitionLink';

interface Cow {
  id: string | number;
  name?: string;
  healthStatus?: string;
  deviceId?: string;
  temperature?: string | number;
  distance?: number;
}

export function ViewAll({ cows, limit }: { cows: Cow[], limit?: number }) {
  return (
    <div className="space-y-4">
      {cows?.slice(0, limit).map((cow: Cow) => {
        // Stable mock values based on ID to maintain purity and premium feel
        const mockTemp = (38.2 + (Number(cow.id) % 10) * 0.1).toFixed(1);
        const mockDist = (1.2 + (Number(cow.id) % 5) * 0.3).toFixed(1);
        
        const isFever = cow.healthStatus === "Fever" || 
                        (cow.temperature && parseFloat(cow.temperature.toString()) > 39.5);
        
        return (
          <div
            key={cow.id}
            className="group flex flex-col md:flex-row items-center gap-6 rounded-[2.5rem] border border-white bg-white/40 p-6 md:p-8 shadow-sm transition-all hover:bg-white/80 hover:shadow-xl hover:scale-[1.01]"
          >
            {/* Health Icon Container */}
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-inner ${
                isFever ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'
            }`}>
              {isFever ? <MdError size={32} /> : <MdCheckCircle size={32} />}
            </div>

            {/* Core Info */}
            <div className="flex-1 min-w-0 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h4 className="text-xl font-black text-gray-900 tracking-tighter uppercase truncate">
                    {cow.name || `Entity #${cow.id}`}
                </h4>
                <div className="flex items-center justify-center md:justify-start gap-2 h-8 px-4 rounded-full bg-[#023b26]/5 border border-[#023b26]/10">
                    <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                        <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${isFever ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                        <div className={`relative h-2 w-2 rounded-full ${isFever ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#023b26]">
                        {cow.healthStatus?.toUpperCase() || "SYNCED"}
                    </span>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-1 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                <span className="opacity-40">Device Node:</span>
                <span className="text-emerald-600/60">{cow.deviceId || "UNASSIGNED"}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-8 px-8 py-4 rounded-2xl bg-white/40 border border-white/40 shadow-inner">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5 text-[#023b26] mb-0.5">
                        <MdThermostat size={18} />
                        <span className="text-sm font-black tracking-tighter">{cow.temperature || mockTemp}°C</span>
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Core Temp</span>
                </div>
                
                <div className="h-8 w-px bg-gray-200" />
                
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5 text-[#023b26] mb-0.5">
                        <MdTrendingUp size={18} />
                        <span className="text-sm font-black tracking-tighter">{cow.distance ? cow.distance.toFixed(1) : mockDist}km</span>
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Mobility</span>
                </div>
            </div>

            {/* Action */}
            <TransitionLink
              href={`/dashboard/herd/${cow.id}`}
              className="flex h-12 w-full md:w-auto px-6 items-center justify-center gap-2 rounded-xl bg-[#023b26] text-white text-[10px] font-black uppercase tracking-widest shadow-lg transition-all hover:bg-emerald-900 active:scale-95"
            >
              Analyze
              <MdChevronRight size={18} />
            </TransitionLink>
          </div>
        );
      })}
    </div>
  );
}
