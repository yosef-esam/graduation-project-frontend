'use server';

import { cookies } from 'next/headers';
import { API_BASE_URL } from '../lib/api.js';

// ------------------- Register -------------------
export async function registerAction(formData) {
  const res = await fetch(`${API_BASE_URL}/Auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userRequest: {
        ...formData,
        role: Number(formData.role),
        phoneNumber: String(formData.phoneNumber),
      },
    }),
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
}

// ------------------- Login -------------------
export async function loginAction({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/Auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');

  const cookieStore = await cookies();
  cookieStore.set('access_token', data.data.accessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return data;
}

// ------------------------------------------------------
// ✅ Send OTP to email (Forgot Password Step 1)
// ------------------------------------------------------
export async function sendResetOtpAction(email) {
  const res = await fetch(
    `${API_BASE_URL}/Password/SendResetPasswordOtp`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      cache: 'no-store',
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to send OTP');

  return data;
}

// ------------------------------------------------------
// ✅ Reset Password (Forgot Password Step 2)
// ------------------------------------------------------
export async function resetPasswordAction({ email, otp, newPassword }) {
  const res = await fetch(`${API_BASE_URL}/Password/ResetPassword`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      otp,
      newPassword
    }),
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to reset password');
  }

  return data;
}