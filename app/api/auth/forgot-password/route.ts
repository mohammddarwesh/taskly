import { NextResponse } from "next/server";
import { apiClient } from "@/libs/api-client";

export async function POST(req: Request) {

    const REDIRECT_URL = process.env.REDIRECT_URL;
    try {
        const body = await req.json();

        await apiClient(`${process.env.BACKEND_URL}/auth/v1/recover`, {
            method: "POST",
            headers: {
                apikey: process.env.API_KEY!,
            },
            body: { ...body, redirect_to: REDIRECT_URL, redirectTo: REDIRECT_URL },
        });
        console.log("FORGOT PASSWORD_PUT ROUTE", { ...body, redirect_to: REDIRECT_URL, redirectTo: REDIRECT_URL },)
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
