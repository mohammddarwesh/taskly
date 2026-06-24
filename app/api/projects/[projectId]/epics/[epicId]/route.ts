import { api_key, backendURL } from "@/constants/api";
import { accessTokenStr } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { isApiError } from "@/types/apiError.types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string; epicId: string }> }
) {
  try {
    const accessToken = request.cookies.get(accessTokenStr)?.value;
    if (!accessToken) {
      return NextResponse.json(
        { status: 401, msg: "Not authenticated", error_code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const { projectId, epicId } = await params;
    const body = await request.json();

    const url = new URL(`${backendURL}/rest/v1/epics`);
    url.searchParams.set("id", `eq.${epicId}`);
    url.searchParams.set("project_id", `eq.${projectId}`);

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        apikey: api_key!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        {
          status: res.status,
          msg: error.message || "Failed to update epic",
        },
        { status: res.status }
      );
    }

    const updated = await res.json();
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH epic error:", error);
    if (isApiError(error)) {
      return NextResponse.json(
        { status: (error as { code: number }).code || 500, msg: error.msg },
        { status: (error as { code: number }).code || 500 }
      );
    }
    return NextResponse.json(
      { status: 500, msg: "Internal server error" },
      { status: 500 }
    );
  }
}