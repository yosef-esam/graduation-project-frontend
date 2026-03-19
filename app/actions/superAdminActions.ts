'use server';

import { authFetch } from '../lib/authFitch';
import { API_BASE_URL } from '../lib/api';
import { revalidatePath } from 'next/cache';

// ================= GET ALL FARMS =================
export async function getFarms() {

    const res = await authFetch(`${API_BASE_URL}/farms`, {
        cache: "no-store",
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

    return data.data;
}



// ================= GET FARM BY ID =================
export async function getFarmById(id: number) {

    const res = await authFetch(`${API_BASE_URL}/farms/${id}`, {
        cache: "no-store",
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

    if (!res.ok) throw new Error(data.message || "Farm not found");

    return data.data;
}



// ================= CREATE FARM =================
export async function createFarm(data: {
    farmName: string;
    ownerUserId: number;
}) {

    const res = await authFetch(`${API_BASE_URL}/farms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify(data)
    });

    const text = await res.text();

    let result: any = {};
    if (text) {
        try {
            result = JSON.parse(text);
        } catch {
            result = { message: text };
        }
    }

    if (!res.ok) throw new Error(result.message || "Failed to create farm");

    return result.data;
}



// ================= UPDATE FARM =================
export async function updateFarm(
    id: number,
    data: {
        farmName: string;
        ownerUserId: number;
    }
) {

    const res = await authFetch(`${API_BASE_URL}/farms/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify(data)
    });

    const text = await res.text();

    let result: any = {};
    if (text) {
        try {
            result = JSON.parse(text);
        } catch {
            result = { message: text };
        }
    }

    if (!res.ok) throw new Error(result.message || "Failed to update farm");

    return result.data;
}



// ================= DELETE FARM =================
export async function deleteFarm(id: number) {

    const res = await authFetch(`${API_BASE_URL}/farms/${id}`, {
        method: "DELETE",
        headers: {
            accept: "application/json",
        }
    });

    const text = await res.text();

    let result: any = {};
    if (text) {
        try {
            result = JSON.parse(text);
        } catch {
            result = { message: text };
        }
    }

    if (!res.ok) throw new Error(result.message || "Failed to delete farm");

    revalidatePath("/superdashboard");

    return result.data;
}




// ================= FARMS COUNT =================
export async function getFarmsCount() {
    const res = await authFetch(`${API_BASE_URL}/farms/count`, {
        cache: "no-store",
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

    if (!res.ok) throw new Error(data.message || "Failed to fetch farms count");

    return data.data;
}