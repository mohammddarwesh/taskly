import { apiClient } from "@/libs/api-client";
import { User } from "@/types";

export const userService = {
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient<User>("/api/auth/user", {
            method: "GET"
        })
        return response
    }
}