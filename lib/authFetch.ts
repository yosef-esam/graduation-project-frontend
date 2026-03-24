import { cookies } from "next/headers";

export async function authFetch(url: string, options: RequestInit = {}) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
        
        // Attempt fetch with provided options and default headers
        const res = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(options.headers || {}),
            },
        });

        return res;
    } catch (error) {
        console.error(`[authFetch] Network error for ${url}:`, error);
        throw error; // Re-throw to be caught by the action's try-catch
    }
}
