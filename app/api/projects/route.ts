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

        const projects = await apiClient(`${backendURL}/rest/v1/rpc/get_projects`, {
            method: 'GET',
            headers: {
                apikey: api_key!,
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return NextResponse.json(projects);
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