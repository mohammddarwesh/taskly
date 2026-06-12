import { NextResponse } from "next/server";
import { apiClient } from "@/libs/api-client";
import { api_key, backendURL } from "@/constants";

export async function POST(req: Request) {

    const REDIRECT_URL = process.env.REDIRECT_URL;
    try {
        const { email } = await req.json();

        await apiClient(
            `${backendURL}/auth/v1/recover?redirect_to=${encodeURIComponent(REDIRECT_URL!)}`,
            {
                method: "POST",
                headers: { apikey: api_key },
                body: { email },
            }
        );
        console.log("FORGOT PASSWORD_PUT ROUTE", { email, redirect_to: REDIRECT_URL, redirectTo: REDIRECT_URL },)
        return NextResponse.json({
            success: true,
            message:
                "If an account exists with this email, we’ve sent a password reset link.",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message:
                    "If an account exists with this email, we’ve sent a password reset link.",
            },
            { status: 200 },
        );
    }
}
