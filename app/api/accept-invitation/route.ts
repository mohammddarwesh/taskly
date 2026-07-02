import { api_key, backendURL } from "@/constants/api";
import { accessTokenStr } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.cookies.get(accessTokenStr)?.value;
    if (!accessToken) {
      return NextResponse.json(
        { status: 401, msg: "Not authenticated", error_code: "UNAUTHORIZED" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { p_token } = body;

    if (!p_token) {
      return NextResponse.json(
        { status: 400, msg: "Missing invitation token" },
        { status: 400 },
      );
    }

    const url = new URL(`${backendURL}/rest/v1/rpc/accept_invitation`);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: api_key!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_token }),
    });

    if (!res.ok) {
      let errorMsg = "Failed to accept invitation";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorData.msg || errorMsg;
      } catch {
        errorMsg = res.statusText || errorMsg;
      }
      return NextResponse.json(
        { status: res.status, msg: errorMsg },
        { status: res.status },
      );
    }

    if (res.status === 204) {
      return NextResponse.json({ success: true });
    }

    const contentLength = res.headers.get("content-length");
    if (contentLength === "0") {
      return NextResponse.json({ success: true });
    }

    let data = {};
    try {
      data = await res.json();
    } catch {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("BFF accept error:", error);
    return NextResponse.json(
      { status: 500, msg: "Internal server error" },
      { status: 500 },
    );
  }
}
