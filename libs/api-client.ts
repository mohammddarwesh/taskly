import { ApiError } from "@/types/apiError.types"

type ApiOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    body?: Record<string, unknown>,
    headers?: Record<string, string>
}




export async function apiClient<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    console.log("apiCLient options", options.headers)
    console.log("api client data REQ", options.body)
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
    if (res.status === 204) {
        return {} as T;
    }
    const contentLength = res.headers.get("content-length");
    if (contentLength === "0") {
        return {} as T;
    }


    const data = await res.json()


    console.log("api client data RES", data)

    if (!res.ok) {
        const error: ApiError = {
            code: data.status,
            msg: data.msg || "API ERROR",
            error_code: data.error_code || "UNKNOWN_ERROR"
        }
        throw error
    }
    return data
}