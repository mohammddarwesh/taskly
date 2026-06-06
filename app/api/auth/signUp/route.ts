import { apiClient } from "@/libs/api-client";
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
        const res = NextResponse.json({
            success: true,
            user: data.user,
        });
        res.cookies.set("access_token", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(data.expires_at * 1000),
        });
        res.cookies.set("refresh_token", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: body.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
        });
        return res
    } catch (error) {
        console.error("SIGNUP_ERROR", error);
        const { msg ,code} = error as ApiError
        return NextResponse.json(
            {
                msg: msg || "Internal server error",
            },
            { status: code || 500 },
        );
    }
}
