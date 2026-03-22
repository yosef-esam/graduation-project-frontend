'use server';

import { API_BASE_URL } from "../lib/api";
import { authFetch } from "../lib/authFitch";
/////////////////////////////////////////////////////
// Get Paginated Users
/////////////////////////////////////////////////////
export async function getUsersPaginatedAction(page = 1, pageSize = 20) {
    const res = await authFetch(
        `${API_BASE_URL}/users/paginated?page=${page}&pageSize=${pageSize}`,
        {
            method: "GET",
            cache: "no-store",
        }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to fetch users");

    return data.data;
}

/////////////////////////////////////////////////////
// Get User By Id
/////////////////////////////////////////////////////
export async function getUserByIdAction(id: string) {
    const res = await authFetch(`${API_BASE_URL}/users/${id}`, {
        method: "GET",
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to fetch user");

    return data;
}

/////////////////////////////////////////////////////
// Create User
/////////////////////////////////////////////////////
export async function createUserAction(userData: any) {
    const res = await authFetch(`${API_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to create user");

    return data;
}

/////////////////////////////////////////////////////
// Create Worker
/////////////////////////////////////////////////////
export async function createWorkerAction(workerData: any) {
    const res = await authFetch(`${API_BASE_URL}/workers`, {
        method: "POST",
        body: JSON.stringify(workerData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to create worker");

    return data;
}

/////////////////////////////////////////////////////
// Update User
/////////////////////////////////////////////////////
export async function updateUserAction(id: string, userData: any) {
    const res = await authFetch(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to update user");

    return data;
}

/////////////////////////////////////////////////////
// Delete User
/////////////////////////////////////////////////////
export async function deleteUserAction(id: string) {
    const res = await authFetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete user");
    }

    return { success: true };
}

/////////////////////////////////////////////////////
// Change Password
/////////////////////////////////////////////////////
export async function changePasswordAction(id: string, passwordData: any) {
    const res = await authFetch(
        `${API_BASE_URL}/users/changePassword/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(passwordData),
        }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to change password");

    return data;
}