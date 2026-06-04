
type ApiOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    body?: Body,
    headers?: Record<string, string>
}


const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL


export async function apiCLient<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`,
        {
            method: options.method || "GET",
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            body: options.body ? JSON.stringify(options.body) : undefined
        },
    )
    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "API Error")
    }
    return data
}