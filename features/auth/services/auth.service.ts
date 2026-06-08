import { apiClient } from "@/libs/api-client"
const REDIRECT_URL = process.env.REDIRECT_URL;
export const authService = {
    forgotPassword: async (email: string) => {
        const response = await apiClient("/api/auth/forgot-password", { body: { email, redirect_to: REDIRECT_URL }, method: "POST" })
        return response
    },
    resetPassword: async (accessToken: string, password: string) => {
        const response = await apiClient("/api/auth/reset-password", {
            method: "PUT",
            body: {
                access_token: accessToken, password
            }
        })
        return response
    }
}