import { apiClient } from "@/libs/api-client";
import { setTokenCookies } from "@/libs/cookies";
import { SupaAuthResponse } from "@/types";
import { ApiError } from "@/types/apiError.types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const backendURL = process.env.BACKEND_URL
    const api_key = process.env.API_KEY;
    try {
        const body = await request.json();
        console.log("sign up Body", body);

        const data = await apiClient<SupaAuthResponse>(`${backendURL}/auth/v1/signup`, {
            method: "POST",
            headers: {
                apikey: api_key!,
            },
            body,
        });
        const response = NextResponse.json({
            success: true,
            user: data.user,
        });
        setTokenCookies(response, data, body.rememberMe);
        return response
    } catch (error) {
        console.error("SIGNUP_ERROR", error);
        const { msg, code } = error as ApiError
        return NextResponse.json(
            {
                msg: msg || "Internal server error",
            },
            { status: code || 500 },
        );
    }
}
