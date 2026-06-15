import { api_key, backendURL } from '@/constants/api';
import { accessTokenStr } from '@/constants';
import { apiClient } from '@/libs/api-client';
import { NextRequest, NextResponse } from 'next/server';
import { isApiError } from '@/types/apiError.types';


export async function POST(request: NextRequest) {

    try {
        const accessToken = request.cookies.get(accessTokenStr)?.value
        if (!accessToken) {
            return NextResponse.json(
                {
                    status: 401,
                    msg: "Not authenticated",
                    error_code: "UNAUTHORIZED"
                },
                { status: 401 }
            );
        }

        const { name, description = "" } = await request.json()
        const response = await apiClient(`${backendURL}/rest/v1/projects`, {
            method: "POST",
            headers: {
                apikey: api_key,
                Authorization: `Bearer ${accessToken}`
            },
            body: {
                name, description
            }
        })

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error('BFF create project error:', error);
        if (isApiError(error)) {
            return NextResponse.json(
                { error: error.msg },
                { status: (error as { code: number }).code }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}



export async function GET(request: NextRequest) {
    try {
        const accessToken = request.cookies.get(accessTokenStr)?.value;
        if (!accessToken) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url)
        const limit = searchParams.get('limit') || '10'
        const offset = searchParams.get('offset') || '0'
        const url = new URL(`${backendURL}/rest/v1/rpc/get_projects`);

        url.searchParams.set('limit', limit)
        url.searchParams.set('offset', offset)


        const res = await fetch(url, {
            method: 'GET',
            headers: {
                apikey: api_key!,
                Authorization: `Bearer ${accessToken}`,
                Prefer: 'count=exact',
            },
        });

        if (!res.ok) {
            const error = await res.json();
            return NextResponse.json(
                { error: error.message || 'Failed to fetch projects' },
                { status: res.status }
            );
        }

        const projects = await res.json();

        const contentRange = res.headers.get('content-range');
        let total = 0;
        if (contentRange) {
            const parts = contentRange.split('/');
            total = parts.length === 2 ? parseInt(parts[1], 10) || 0 : 0;
        }

        return NextResponse.json({ data: projects, total });
    } catch (error) {
        console.error('BFF get projects error:', error);
        if (isApiError(error)) {
            return NextResponse.json(
                { error: error.msg },
                { status: (error as { code: number }).code }
            );
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}