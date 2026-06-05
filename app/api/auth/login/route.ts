import { apiClient } from "@/libs/api-client";
import { SupaAuthResponse } from "@/types";
import { ApiError } from "@/types/apiError.types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apikey = process.env.API_KEY;
    try {
        const body = await request.json();
        console.log("sign up Body", body);

        const data = await apiClient<SupaAuthResponse>(
            `${baseurl}/auth/v1/token?grant_type=password`,
            {
                method: "POST",
                headers: {
                    apikey: apikey!,
                },
                body,
            },
        );
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
        res.cookies.set("refresh_token", data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: body.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
        });
        return res
    } catch (error) {
        console.error("LOGIN_ERROR", error);
        const { message, code, status } = error as ApiError
        return NextResponse.json(
            {
                success: false,
                message: message || "Internal server error",
                code: code || "SERVER_ERROR",
            },
            {
                status: status || 500,
            },
        );
    }
}
