'use server';

import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api";
import { authFetch } from "@/lib/authFetch";

const safeParse = async (res: Response) => {
    const text = await res.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return { message: text };
    }
};

/////////////////////////////////////////////////////
// Get Users
/////////////////////////////////////////////////////
export async function getUsersPaginatedAction() {
    try {
        const res = await authFetch(`${API_BASE_URL}/users`, {
            method: "GET",
            cache: "no-store",
            headers: { accept: "application/json" }
        });

        const data = await safeParse(res);
        if (!res.ok) return []; // Fallback to empty list

        return data?.data || [];
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}

/////////////////////////////////////////////////////
// Get User By Id
/////////////////////////////////////////////////////
export async function getUserByIdAction(id: string | number) {
    try {
        const res = await authFetch(`${API_BASE_URL}/users/${id}`, {
            method: "GET",
            cache: "no-store",
        });

        const data = await safeParse(res);
        if (!res.ok) throw new Error(data?.message || "Failed to fetch user");

        if (data?.data?.userRole) {
            const cookieStore = await cookies();
            cookieStore.set("userRole", data.data.userRole, {
                httpOnly: true,
                secure: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            });
        }

        return data;
    } catch (error) {
        console.error("Failed to get user by id:", error);
        return null;
    }
}

/////////////////////////////////////////////////////
// Create User
/////////////////////////////////////////////////////
export async function createUserAction(userData: any) {
    const res = await authFetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    const data = await safeParse(res);
    if (!res.ok) throw new Error(data?.message || "Failed to create user");

    return data;
}

/////////////////////////////////////////////////////
// Create Worker
/////////////////////////////////////////////////////
export async function createWorkerAction(workerData: any) {
    const res = await authFetch(`${API_BASE_URL}/workers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workerData),
    });

    const data = await safeParse(res);
    if (!res.ok) throw new Error(data?.message || "Failed to create worker");

    return data;
}

/////////////////////////////////////////////////////
// Update User
/////////////////////////////////////////////////////
export async function updateUserAction(id: string | number, userData: any) {
    const res = await authFetch(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    const data = await safeParse(res);
    if (!res.ok) throw new Error(data?.message || "Failed to update user");

    return data;
}

/////////////////////////////////////////////////////
// Delete User
/////////////////////////////////////////////////////
export async function deleteUserAction(id: string | number) {
    const res = await authFetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const data = await safeParse(res);
        throw new Error(data?.message || "Failed to delete user");
    }

    return { success: true };
}

/////////////////////////////////////////////////////
// Change Password
/////////////////////////////////////////////////////
export async function changePasswordAction(id: string | number, passwordData: any) {
    const res = await authFetch(`${API_BASE_URL}/users/changePassword/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
    });

    const data = await safeParse(res);
    if (!res.ok) throw new Error(data?.message || "Failed to change password");

    return data;
}
