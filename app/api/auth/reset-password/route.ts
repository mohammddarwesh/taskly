import { api_key, backendURL } from "@/constants";
import { apiClient } from "@/libs/api-client";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {

    try {
        const { access_token, password } = await request.json()

        if (!access_token) {
            return NextResponse.json(

                {
                    success: false,
                    message: "Access token is required"
                },
                { status: 400 }
            )
        }

        await apiClient(`${backendURL}/"auth/v1/user"`, {
            method: "PUT",
            headers: {
                apikey: api_key,
                Authorization: `Bearer ${access_token}`
            },
            body: { password }
        })
        return NextResponse.json({
            success: true, message: "Password updated successfully"
        })
    } catch (error) {
        console.error("RESET_PASSWORD_ERROR", error)
        return NextResponse.json(
            {
                success: false,
                message: "invalid or expired link"
            }, {
            status: 400
        }
        )
    }
}