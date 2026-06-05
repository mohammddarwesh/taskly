
type ApiOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    body?: Record<string, unknown>,
    headers?: Record<string, string>
}




export async function apiClient<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    console.log("apiCLient options", options.headers)
    const res = await fetch(endpoint,
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