import { User } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../services/user.service";
import { apiClient } from "@/libs/api-client";
import { isApiError } from "@/types/apiError.types";

export const fetchUserThunk = createAsyncThunk<User, void, { rejectValue: string }>(
    'auth/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            return await userService.getCurrentUser()
        } catch (error: unknown) {
            if (isApiError(error)) return rejectWithValue(error.msg);
            return rejectWithValue('Failed to get user data');
        }
    }
)



export const loginThunk = createAsyncThunk<User, { email: string; password: string; rememberMe: boolean }, { rejectValue: string }>(
    'auth/login',
    async ({ email, password, rememberMe }, { rejectWithValue }) => {
        try {
            const response = await apiClient<{ success: boolean; user: User }>('/api/auth/login', {
                method: "POST",
                body: { email, password, rememberMe }
            })
            if (!response.success) throw new Error('failed to login')
            return response.user
        } catch (error: unknown) {
            if (isApiError(error)) return rejectWithValue(error.msg);
            return rejectWithValue('Failed to get user data');
        }
    }
)



export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/login',
    async (_, { rejectWithValue }) => {
        try {
            await apiClient<{ success: boolean; user: User }>('/api/auth/logout', {
                method: "POST",
            })
        } catch (error: unknown) {
            if (isApiError(error)) return rejectWithValue(error.msg);
            return rejectWithValue('Failed to get user data');
        }
    }
)


