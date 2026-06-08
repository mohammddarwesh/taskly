"use client"
import { useCallback, useState } from 'react';
import { authService } from '../services/auth.service';


const useForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const submit = useCallback(async (email: string) => {
        try {
            setIsLoading(true);
            setError(null);
            setIsSuccess(false);

            await authService.forgotPassword(email)
            setIsSuccess(true)
            return true
        } catch (error) {
            if (process.env.NODE_ENV === "development") {
                console.error("forgot password error", error)
            }
            setError("something went wrong try again later")
            return false
        } finally {
            setIsLoading(false)
        }
    }, [])
    return { submit, isLoading, isSuccess, error }
}

export default useForgotPassword