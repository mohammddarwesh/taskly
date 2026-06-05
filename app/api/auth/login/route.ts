import { apiCLient } from "@/libs/api-client";
import { SupaAuthResponse } from "@/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const baseurl = process.env.NEXT_PUBLIC_BACKEND_BASEURL;
    const apikey = process.env.API_KEY;
    try {
        const body = await request.json();
        console.log("sign up Body", body);

        const data = await apiCLient<SupaAuthResponse>(`${baseurl}/auth/v1/signup`, {
            method: "POST",
            headers: {
                apikey: apikey!,
            },
            body,
        });
        (await cookies()).set("accessToken", data.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            expires: new Date(data.expires_at * 1000)
        })

            ; (await cookies()).set("refresh_token", data.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",

            })
        return NextResponse.json(data);
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
