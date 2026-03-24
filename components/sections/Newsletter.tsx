'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdMail, MdSend, MdCheckCircle } from 'react-icons/md';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      toast.success('Welcome to the Green Frontier! 🐄');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="relative pb-24 px-6 overflow-hidden bg-white">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full container h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto w-full">
        <div className="relative overflow-hidden rounded-[4rem] bg-linear-to-br from-[#023b26] to-[#011a11] p-12 md:p-20 text-white shadow-2xl">
          {/* Internal Accents */}
          <div className="absolute right-0 top-0 h-full w-1/3 bg-emerald-500/10 blur-[80px]" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 bg-emerald-400/5 blur-[100px]" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
              >
                <MdMail className="text-emerald-400" />
                <span className="text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px]">
                  Stay Synchronized
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter leading-none"
              >
                The <span className="text-emerald-400">Green Frontier</span> <br /> Weekly
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-emerald-100/60 font-bold text-lg max-w-md mx-auto lg:mx-0"
              >
                Get the latest insights on IoT farm scaling, livestock health trends, and precision biological monitoring.
              </motion.p>
            </div>

            <div className="flex-1 w-full max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="h-20 w-20 flex items-center justify-center rounded-3xl bg-emerald-500/20 mb-6">
                      <MdCheckCircle size={48} className="text-emerald-400" />
                    </div>
                    <h4 className="text-2xl font-black uppercase tracking-tight mb-2">Transmission Confirmed</h4>
                    <p className="font-bold text-emerald-100/40">You are now part of the intelligence network.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                      <div className="relative flex flex-col md:flex-row items-center bg-white/5 border border-white/10 rounded-[2rem] p-2 gap-2 backdrop-blur-3xl transition-all focus-within:border-emerald-500/50">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Network Email..."
                          required
                          className="flex-1 w-full bg-transparent px-6 py-4 outline-none font-bold text-sm md:text-lg placeholder:text-white/20 text-center md:text-left"
                        />
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="bg-emerald-500 hover:bg-emerald-600 w-full md:w-32 lg:w-40 text-white h-14 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 group/btn"
                        >
                          <span className="font-black uppercase tracking-widest text-[10px]">Authorize</span>
                          <MdSend size={20} className="transition-transform group-hover/btn:translate-x-1 hidden lg:block" />
                        </button>
                      </div>
                    </div>
                    <p className="px-6 text-[10px] font-black uppercase tracking-widest text-white/20 text-center">
                      Secure transmission. Zero spam. Opt-out anytime.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
