import { api_key, backendURL } from "@/constants/api";
import { accessTokenStr } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const accessToken = request.cookies.get(accessTokenStr)?.value;
        if (!accessToken) {
            return NextResponse.json(
                { status: 401, msg: "Not authenticated" },
                { status: 401 },
            );
        }

        const body = await request.json();
        const url = new URL(`${backendURL}/rest/v1/rpc/get_tasks_count_per_project`);

        const res = await fetch(url, {
            method: "POST",
            headers: {
                apikey: api_key!,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const error = await res.json();
            return NextResponse.json(
                { status: res.status, msg: error.message || "Failed to fetch projects" },
                { status: res.status },
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("BFF get projects count error:", error);
        return NextResponse.json(
            { status: 500, msg: "Internal server error" },
            { status: 500 },
        );
    }
}