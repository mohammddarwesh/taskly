import { api_key, backendURL } from "@/constants/api";
import { accessTokenStr } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { isApiError } from "@/types/apiError.types";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      projectId: string;
    }>;
  },
) {
  try {
    const accessToken = request.cookies.get(accessTokenStr)?.value;
    if (!accessToken) {
      return NextResponse.json(
        { status: 401, msg: "Not authenticated", error_code: "UNAUTHORIZED" },
        { status: 401 },
      );
    }

    const { projectId } = await params;
    const url = new URL(`${backendURL}/rest/v1/projects`);
    url.searchParams.set("id", `eq.${projectId}`);
    url.searchParams.set("select", "*");

    const res = await fetch(url, {
      headers: {
        apikey: api_key!,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        {
          status: res.status,
          msg: error.message || error.msg || "Failed to fetch project",
        },
        { status: res.status },
      );
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { status: 404, msg: "Project not found", error_code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("GET project error:", error);
    if (isApiError(error)) {
      return NextResponse.json(
        { status: (error as { code: number }).code || 500, msg: error.msg },
        { status: (error as { code: number }).code || 500 },
      );
    }
    return NextResponse.json(
      { status: 500, msg: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      projectId: string;
    }>;
  },
) {
  try {
    const accessToken = request.cookies.get(accessTokenStr)?.value;
    if (!accessToken) {
      return NextResponse.json(
        { status: 401, msg: "Not authenticated", error_code: "UNAUTHORIZED" },
        { status: 401 },
      );
    }

    const { projectId } = await params;
    const body = await request.json();
    const { name, description = "" } = body;

    const updateData: Record<string, string> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { status: 400, msg: "No fields to update", error_code: "BAD_REQUEST" },
        { status: 400 },
      );
    }

    const url = new URL(`${backendURL}/rest/v1/projects`);
    url.searchParams.set("id", `eq.${projectId}`);

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        apikey: api_key!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        {
          status: res.status,
          msg: error.message || "Failed to update project",
        },
        { status: res.status },
      );
    }

    const updated = await res.json();
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH project error:", error);
    if (isApiError(error)) {
      return NextResponse.json(
        { status: (error as { code: number }).code || 500, msg: error.msg },
        { status: (error as { code: number }).code || 500 },
      );
    }
    return NextResponse.json(
      { status: 500, msg: "Internal server error" },
      { status: 500 },
    );
  }
}
