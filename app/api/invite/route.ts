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
    const { p_email, p_project_id } = body;

    if (!p_email || !p_project_id) {
      return NextResponse.json(
        { status: 400, msg: "Missing required fields" },
        { status: 400 },
      );
    }

    // SECURITY: Trust server origin
    const appUrl = new URL(request.url).origin;
    const baseUrl = backendURL;

    const url = new URL(`${backendURL}/rest/v1/rpc/invite_member`);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: api_key!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_email,
        p_project_id,
        p_app_url: appUrl,
        p_base_url: baseUrl,
      }),
    });

    // --- FIX: Handle empty responses safely ---
    if (!res.ok) {
      let errorMsg = "Failed to send invitation";
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

    const contentLength = res.headers.get("content-length");
    if (res.status === 204 || contentLength === "0") {
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
    console.error("BFF invite error:", error);
    return NextResponse.json(
      { status: 500, msg: "Internal server error" },
      { status: 500 },
    );
  }
}
