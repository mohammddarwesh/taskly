import { api_key, backendURL } from "@/constants/api";
import { accessTokenStr } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; taskId: string }> },
) {
  try {
    const accessToken = request.cookies.get(accessTokenStr)?.value;
    if (!accessToken) {
      return NextResponse.json(
        { status: 401, msg: "Not authenticated" },
        { status: 401 },
      );
    }

    const { taskId } = await params;
    const body = await request.json();

    const url = new URL(`${backendURL}/rest/v1/tasks?id=eq.${taskId}`);
    const res = await fetch(url, {
      method: "PATCH",
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
        { status: res.status, msg: error.message || "Failed to update task" },
        { status: res.status },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BFF PATCH task error:", error);
    return NextResponse.json(
      { status: 500, msg: "Internal server error" },
      { status: 500 },
    );
  }
}