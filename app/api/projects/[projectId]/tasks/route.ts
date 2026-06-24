import { api_key, backendURL } from '@/constants/api';
import { accessTokenStr } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';
import { isApiError } from '@/types/apiError.types';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const accessToken = request.cookies.get(accessTokenStr)?.value;
    if (!accessToken) {
      return NextResponse.json(
        { status: 401, msg: 'Not authenticated', error_code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { projectId } = await params;
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { status: 400, msg: 'Title is required' },
        { status: 400 }
      );
    }

    const url = new URL(`${backendURL}/rest/v1/tasks`);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        apikey: api_key!,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        project_id: projectId,
        epic_id: body.epic_id || null,
        title: body.title,
        description: body.description || null,
        assignee_id: body.assignee_id || null,
        due_date: body.due_date || null,
        status: body.status || 'TO_DO',
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { status: res.status, msg: error.message || 'Failed to create task' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('BFF create task error:', error);
    if (isApiError(error)) {
      return NextResponse.json(
        { status: (error as { code: number }).code || 500, msg: error.msg },
        { status: (error as { code: number }).code || 500 }
      );
    }
    return NextResponse.json(
      { status: 500, msg: 'Internal server error' },
      { status: 500 }
    );
  }
}