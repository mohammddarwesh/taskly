import { apiClient } from "@/libs/api-client";
import { SupaAuthResponse } from "@/types";
import { cookies } from "next/headers";
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
        return NextResponse.json(
            {
                message: "Internal server error",
            },
            { status: 500 },
        );
    }
}
