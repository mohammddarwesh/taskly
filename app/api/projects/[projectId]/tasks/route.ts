import { api_key, backendURL } from "@/constants/api";
import { accessTokenStr } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { isApiError } from "@/types/apiError.types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
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
    const { searchParams } = new URL(request.url);
    const epicId = searchParams.get("epic_id");
    const status = searchParams.get("status");
    const url = new URL(`${backendURL}/rest/v1/project_tasks`);
    url.searchParams.set("project_id", `eq.${projectId}`);

    if (epicId) {
      url.searchParams.set("epic_id", `eq.${epicId}`);
    }

    if (status) {
      url.searchParams.set("status", `eq.${status}`);
    }

    const res = await fetch(url, {
      headers: {
        apikey: api_key!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "count=exact",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { status: res.status, msg: error.message || "Failed to fetch tasks" },
        { status: res.status },
      );
    }

    const tasks = await res.json();
    const contentRange = res.headers.get("content-range");
    let total = 0;
    if (contentRange) {
      const parts = contentRange.split("/");
      total = parts.length === 2 ? parseInt(parts[1], 10) || 0 : 0;
    }

    return NextResponse.json({ data: tasks, total });
  } catch (error) {
    console.error("BFF get tasks error:", error);
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
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
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

    if (!body.title) {
      return NextResponse.json(
        { status: 400, msg: "Title is required" },
        { status: 400 },
      );
    }

    const url = new URL(`${backendURL}/rest/v1/tasks`);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: api_key!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        project_id: projectId,
        epic_id: body.epic_id || null,
        title: body.title,
        description: body.description || null,
        assignee_id: body.assignee_id || null,
        due_date: body.due_date || null,
        status: body.status || "TO_DO",
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { status: res.status, msg: error.message || "Failed to create task" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("BFF create task error:", error);
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
