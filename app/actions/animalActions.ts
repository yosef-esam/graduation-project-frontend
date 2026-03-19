// app/actions/animalActions.js
'use server';

import { API_BASE_URL } from '../lib/api';
import { authFetch } from '../lib/authFitch';

// ================= GET ALL =================
export async function getAnimals() {
  const res = await authFetch(`${API_BASE_URL}/animals`, {
    cache: 'no-store',
    headers: {
      accept: "application/json",
    }
  });
  const text = await res.text();

  let data: any = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!res.ok) throw new Error(data.message || "Failed to fetch farms");
  console.log(data.data.data)
  return data.data;
}

// ================= GET BY ID =================
export async function getAnimalById(id) {
  const res = await authFetch(`${API_BASE_URL}/animals/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Animal not found');
  return res.json();
}

// ================= CREATE =================
export async function createAnimal(data: {
  name: string | null;
  species: string | null;
  age: number;
  weight: number;
  dateOfBirth: string | null;
  notes: string | null;
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


}

// ================= UPDATE =================
export async function updateAnimal(id, data) {
  const res = await authFetch(`${API_BASE_URL}/animals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update animal');
  return res.json();
}

// ================= DELETE =================
export async function deleteAnimal(id) {
  const res = await authFetch(`${API_BASE_URL}/animals/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete animal');
  return res.json();
}

// ================= COUNT =================
export async function getAnimalsCount() {
  const res = await authFetch(`${API_BASE_URL}/animals/count`, {
    cache: 'no-store',
  });
  console.log(res)
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Registration failed');

  return data.data;
}
