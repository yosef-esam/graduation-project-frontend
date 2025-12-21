// app/actions/animalActions.js
'use server';

import { API_BASE_URL } from '../lib/api';

// ================= GET ALL =================
export async function getAnimals() {
  const res = await fetch(`http://farmiqapi.runasp.net/api/v1/animals`, {
    cache: 'no-store',
  });
  const data = res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
}

// ================= GET BY ID =================
export async function getAnimalById(id) {
  const res = await fetch(`${API_BASE_URL}/api/v1/animals/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Animal not found');
  return res.json();
}

// ================= CREATE =================
export async function createAnimal(data) {
  const res = await fetch(`${API_BASE_URL}/api/v1/animals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create animal');
  return res.json();
}

// ================= UPDATE =================
export async function updateAnimal(id, data) {
  const res = await fetch(`${API_BASE_URL}/api/v1/animals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update animal');
  return res.json();
}

// ================= DELETE =================
export async function deleteAnimal(id) {
  const res = await fetch(`${API_BASE_URL}/api/v1/animals/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete animal');
  return res.json();
}

// ================= COUNT =================
export async function getAnimalsCount() {
  const res = await fetch(`http://farmiqapi.runasp.net/api/v1/animals/count`, {
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Registration failed');

  return data.data;
}
