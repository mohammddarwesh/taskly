import { User } from '@/types/user.types';
import { AuthState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserThunk, loginThunk, logoutThunk } from "./auth.thunks";
import { stat } from 'fs';

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};



const authSlice = createSlice({
    name: 'auth', initialState, reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserThunk.pending, (state) => {
            state.isLoading = true
            state.error = null
        }).addCase(fetchUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false
            state.user = action.payload
        }).addCase(fetchUserThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })
        builder.addCase(loginThunk.pending, (state) => {
            state.isLoading = true
            state.error = null
        }).addCase(loginThunk.fulfilled, (state, action: PayloadAction<User>) => {
            state.isLoading = false
            state.user = action.payload
        }).addCase(loginThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
        })

        builder.addCase(logoutThunk.fulfilled, (state) => {
            state.user = null
            state.isLoading = false
            state.error = null
        })
    }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer