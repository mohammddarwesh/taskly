import { api_key, backendURL } from "@/constants/api";
import { accessTokenStr } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { isApiError } from "@/types/apiError.types";
import { SupabaseMember } from "@/types";
import { ProjectMember } from "@/features/projects/types/project.types";

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

    const url = new URL(`${backendURL}/rest/v1/get_project_members`);
    url.searchParams.set("project_id", `eq.${projectId}`);

    const res = await fetch(url, {
      headers: {
        apikey: api_key!,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { status: res.status, msg: error.message || "Failed to fetch members" },
        { status: res.status },
      );
    }

    const data = (await res.json()) as SupabaseMember[];
    console.log("members data", data);
    const members: ProjectMember[] = data.map((item) => ({
      id: item.user_id,
      name: item.metadata?.name || "Unknown",
      email: item.email,
      role: item.role
        ? item.role.charAt(0).toUpperCase() + item.role.slice(1)
        : "Member",
      avatar_url: item.avatar_url || null,
    }));
    console.log("members ", members);

    return NextResponse.json(members);
  } catch (error) {
    console.error("BFF get project members error:", error);
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
