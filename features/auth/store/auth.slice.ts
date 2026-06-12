import { User } from '@/types/user.types';
import { AuthState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserThunk, loginThunk, logoutThunk } from "./auth.thunks";

const initialState: AuthState = {
    user: null,
    isLoading: false,
    isInitialized: false,
    error: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // Handle fetchUserThunk
        builder
            .addCase(fetchUserThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserThunk.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.isInitialized = true;
            })

            .addCase(fetchUserThunk.rejected, (state) => {
                state.user = null;
                state.isLoading = false;
                state.isInitialized = true;
            })

        // Handle loginThunk
        builder
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // Handle logoutThunk
        builder
            .addCase(logoutThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;