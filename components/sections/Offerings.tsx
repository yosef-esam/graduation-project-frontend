'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MdCheckCircle, MdAssignment, MdTimeline, MdDevices } from 'react-icons/md';

const experiments = [
  {
    title: "Precision Bio-Monitoring",
    desc: "Real-time tracking of physiological markers including temperature and activity levels for immediate health intervention.",
    icon: <MdTimeline className="text-emerald-500" size={32} />
  },
  {
    title: "Geofencing & Security",
    desc: "Advanced virtual fencing alerts that prevent herd straying and protect assets from unauthorized movement.",
    icon: <MdDevices className="text-blue-500" size={32} />
  },
  {
    title: "Predictive Analytics",
    desc: "AI-driven insights that forecast health trends and optimize farm resource allocation for maximum efficiency.",
    icon: <MdAssignment className="text-purple-500" size={32} />
  },
  {
    title: "Full Infrastructure Sync",
    desc: "Seamless integration between hardware sensors and cloud-based management dashboards for total control.",
    icon: <MdCheckCircle className="text-orange-500" size={32} />
  }
];

export default function Offerings() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute right-0 top-0 h-full w-1/3 translate-x-1/2 -skew-x-12 transform bg-emerald-50/50" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600">
                What We Offer
              </span>
              <h2 className="mt-4 text-5xl font-black leading-none tracking-tighter text-[#023b26] md:text-6xl">
                A Complete <br />
                <span className="text-emerald-500">Intelligence Matrix</span>
              </h2>
              <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-gray-500">
                We provide the hardware and software needed to digitize your farm
                operations, ensuring every animal is monitored and every data
                point is actionable.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {experiments.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 text-emerald-600 shadow-sm">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-black tracking-tight text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-sm font-medium leading-normal text-gray-500">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex-1"
          >
            <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-linear-to-br from-emerald-500 to-teal-600 p-1 shadow-2xl">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-[2.9rem] bg-white p-8 text-center">
                <MdDevices size={100} className="mb-6 size-20 text-emerald-500" />
                <h3 className="mb-4 text-3xl font-black uppercase tracking-tighter text-gray-900">
                  Deployment Service
                </h3>
                <p className="mb-8 font-bold text-gray-500">
                  We handle the full setup of IoT collars and gateway
                  infrastructure on your farm.
                </p>
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="rounded-3xl bg-emerald-500 px-10 py-5 font-black text-white shadow-xl shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-95"
                >
                  REQUEST PROVISIONING
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
