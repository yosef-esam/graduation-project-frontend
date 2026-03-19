import { cookies } from "next/headers";

export async function authFetch(url: string, options: RequestInit = {}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    console.log(token)

    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
            ...(options.headers || {}),
        },
    });

    return res;
}