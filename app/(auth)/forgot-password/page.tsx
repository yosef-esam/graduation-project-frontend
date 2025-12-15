'use client';

import React, { useState } from 'react';
import Btn from '@/app/utils/Btn';
import InputField from '@/app/utils/InputField';
import { Toaster, toast } from 'react-hot-toast';
import {
  sendResetOtpAction,
  resetPasswordAction,
} from '@/app/actions/authActions';

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

  // STEP 1 — Send OTP
  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.email) return toast.error('Email is required');

    try {
      setLoading(true);

      const res = await sendResetOtpAction(form.email);

      toast.success('OTP sent to your email');

      // Open Modal + Fill Email Automatically
      setOtpForm(prev => ({ ...prev, email: form.email }));
      setShowOtpModal(true);
    } catch (error) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 — Submit OTP & New Password
  const handleOtpSubmit = async e => {
    e.preventDefault();

    if (!otpForm.resetCode || !otpForm.newPassword)
      return toast.error('OTP & new password required');

    try {
      setOtpLoading(true);

      const res = await resetPasswordAction(otpForm);

      toast.success('Password updated successfully');

      setShowOtpModal(false);
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <section className="flex h-full w-full items-center justify-center py-8 md:py-12">
      <Toaster position="top-right" />

      {/* FORM: Send OTP */}
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col gap-4 px-4 max-sm:justify-center lg:px-10"
      >
        <h1 className="text-(--primary_color) mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
          Forgot Password
        </h1>

        <InputField
          name="email "
          label="Email Address"
          placeholder="Enter Your Email"
          id="email"
          type="email"
          value={form.email}
          onChange={e => setForm({ email: e.target.value })}
        />

        <Btn text={loading ? 'Sending...' : 'Send OTP'} type="submit" />
      </form>

      {/* -------------------- POPUP MODAL -------------------- */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute right-4 top-3 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="mb-4 text-center text-2xl font-bold">Enter OTP</h2>

            {/* OTP FORM */}
            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
              {/* Email (auto-filled) */}
              <InputField
                name="Email"
                label="Email"
                id="otp-email"
                type="email"
                defultValue={otpForm.email}
              />

              {/* OTP */}
              <InputField
                name="OTP Code"
                label="OTP Code"
                placeholder="Enter your OTP"
                id="otp"
                type="text"
                value={otpForm.resetCode}
                onChange={e =>
                  setOtpForm({ ...otpForm, resetCode: e.target.value })
                }
              />

              {/* New Password */}
              <InputField
                name="New Password"
                label="New Password"
                placeholder="Enter new password"
                id="newPassword"
                type="password"
                value={otpForm.newPassword}
                onChange={e =>
                  setOtpForm({ ...otpForm, newPassword: e.target.value })
                }
              />

              <Btn
                text={otpLoading ? 'Updating...' : 'Confirm'}
                type="submit"
              />
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
