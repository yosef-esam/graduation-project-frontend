// app/actions/animalActions.js
'use server';

import { API_BASE_URL } from '@/lib/api';
import { authFetch } from '@/lib/authFetch';

// ================= GET ALL =================
export async function getAnimals() {
  try {
    const res = await authFetch(`${API_BASE_URL}/animals`, {
      cache: 'no-store',
      headers: {
        accept: "application/json",
      }
    });
    
    const text = await res.text();
    if (!text) return [];

    const data = JSON.parse(text);
    if (!res.ok) throw new Error(data.message || "Failed to fetch animals");
    
    // Robust fallback to handle different API response shapes
    return data.data || data || [];
  } catch (error) {
    console.error("Failed to fetch animals:", error);
    return [];
  }
}

// ================= GET BY ID =================
export async function getAnimalById(id: string | number) {
  try {
    const res = await authFetch(`${API_BASE_URL}/animals/${id}`, {
      cache: 'no-store',
      headers: {
        accept: "application/json",
      }
    });

    const text = await res.text();
    if (!text) throw new Error('Animal not found');

    const data = JSON.parse(text);
    if (!res.ok) throw new Error(data.message || 'Animal not found');

    return data.data || data;
  } catch (error) {
    console.error("Failed to fetch animal by id:", error);
    return null;
  }
}

// ================= CREATE =================
export async function createAnimal(data: {
  name: string | null;
  species: string | null;
  age: number;
  weight: number;
  dateOfBirth: string | null;
  notes: string | null;
  deviceId: string;
}) {
  const res = await authFetch(`${API_BASE_URL}/animals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Failed to create animal');
  }
  
  return res.ok;
}

// ================= UPDATE =================
export async function updateAnimal(id: string | number, data: any) {
  const res = await authFetch(`${API_BASE_URL}/animals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update animal');
  return res.json();
}

// ================= DELETE =================
export async function deleteAnimal(id: string | number) {
  const res = await authFetch(`${API_BASE_URL}/animals/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete animal');
  return res.status === 204 ? true : res.json();
}

// ================= COUNT =================
export async function getAnimalsCount() {
  try {
    const res = await authFetch(`${API_BASE_URL}/animals/count`, {
      cache: 'no-store',
      headers: {
        accept: "application/json",
      }
    });
    
    if (!res.ok) return { totalCount: 0, healthyCount: 0, feverCount: 0, lowActivityCount: 0 }; 

    const text = await res.text();
    if (!text) return { totalCount: 0, healthyCount: 0, feverCount: 0, lowActivityCount: 0 };

    const data = JSON.parse(text);
    return data.data || data || { totalCount: 0, healthyCount: 0, feverCount: 0, lowActivityCount: 0 };
  } catch (error) {
    console.error("Failed to fetch animals count:", error);
    return { totalCount: 0, healthyCount: 0, feverCount: 0, lowActivityCount: 0 };
  }
}
