import { api_key, backendURL } from '@/constants/api';
import { accessTokenStr } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';
import { isApiError } from '@/types/apiError.types';

export async function POST(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const accessToken = request.cookies.get(accessTokenStr)?.value;
    if (!accessToken) {
      return NextResponse.json(
        { status: 401, msg: 'Not authenticated', error_code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { projectId } = params;
    const body = await request.json();

    // Validate required fields
    if (!body.title) {
      return NextResponse.json(
        { status: 400, msg: 'Title is required' },
        { status: 400 }
      );
    }

    const url = new URL(`${backendURL}/rest/v1/epics`);

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
        title: body.title,
        description: body.description || '',
        assignee_id: body.assignee_id || null,
        deadline: body.deadline || null,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json(
        { status: res.status, msg: error.message || 'Failed to create epic' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('BFF create epic error:', error);
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