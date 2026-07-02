import { api_key, backendURL } from "@/constants";
import { apiClient } from "@/libs/api-client";
import { setTokenCookies } from "@/libs/cookies";
import { SupaBaseAuthResponse } from "@/types";
import { ApiError } from "@/types/apiError.types";
import { NextResponse } from "next/server";

function isApiError(e: unknown): e is ApiError {
    return typeof e === "object" && e !== null && "msg" in e;
}

function resolveStatus(error: ApiError): number {
    if (typeof error.status === "number" && error.status >= 400 && error.status < 600) {
        return error.status;
    }
    return 500;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (process.env.NODE_ENV !== "production") {
            console.log("Login Body", { ...body, password: "[redacted]" });
        }

        const data = await apiClient<SupaBaseAuthResponse>(
            `${backendURL}/auth/v1/token?grant_type=password`,
            {
                method: "POST",
                headers: {
                    apikey: api_key,
                },
                body,
            }
        );
        const response = NextResponse.json({
            success: true,
            user: data.user,
        });
        setTokenCookies(response, data, body.rememberMe);
        return response;
    } catch (error) {
        console.error("LOGIN_ERROR", error);

        if (!isApiError(error)) {
            return NextResponse.json(
                { success: false, msg: "Internal server error", code: "SERVER_ERROR" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                msg: error.msg || "Internal server error",
                code: error.error_code || "SERVER_ERROR",
            },
            { status: resolveStatus(error) }
        );
    }
}