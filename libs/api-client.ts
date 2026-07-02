import { ApiError } from "@/types/apiError.types";

type ApiOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
};

const SENSITIVE_KEYS = new Set(["password", "access_token", "refresh_token", "apikey"]);

function redact(obj: Record<string, unknown> | undefined) {
    if (!obj) return obj;
    const clone: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
        clone[key] = SENSITIVE_KEYS.has(key) ? "[redacted]" : value;
    }
    return clone;
}

export async function apiClient<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    if (process.env.NODE_ENV !== "production") {
        console.log("apiClient request", {
            endpoint,
            method: options.method || "GET",
            body: redact(options.body),
        });
    }

    const res = await fetch(endpoint, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (res.status === 204) {
        return {} as T;
    }

    const contentLength = res.headers.get("content-length");
    if (contentLength === "0") {
        return {} as T;
    }

    const data = await res.json();

    if (process.env.NODE_ENV !== "production") {
        console.log("apiClient response", { status: res.status, data: redact(data) });
    }

    if (!res.ok) {
        const error: ApiError = {
            code: data.status,
            msg: data.msg || "API ERROR",
            error_code: data.error_code || "UNKNOWN_ERROR",
            status: res.status,
        };
        throw error;
    }

    return data;
}