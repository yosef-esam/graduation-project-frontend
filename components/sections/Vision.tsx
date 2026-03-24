'use client';

import React from 'react';

import { MdPhoneIphone, MdDesktopWindows, MdAdminPanelSettings, MdCheck, MdLayers, MdChevronRight } from 'react-icons/md';

const categories = [
  {
    name: 'Farm Owner Dashboard',
    desc: 'Complete control over herd inventory, health alerts, and staffing with real-time analytics.',
    icon: <MdDesktopWindows size={40} className="size-13 text-emerald-500" />,
    features: ['Animal Tracking', 'Inventory Management', 'Worker Oversight'],
    gradient: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    name: 'Mobile Worker App',
    desc: 'Direct alerts to field staff for immediate health issues and locating animals via telemetry.',
    icon: <MdPhoneIphone size={40} className="size-13 text-emerald-600" />,
    features: ['Instant Alerts', 'Local Proximity', 'Health Logging'],
    gradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    name: 'Admin Infrastructure',
    desc: 'Centralized configuration of farm networks and IoT device provisioning at scale.',
    icon: (
      <MdAdminPanelSettings size={40} className="size-13 text-emerald-700" />
    ),
    features: ['Gateway Config', 'Firmware Matrix', 'System Monitoring'],
    gradient: 'from-purple-500/10 to-indigo-500/10',
  },
];

export default function Vision() {
  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-emerald-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-50/30 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        <div className="text-center mb-24">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6"
          >
            <MdLayers className="text-emerald-600" />
            <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px]">
              The Ecosystem
            </span>
          </div>
          <h2
            className="text-5xl md:text-7xl font-black text-[#023b26] tracking-tighter uppercase leading-[0.9]"
          >
            A Multi-Node <br /><span className="text-emerald-500">Architecture</span>
          </h2>
          <p
            className="mt-8 mx-auto max-w-2xl text-lg text-gray-500 font-bold leading-relaxed"
          >
            One hyper-synchronized platform, three specialized experiences designed to protect and optimize every role on the modern farm.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col md:flex-row items-center gap-10 p-8 md:p-12 bg-white/40 rounded-[2.5rem] border border-gray-100 hover:border-emerald-200 hover:bg-white/80 transition-all duration-500 shadow-xl shadow-gray-200/20 backdrop-blur-xl"
            >
              <div className={`shrink-0 flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-[2rem] bg-linear-to-br ${cat.gradient} border border-white/50 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                {cat.icon}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter leading-none group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-500 font-bold text-base leading-relaxed max-w-xl">
                  {cat.desc}
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
                  {cat.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 text-xs font-black text-emerald-700 uppercase tracking-widest">
                      <MdCheck size={16} className="text-emerald-500" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative line */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                 <MdChevronRight size={48} className="text-emerald-100" />
              </div>
            </div>
          ))}
        </div>

        <div
            className="mt-24 p-12 md:p-20 bg-linear-to-br from-[#023b26] to-[#011a11] rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative shadow-2xl shadow-emerald-900/20"
        >
            <div className="absolute right-0 top-0 h-full w-1/2 bg-emerald-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 bg-blue-500/5 blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl text-center md:text-left">
                <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter leading-[0.9]">Ready to automate <br /> your <span className="text-emerald-400">deployment</span>?</h3>
                <p className="text-emerald-100/60 font-bold text-lg max-w-md mx-auto md:mx-0">Join the next generation of farm managers protecting their livelihood with real-time matrix analytics.</p>
            </div>

            <button
              className="relative z-10 mt-12 md:mt-0 bg-white text-[#023b26] px-12 py-7 font-black rounded-3xl hover:bg-emerald-50 transition-all shadow-2xl uppercase tracking-widest text-sm"
            >
                Start Deployment
            </button>
        </div>
      </div>
    </section>
  );
}
