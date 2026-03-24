'use client';

import React from 'react';
import { LogoLoop } from '@/components/ui/LogoLoop';
import { MdStar } from 'react-icons/md';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: "Charlotte Harris",
    farm: "Refit Craftsmanship",
    initials: "IMG",
    text: "Working with FarmIQ has been a revelation for our operational efficiency. Their precision in biological security and infrastructure management is top-tier."
  },
  {
    name: "Benjamin Scott",
    farm: "Apex Bio-Nodes",
    initials: "BS",
    text: "The quality of craftsmanship in their synchronization protocols is unmatched. We have full visibility into our node network like never before."
  },
  {
    name: "Sophia Miller",
    farm: "Global Agri-Sync",
    initials: "SM",
    text: "Sublime depth and analytics. FarmIQ doesn't just provide data; they provide the intelligence needed for mission-critical farm decisions."
  },
  {
    name: "Liam O'Connor",
    farm: "Emerald Valley",
    initials: "LO",
    text: "The transition to FarmIQ's Multi-Node Architecture was seamless. Our technicians and operators were up to speed in days."
  },
  {
    name: "Isabella Wang",
    farm: "Matrix Orchards",
    initials: "IW",
    text: "Precision biological security at its finest. The peace of mind knowing our data and infrastructure are protected is invaluable."
  }
];

export default function Reviews() {
  const logoItems = reviews.map((rev) => ({
    node: (
      <div className="mx-6 overflow-hidden flex flex-col gap-3 p-6 rounded-[2rem] bg-white/40 backdrop-blur-2xl border border-white/20 shadow-2xl w-[350px] transition-all hover:bg-white/60 group/card">
        <div className="flex gap-1 text-emerald-500">
            {[...Array(5)].map((_, i) => <MdStar key={i} size={16} />)}
        </div>
        <p className="text-gray-800 font-bold italic text-sm md:text-base leading-relaxed line-clamp-5 min-h-[100px]">
          &ldquo;{rev.text}&rdquo;
        </p>
        <div className="mt-4 flex items-center gap-4 w-full pt-4 border-t border-black/5">
          <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-emerald-500/20 shadow-sm shrink-0">
            <img
              src={`https://i.pravatar.cc/100?u=${rev.name.split(' ')[0]}`}
              alt={rev.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-gray-900 leading-tight">{rev.name}</span>
            <span className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest">{rev.farm}</span>
          </div>
        </div>
      </div>
    )
  }));

  return (
    <section id="feedback" className="py-12 md:py-24 bg-white relative  overflow-hidden">
      <div className="container relative z-10 mb-8 text-center lg:text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center overflow-visible"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase md:text-4xl leading-none">
            Hear from our <span className="text-emerald-500">Node Operators</span>
          </h2>
          <p className="mt-4 text-gray-400 font-bold max-w-xl text-sm md:text-base leading-relaxed">
             Hear from our happy clients about their experience working with FarmIQ and the quality of our synchronization craftsmanship.
          </p>
        </motion.div>
      </div>

      <div className="relative overflow-hidden ">
        <LogoLoop
          logos={logoItems}
          speed={40}
          gap={32}
          logoHeight={280}
          fadeOut={true}
          pauseOnHover={true}
          scaleOnHover={false}
        />
      </div>
    </section>
  );
}
