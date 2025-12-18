'use server';

import { cookies } from 'next/headers';
import { API_BASE_URL } from '../lib/api.js';

// ------------------- Register -------------------
export async function registerAction(formData) {
  const res = await fetch(`${API_BASE_URL}/authentication/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
}

// ------------------- Login -------------------
export async function loginAction({ email, password }) {
  const formData = new FormData();
  formData.append('Email', email);
  formData.append('Password', password);

  const res = await fetch(`${API_BASE_URL}/authentication/signin`, {
    method: 'POST',
    body: formData,
    cache: 'no-store',
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  const cookieStore = await cookies();
  cookieStore.set('accessToken', data.data.accessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  if (data.data.refreshToken) {
    cookieStore.set('refreshToken', data.data.refreshToken.token, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return data;
}
export async function refreshTokenAction() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  const res = await fetch(`${API_BASE_URL}/authentication/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken,
      refreshToken,
    }),
    cache: 'no-store',
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw new Error(data.message || 'Failed to refresh token');
  }

  cookieStore.set('accessToken', data.data.accessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  if (data.data.refreshToken) {
    cookieStore.set('refreshToken', data.data.refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return data;
}

// ------------------------------------------------------
// ✅ Send OTP to email (Forgot Password Step 1)
// ------------------------------------------------------
export async function sendResetOtpAction(email) {
  const res = await fetch(
    `${API_BASE_URL}/authentication/send-reset-password-code`,
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
export async function resetPasswordAction({ email, resetCode, newPassword }) {
  const res = await fetch(`${API_BASE_URL}/authentication/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      resetCode,
      newPassword,
    }),
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to reset password');
  }

  return data;
}
