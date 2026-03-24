'use client';

import React from 'react';
import { PageHeader } from '@/components/Dashboard/PageHeader';
import { MdShield, MdNotifications, MdCloudDone, MdSave } from 'react-icons/md';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [settings, setSettings] = React.useState({
    biometric: true,
    twoFactor: false,
    criticalPush: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-10">
      <div className="max-w-[1340px] mx-auto space-y-10">
        <PageHeader
          title="Node Configuration"
          subtitle="Configure system-wide operational parameters, security encryption protocols, and synchronization frequency for the local node."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="p-10 rounded-[3.5rem] bg-white/40 backdrop-blur-3xl border border-white shadow-2xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-14 w-14 rounded-2xl bg-[#023b26] text-emerald-400 flex items-center justify-center shadow-lg">
                            <MdShield size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-1">Security Grid</h3>
                            <p className="font-bold text-gray-400 text-sm">Configure multi-layered access protocols.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-6 rounded-3xl bg-white/60 border border-gray-50 group transition-all hover:bg-white/80">
                            <div>
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">Biometric Encryption</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">AES-256 Synchronized Encryption</p>
                            </div>
                            <div 
                                onClick={() => toggleSetting('biometric')}
                                className={`h-8 w-14 rounded-full relative cursor-pointer px-1 flex items-center transition-all duration-300 shadow-inner ${settings.biometric ? 'bg-emerald-500' : 'bg-gray-200'}`}
                            >
                                <motion.div 
                                    animate={{ x: settings.biometric ? 24 : 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="h-6 w-6 rounded-full bg-white shadow-sm" 
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-6 rounded-3xl bg-white/60 border border-gray-50 group transition-all hover:bg-white/80">
                            <div>
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">Two-Factor Authorization</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Required for all personnel logins</p>
                            </div>
                            <div 
                                onClick={() => toggleSetting('twoFactor')}
                                className={`h-8 w-14 rounded-full relative cursor-pointer px-1 flex items-center transition-all duration-300 shadow-inner ${settings.twoFactor ? 'bg-emerald-500' : 'bg-gray-200'}`}
                            >
                                <motion.div 
                                    animate={{ x: settings.twoFactor ? 24 : 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="h-6 w-6 rounded-full bg-white shadow-sm" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-10 rounded-[3.5rem] bg-white/40 backdrop-blur-3xl border border-white shadow-2xl">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-14 w-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                            <MdNotifications size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-1">Communication</h3>
                            <p className="font-bold text-gray-400 text-sm">System-wide propagation preferences.</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-6 rounded-3xl bg-white/60 border border-gray-50 group transition-all hover:bg-white/80">
                            <div>
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">Critical Temp Push</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Immediate dispatch to mobile units</p>
                            </div>
                            <div 
                                onClick={() => toggleSetting('criticalPush')}
                                className={`h-8 w-14 rounded-full relative cursor-pointer px-1 flex items-center transition-all duration-300 shadow-inner ${settings.criticalPush ? 'bg-emerald-500' : 'bg-gray-200'}`}
                            >
                                <motion.div 
                                    animate={{ x: settings.criticalPush ? 24 : 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="h-6 w-6 rounded-full bg-white shadow-sm" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="p-10 rounded-[3.5rem] bg-[#023b26] text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px]" />
                    <MdCloudDone className="text-emerald-400 mb-6" size={40} />
                    <h3 className="text-2xl font-black tracking-tighter uppercase mb-4">Node Health</h3>
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-emerald-100/40">
                            <span>Latency</span>
                            <span className="text-emerald-400">0.04ms</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[95%] bg-emerald-500" />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-emerald-100/40">
                            <span>Uptime</span>
                            <span className="text-emerald-400">99.98%</span>
                        </div>
                    </div>
                    <button className="w-full h-16 rounded-2xl bg-white/10 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-white/20 border border-white/5 active:scale-95">
                        Synchronize Node
                    </button>
                </div>

                <button className="w-full h-24 rounded-[2.5rem] bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 group">
                    <MdSave size={28} className="transition-transform group-hover:rotate-12" />
                    <span className="text-lg font-black uppercase tracking-widest leading-none">Save Protocol</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
