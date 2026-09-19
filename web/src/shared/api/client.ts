import {API_URL} from "@shared/const";

export async function apiClient<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const headers = new Headers(options.headers);
    headers.set("Accept", "application/json");

    const response = await fetch(
        `${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`,
        {
            ...options,
            headers,
        },
    );

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}: ${response.statusText}`,
        );
    }

    return response.json() as Promise<T>;
}