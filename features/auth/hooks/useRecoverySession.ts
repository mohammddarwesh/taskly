"use client";
import { useEffect, useState } from "react";

type RecoverySession = {
    accessToken: string | null;
    isValidRecovery: boolean;
    isLoading: boolean;
};

const getSessionFromHash = (): Omit<RecoverySession, "isLoading"> => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get("access_token");
    const type = params.get("type");
    return { accessToken, isValidRecovery: type === "recovery" && !!accessToken };
};

export const useRecoverySession = (): RecoverySession => {
    const [session, setSession] = useState<RecoverySession>({
        accessToken: null,
        isValidRecovery: false,
        isLoading: true,
    });

    useEffect(() => {
        const handleHashChange = () => {
            setSession({ ...getSessionFromHash(), isLoading: false });
        };

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    return session;
};