'use server';

import { authFetch } from '@/lib/authFetch';
import { API_BASE_URL } from '@/lib/api.js';

export async function fetchChatHistory(page = 1, pageSize = 50) {
  try {
    const res = await authFetch(
      `${API_BASE_URL}/chat/history?page=${page}&pageSize=${pageSize}`,
    );

    if (!res.ok) return [];

    const data = await res.json();
    // Handle both { data: [...] } wrapper and direct array
    return data.data ?? data;
  } catch (error) {
    console.error('[fetchChatHistory] Error:', error);
    return [];
  }
}
