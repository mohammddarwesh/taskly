"use client";
import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "forgot-password-resend";
const MAX_ATTEMPTS = 3;
const COOLDOWN_SECONDS = 300; // 5 minutes

interface CooldownState {
    attempts: number;
    expiresAt: number;
}

interface Cooldown {
    attempts: number;
    timeLeft: number;
}

const getInitialCooldown = (): Cooldown => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { attempts: 0, timeLeft: 0 };
        const state: CooldownState = JSON.parse(raw);
        const remaining = Math.max(
            0,
            Math.floor((state.expiresAt - Date.now()) / 1000),
        );
        return { attempts: state.attempts, timeLeft: remaining };
    } catch {
        return { attempts: 0, timeLeft: 0 };
    }
};

export const useResendCooldown = () => {
    const [cooldown, setCooldown] = useState<Cooldown>(getInitialCooldown);
    const { attempts, timeLeft } = cooldown;

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setCooldown((prev) => {
                const newTimeLeft = Math.max(prev.timeLeft - 1, 0);
                if (newTimeLeft === 0 && prev.attempts > 0) {
                    localStorage.removeItem(STORAGE_KEY);
                    return { attempts: 0, timeLeft: 0 };
                }
                return { ...prev, timeLeft: newTimeLeft };
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const startCooldown = useCallback(() => {
        const nextAttempts = attempts + 1;
        const expiresAt = Date.now() + COOLDOWN_SECONDS * 1000;

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                attempts: nextAttempts,
                expiresAt,
            }),
        );

        setCooldown({ attempts: nextAttempts, timeLeft: COOLDOWN_SECONDS });
    }, [attempts]);

    const isDisabled = attempts >= MAX_ATTEMPTS || timeLeft > 0;
    const remainingAttempts = MAX_ATTEMPTS - attempts;

    return {
        attempts,
        timeLeft,
        isDisabled,
        startCooldown,
        remainingAttempts,
    };
};
