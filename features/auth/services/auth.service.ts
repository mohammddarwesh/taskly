import { apiClient } from "@/libs/api-client"

export const authService = {
    forgotPassword: async (email: string) => {
        const response = await apiClient("/auth/forgot-password", { body: { email }, method: "POST" })
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