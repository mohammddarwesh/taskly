import { NextResponse } from "next/server";
import { apiClient } from "@/libs/api-client";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        await apiClient(
            `${process.env.BACKEND_BASEURL}/auth/v1/recover`,
            {
                method: "POST",
                headers: {
                    apikey: process.env.API_KEY!,
                    "Content-Type": "application/json",
                },
                body,
            }
        );

        return NextResponse.json({
            success: true,
            message:
                "If an account exists with this email, we’ve sent a password reset link.",
        });
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message: "Failed to send reset email",
            },
            { status: 400 }
        );
    }
}