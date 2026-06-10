// hooks/useUser.ts

import { useEffect, useState } from "react";
import { userService } from "@/features/auth/services/user.service";
import { User } from "@/types";

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await userService.getCurrentUser();
                setUser(data);
            } catch (err) {
                setError("Failed to load user data");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, isLoading, error };
};