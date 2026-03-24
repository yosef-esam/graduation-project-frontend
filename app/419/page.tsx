'use client';

import { motion } from 'framer-motion';
import { MdArrowForward, MdTimerOff } from 'react-icons/md';

export default function PageExpired() {
  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#fafafa] p-6 lg:p-12">
      {/* Decorative Blur Elements */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center justify-center overflow-hidden rounded-[3.5rem] border border-white bg-white p-12 text-center shadow-2xl md:p-20"
      >
        <div className="pointer-events-none absolute right-0 top-0 h-1/2 w-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent opacity-50" />

        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-amber-100/50 bg-amber-50 text-amber-500 shadow-inner">
          <MdTimerOff size={48} />
        </div>

        <h1 className="bg-linear-to-b mb-2 from-gray-900 to-gray-400 bg-clip-text text-8xl font-black uppercase tracking-tighter text-transparent md:text-9xl">
          419
        </h1>

        <h2 className="mb-6 text-2xl font-black uppercase tracking-tighter text-gray-900 md:text-3xl">
          Session Expired
        </h2>

        <p className="mx-auto mb-10 max-w-md text-sm font-bold text-gray-500">
          Your active FarmIQ synchronization token has expired. For grid
          security reasons, please re-authenticate to continue.
        </p>

        <TransitionLink
          href="/login"
          className="group relative flex h-16 w-full max-w-[280px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-amber-500 text-white shadow-xl shadow-amber-900/10 transition-all hover:bg-amber-600"
        >
          <div className="bg-linear-to-r absolute inset-0 from-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <div className="relative z-10 flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em]">
            RE-AUTHORIZE
            <MdArrowForward
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </TransitionLink>
      </motion.div>
    </div>
  );
}
