"use client";

import {
  resetPasswordAction,
  sendResetOtpAction,
} from '@/actions/authActions';
import Btn from '@/utils/Btn';
import InputField from '@/utils/InputField';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import { MdEmail, MdLock, MdVpnKey, MdClose, MdShield } from 'react-icons/md';
import { createPortal } from 'react-dom';

export default function ForgotPassword() {
  const [form, setForm] = useState({ email: '' });
  const [otpForm, setOtpForm] = useState({
    email: '',
    resetCode: '',
    newPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // STEP 1 — Send OTP
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'warning',
          title: 'Email Required',
          background: '#023b26',
          color: '#ffffff'
        });
        return;
    }

    try {
      setLoading(true);
      await sendResetOtpAction(form.email);

      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        title: 'Security Token Sent',
        text: 'OTP dispatched to your communication link.',
        background: '#023b26',
        color: '#ffffff'
      });

      setOtpForm(prev => ({ ...prev, email: form.email }));
      setShowOtpModal(true);
    } catch (error) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'error',
          title: 'Transmission Failed',
          text: (error as Error).message || 'Failed to send OTP',
          background: '#e11d48',
          color: '#ffffff'
        });
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 — Submit OTP & New Password
  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otpForm.resetCode || !otpForm.newPassword) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'warning',
          title: 'Authorization Required',
          text: 'OTP & new access key required.',
          background: '#023b26',
          color: '#ffffff'
        });
        return;
    }

    try {
      setOtpLoading(true);
      await resetPasswordAction(otpForm);

      await Swal.fire({
        icon: 'success',
        title: 'ACCESS KEY RECOUPED',
        text: 'Your security credentials have been updated.',
        confirmButtonColor: '#10b981',
        background: '#ffffff',
        customClass: {
          popup: 'rounded-[2rem] border-4 border-emerald-500 shadow-2xl font-black',
        }
      });

      setShowOtpModal(false);
      window.location.href = '/login';
    } catch (error) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          icon: 'error',
          title: 'Authorization Refused',
          text: (error as Error).message || 'Failed to reset password',
          background: '#e11d48',
          color: '#ffffff'
        });
    } finally {
      setOtpLoading(false);
    }
  };

  const modalContent = (
    <AnimatePresence>
      {showOtpModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOtpModal(false)}
            className="absolute inset-0 bg-[#023b26]/60 backdrop-blur-2xl cursor-pointer"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg overflow-hidden rounded-[3.5rem] border border-white/20 bg-white shadow-2xl relative z-10"
          >
            <div className="bg-[#023b26] p-10 text-white relative">
              <button 
                onClick={() => setShowOtpModal(false)}
                className="absolute right-6 top-6 h-10 w-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all z-20"
              >
                <MdClose size={24} />
              </button>
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-1">Enter OTP</h2>
              <p className="text-emerald-100/40 font-bold text-[10px] uppercase tracking-widest">Verify identity protocol.</p>
            </div>

            <form onSubmit={handleOtpSubmit} className="p-10 space-y-6">
              <div className="space-y-4">
                <div className="relative group grayscale">
                  <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <InputField
                    name="Email"
                    label=""
                    id="otp-email"
                    type="email"
                    defultValue={otpForm.email}
                    className="h-14 w-full rounded-2xl border border-gray-50 bg-gray-50/20 pl-12 pr-6 font-bold text-gray-400 outline-none pointer-events-none"
                  />
                </div>

                <div className="relative group">
                  <MdVpnKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors z-10" size={20} />
                  <InputField
                    label=""
                    placeholder="OTP CODE"
                    id="otp"
                    type="text"
                    value={otpForm.resetCode}
                    onChange={e => setOtpForm({ ...otpForm, resetCode: e.target.value })}
                    required
                    className="h-16 w-full rounded-2xl border border-gray-100 bg-gray-50/50 pl-12 pr-6 font-black text-sm text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 shadow-inner"
                  />
                </div>

                <div className="relative group">
                  <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors z-10" size={20} />
                  <InputField
                    label=""
                    placeholder="NEW ACCESS KEY"
                    id="newPassword"
                    type="password"
                    value={otpForm.newPassword}
                    onChange={e => setOtpForm({ ...otpForm, newPassword: e.target.value })}
                    required
                    className="h-16 w-full rounded-2xl border border-gray-100 bg-gray-50/50 pl-12 pr-6 font-black text-sm text-gray-900 outline-none transition-all focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 shadow-inner"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={otpLoading}
                className="w-full h-16 rounded-2xl bg-[#023b26] text-white font-black uppercase tracking-[0.2em] text-xs shadow-2xl transition-all hover:bg-emerald-800 disabled:opacity-50 active:scale-95"
              >
                {otpLoading ? 'SYNCHRONIZING...' : 'RESTORE ACCESS'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex min-h-[90vh] w-full items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-[2.5rem] bg-white/60 shadow-2xl backdrop-blur-3xl border border-white/20 p-12"
      >
        <div className="mb-10">
          <div className="flex items-center gap-3 text-emerald-600 mb-6">
                <MdShield size={32} />
                <span className="text-xl font-black uppercase tracking-tighter">FarmIQ Recovery</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-2">Recover Access</h1>
          <p className="font-bold text-gray-400">Request a security token to reset your access key.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600 pl-1">Operational Email</label>
            <div className="relative group">
              <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input
                type="email"
                placeholder="Verify Identity Link"
                value={form.email}
                onChange={e => setForm({ email: e.target.value })}
                required
                className="h-14 w-full rounded-2xl border border-gray-50 bg-gray-50/50 pl-12 pr-6 font-bold text-gray-900 outline-none transition-all focus:ring-2 focus:ring-emerald-500 shadow-inner"
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="group relative flex h-16 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#023b26] text-white transition-all hover:bg-[#012217] disabled:opacity-50 active:scale-95 shadow-xl font-black uppercase tracking-widest"
          >
            {loading ? 'DISPATCHING...' : 'DISPATCH TOKEN'}
          </button>
        </form>

        <div className="mt-8 text-center">
            <a href="/login" className="text-[10px] font-black text-emerald-600 hover:text-emerald-800 uppercase tracking-[0.2em] transition-colors">← Abort & Return to FarmIQ</a>
        </div>
      </motion.div>

      {mounted && createPortal(modalContent, document.body)}
    </div>
  );
}
