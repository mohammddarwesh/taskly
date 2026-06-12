import { accessTokenStr, api_key, backendURL } from "@/constants";
import { apiClient } from "@/libs/api-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try {
        const accessToken = request.cookies.get(accessTokenStr)?.value;

        if (!accessToken) {
            return NextResponse.json({
                error: "Unautharized"
            },
                { status: 401 })
        }
        const data = await apiClient(`${backendURL}/auth/v1/user`, {
            method: "GET",
            headers: {
                apiKey: api_key,
                Authorization: `Bearer ${accessToken}`
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
    }
}