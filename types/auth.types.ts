import { User } from "./user.types";

export type AuthState = {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}