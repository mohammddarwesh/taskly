"use client"
import { useEffect, useState } from "react";
import { userService } from "@/features/auth/services/user.service";
import { User } from "@/types";

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await userService.getCurrentUser();
                setUser(data);
            } catch (err) {
                setError("Failed to load user data");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { user, isLoading, error };
};