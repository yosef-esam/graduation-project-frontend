'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/Dashboard/PageHeader';
import { MdNotificationsActive, MdWarning, MdError, MdCheckCircle, MdClose, MdSecurity, MdHistory, MdDescription } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ScrollableWrapper } from '@/components/Dashboard/ScrollableWrapper';

interface Alert {
  id: number;
  type: string;
  title: string;
  entity: string;
  time: string;
  color: string;
  precautions: string[];
}

const alerts = [
  { id: 1, type: 'CRITICAL', title: 'PHYSIOLOGICAL CORE TEMP SPIKE', entity: 'COW #921A', time: '2 mins ago', color: 'rose', precautions: ['Immediate isolation required', 'Node temperature drop initialized', 'Biometric bypass engaged', 'Manual vet dispatch pending'] },
  { id: 2, type: 'WARNING', title: 'BEHAVIORAL ANOMALY DETECTED', entity: 'COW #442B', time: '15 mins ago', color: 'amber', precautions: ['Visual verification suggested', 'Pasture activity tracking enabled', 'Behavioral sync delay detected'] },
  { id: 3, type: 'SYSTEM', title: 'NETWORK NODE BANDWIDTH DROUP', entity: 'GATEWAY-7', time: '1 hour ago', color: 'blue', precautions: ['Redundancy link initialized', 'Hardware reboot scheduled', 'Port scan running'] },
  { id: 4, type: 'CRITICAL', title: 'RUMINATION DEVIATION DETECTED', entity: 'COW #118C', time: '3 hours ago', color: 'rose', precautions: ['Immediate digestion analysis', 'Water supply check', 'Forage quality report requested'] },
  { id: 5, type: 'RESOLVED', title: 'CALF WEANING PROTOCOL SUCCESS', entity: 'COW #002D', time: 'Yesterday', color: 'emerald', precautions: ['Weight gain tracking on', 'Daily vitals log saved'] },
];

export default function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalContent = (
    <AnimatePresence>
      {selectedAlert && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAlert(null)}
            className="absolute inset-0 bg-[#002316]/80 backdrop-blur-2xl cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="w-full max-w-2xl overflow-hidden rounded-[3.5rem] border border-white/20 bg-white shadow-2xl relative z-10 flex flex-col"
            style={{ maxHeight: '90vh' }}
          >
            {/* Tooltip Pin Header */}
            <div className={`p-14 md:p-16 text-white relative flex-shrink-0 ${
                selectedAlert.color === 'rose' ? 'bg-rose-600' :
                selectedAlert.color === 'amber' ? 'bg-amber-500' :
                selectedAlert.color === 'emerald' ? 'bg-emerald-600' :
                'bg-blue-600'
            }`}>
              {/* Pointy Tip */}
              <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 rounded-none z-0 ${
                selectedAlert.color === 'rose' ? 'bg-rose-600' :
                selectedAlert.color === 'amber' ? 'bg-amber-500' :
                selectedAlert.color === 'emerald' ? 'bg-emerald-600' :
                'bg-blue-600'
              }`} />

              <button
                onClick={() => setSelectedAlert(null)}
                className="absolute right-10 top-10 h-12 w-12 flex items-center justify-center rounded-2xl bg-white/20 hover:bg-white/30 transition-all z-20"
              >
                <MdClose size={28} />
              </button>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                 <MdSecurity size={32} />
                 <span className="text-xl font-black uppercase tracking-tighter">Protocol {selectedAlert.id}</span>
              </div>

              <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-1 relative z-10">
                {selectedAlert.title}
              </h2>
              <p className="font-bold text-white/60 tracking-widest text-[10px] uppercase relative z-10">FarmIQ Alert System Protocol // Active Node Monitoring</p>
            </div>

            <div className="overflow-hidden flex-1 flex flex-col">
              <ScrollableWrapper className="p-14 md:p-16 space-y-10 flex-1 no-scrollbar" maxHeight="100%">
                <div className="grid grid-cols-2 gap-8">
                      <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100">
                          <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Operational Entity</span>
                          <div className="flex items-center gap-2">
                               <div className="h-2 w-2 rounded-full bg-emerald-500" />
                               <span className="text-lg font-black text-gray-900 tracking-tight">{selectedAlert.entity}</span>
                          </div>
                      </div>
                      <div className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100">
                          <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Inference Time</span>
                          <div className="flex items-center gap-2 text-gray-900 font-black tracking-tight">
                               <MdHistory size={20} className="text-gray-400" />
                               {selectedAlert.time.toUpperCase()}
                          </div>
                      </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-2 pl-2">
                          <MdDescription className="text-emerald-500" size={20} />
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Precautions & Directives</h4>
                    </div>
                    <div className="space-y-3">
                        {selectedAlert.precautions?.map((precaution: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-6 p-6 md:p-8 rounded-[2rem] bg-[#023b26]/5 border border-[#023b26]/5 font-black text-xs text-gray-800 tracking-tight leading-relaxed">
                                <div className="h-8 w-8 rounded-xl bg-[#023b26] text-white flex items-center justify-center text-[10px] shrink-0">
                                    {idx + 1}
                                </div>
                                {precaution.toUpperCase()}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                  onClick={() => setSelectedAlert(null)}
                  className={`w-full h-16 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-xl transition-all active:scale-95 ${
                      selectedAlert.color === 'rose' ? 'bg-rose-600 hover:bg-rose-700' :
                      selectedAlert.color === 'amber' ? 'bg-amber-500 hover:bg-amber-600' :
                      selectedAlert.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                      'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Acknowledge Matrix Protocol
                </button>
              </ScrollableWrapper>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-10">
      <div className="max-w-[1340px] mx-auto space-y-10">
        <PageHeader
          title="Health Matrix Alerts"
          subtitle="Real-time synchronized alert system monitoring biometric deviations and infrastructure integrity across all farm nodes."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-white/40 border border-white shadow-xl backdrop-blur-3xl relative overflow-hidden group transition-all hover:bg-white/60">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[50px] z-0" />
                <div className="relative z-10">
                    <div className="h-16 w-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-sm">
                        <MdError size={32} />
                    </div>
                    <h3 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">02</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-500/60 mt-2">Critical Faults Active</p>
                </div>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white/40 border border-white shadow-xl backdrop-blur-3xl relative overflow-hidden group transition-all hover:bg-white/60">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] z-0" />
                <div className="relative z-10">
                    <div className="h-16 w-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-sm">
                        <MdWarning size={32} />
                    </div>
                    <h3 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">01</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/60 mt-2">Pending Warnings</p>
                </div>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white/40 border border-white shadow-xl backdrop-blur-3xl relative overflow-hidden group transition-all hover:bg-white/60">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] z-0" />
                <div className="relative z-10">
                    <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-sm">
                        <MdCheckCircle size={32} />
                    </div>
                    <h3 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">98.4%</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60 mt-2">Local Node Stability</p>
                </div>
            </div>
        </div>

        <div className="rounded-[3.5rem] border border-white bg-white/40 p-12 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] -z-10" />

          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-1">Alert Feed</h2>
              <p className="font-bold text-gray-400 text-sm">Synchronized biometric telemetry stream.</p>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-[#023b26] flex items-center justify-center text-emerald-400">
                <MdNotificationsActive size={32} />
            </div>
          </div>

          <div className="space-y-6">
            {alerts.map((alert, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={alert.id}
                className="flex items-center justify-between p-8 rounded-3xl bg-white/60 border border-gray-50 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all cursor-default group"
              >
                <div className="flex items-center gap-8">
                  <div className={`h-16 w-16 rounded-[1.25rem] flex items-center justify-center font-black text-[10px] shadow-sm transform transition-transform group-hover:rotate-12 ${
                    alert.color === 'rose' ? 'bg-rose-50 text-rose-600 border border-rose-200' :
                    alert.color === 'amber' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                    alert.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                    'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}>
                    {alert.type}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 uppercase tracking-tight">{alert.title}</h4>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">{alert.entity} {"//"} {alert.time.toUpperCase()}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlert(alert)}
                  className="h-12 px-8 rounded-2xl bg-white text-[11px] font-black uppercase tracking-widest text-[#023b26] border border-gray-100 transition-all hover:bg-[#023b26] hover:text-white shadow-sm flex items-center gap-2"
                >
                  <MdSecurity size={18} />
                  Protocol Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {mounted && createPortal(modalContent, document.body)}
    </div>
  );
}
