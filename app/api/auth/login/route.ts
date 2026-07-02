import { api_key, backendURL } from "@/constants";
import { apiClient } from "@/libs/api-client";
import { setTokenCookies } from "@/libs/cookies";
import { SupaBaseAuthResponse } from "@/types";
import { ApiError } from "@/types/apiError.types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Login Body", body);

        const data = await apiClient<SupaBaseAuthResponse>(
            `${backendURL}/auth/v1/token?grant_type=password`,
            {
                method: "POST",
                headers: {
                    apikey: api_key,
                },
                body,
            },
        );
        const response = NextResponse.json({
            success: true,
            user: data.user,
        });
        setTokenCookies(response, data, body.rememberMe);
        return response
    } catch (error) {
        console.error("LOGIN_ERROR", error);
        const { msg, code, error_code } = error as ApiError
        return NextResponse.json(
            {
                success: false,
                msg: msg || "Internal server error",
                code: code || "SERVER_ERROR",
            },
            {
                status: +error_code || 500,
            },
        );
    }
}
