import { ApiError } from "@/types/apiError.types"

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
    console.log("api client data", data.msg)

    if (!res.ok) {
        const error: ApiError = {
            code: data.code,
            msg: data.msg || "API ERROR",
            error_code: data.error_code || "UNKNOWN_ERROR"
        }
        throw error
    }
    return data
}