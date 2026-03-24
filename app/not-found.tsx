'use client';

import { TransitionLink } from '@/components/TransitionLink';
import { motion } from 'framer-motion';
import { MdErrorOutline, MdArrowBack } from 'react-icons/md';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden isolate">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex flex-col items-center justify-center w-full max-w-3xl overflow-hidden rounded-[3.5rem] bg-white shadow-2xl border border-white p-12 md:p-20 text-center z-10"
      >
        <div className="absolute top-0 right-0 w-full h-1/2 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="w-24 h-24 rounded-3xl bg-red-50 text-red-500 flex items-center justify-center mb-8 shadow-inner border border-red-100/50">
           <MdErrorOutline size={48} className='size-20' />
        </div>

        <h1 className="text-8xl md:text-9xl font-black tracking-tighter uppercase mb-2 text-transparent bg-clip-text bg-linear-to-b from-gray-900 to-gray-400">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase mb-6">
          Node Not Found
        </h2>

        <p className="text-gray-500 font-bold max-w-md mx-auto mb-10 text-sm">
          The grid sector you are attempting to access does not exist or has been relocated. Verify the operational parameters.
        </p>

        <TransitionLink
          href="/"
          className="group relative flex h-16 w-full max-w-[280px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#023b26] text-white transition-all hover:bg-emerald-950 shadow-xl shadow-emerald-900/10"
        >
          <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-transparent transition-transform group-hover:translate-x-full duration-700" />
          <div className="relative z-10 flex items-center gap-3 font-black uppercase tracking-[0.2em] text-xs">
            <MdArrowBack size={18} className="transition-transform group-hover:-translate-x-1" />
            RETURN TO GRID
          </div>
        </TransitionLink>
      </motion.div>
    </div>
  );
}
