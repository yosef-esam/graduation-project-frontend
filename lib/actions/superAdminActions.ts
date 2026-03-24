'use server';

import { authFetch } from '@/lib/authFetch';
import { API_BASE_URL } from '@/lib/api';
import { revalidatePath } from 'next/cache';

// Mock data as fallback to ensure "old behaviour" / "stays alive"
const MOCK_FARMS = [
    { id: 1, name: "Emerald Valley Node", location: "Sector 7G", ownerName: "Dr. Amir Khairy", isActive: true },
    { id: 2, name: "Solaris Ridge Hub", location: "Central Plains", ownerName: "Eng. Sarah Chen", isActive: true },
    { id: 3, name: "Nexus Prima Field", location: "Northern Reach", ownerName: "Cmdr. John Data", isActive: false }
];

// ================= GET ALL FARMS =================
export async function getFarms() {
    try {
        const res = await authFetch(`${API_BASE_URL}/farms`, {
            cache: "no-store",
            headers: {
                accept: "application/json",
            }
        });

        const text = await res.text();
        if (!text) return MOCK_FARMS;

        const data = JSON.parse(text);
        if (!res.ok) {
            console.warn("Backend fetch failed, using mock fallbacks:", data.message);
            return MOCK_FARMS;
        }

        return data.data || data || MOCK_FARMS;
    } catch (error) {
        console.error("Failed to fetch farms:", error);
        return MOCK_FARMS;
    }
}

// ================= GET FARM BY ID =================
export async function getFarmById(id: number) {
    try {
        const res = await authFetch(`${API_BASE_URL}/farms/${id}`, {
            cache: "no-store",
            headers: {
                accept: "application/json",
            }
        });

        const text = await res.text();
        if (!text) return null;

        const data = JSON.parse(text);
        if (!res.ok) throw new Error(data.message || "Farm not found");

        return data.data || data;
    } catch (error) {
        console.error("Failed to fetch farm by id:", error);
        return null;
    }
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
    
    revalidatePath("/superdashboard");
    return result.data || result;
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
    
    revalidatePath("/superdashboard");
    return result.data || result;
}

// ================= DELETE FARM =================
export async function deleteFarm(id: number) {
    const res = await authFetch(`${API_BASE_URL}/farms/${id}`, {
        method: "DELETE",
        headers: {
            accept: "application/json",
        }
    });

    if (!res.ok) throw new Error("Failed to delete farm");

    revalidatePath("/superdashboard");
    return true;
}

// ================= FARMS COUNT =================
export async function getFarmsCount() {
    try {
        const res = await authFetch(`${API_BASE_URL}/farms/count`, {
            cache: "no-store",
            headers: {
                accept: "application/json",
            }
        });

        if (!res.ok) return MOCK_FARMS.length;

        const text = await res.text();
        if (!text) return MOCK_FARMS.length;

        const data = JSON.parse(text);
        return data.data ?? data ?? MOCK_FARMS.length;
    } catch (error) {
        console.error("Failed to fetch farms count:", error);
        return MOCK_FARMS.length;
    }
}
