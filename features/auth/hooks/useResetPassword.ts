"use client"

import { useRouter } from "next/navigation"
import { useCallback, useRef, useState } from "react"
import { authService } from "../services/auth.service"




export const useResetPassword = (accessToken: string) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [error, setError] = useState('')
    const isSubmitting = useRef(false)


    const submit = useCallback(
        async (password: string) => {
            if (isSubmitting.current || isLoading) return
            try {
                isSubmitting.current = true
                setIsLoading(true)
                await authService.resetPassword(accessToken, password)
                setSuccessMessage("password updated successfully , you will be redirect to login page in 3 seconds")
                setTimeout(() => router.push('/login'), 3000)
            } catch {
                setError("invalid or expired Link")
            } finally {
                setIsLoading(false);
                isSubmitting.current = false;
            }
        }, [accessToken, isLoading, router]
    )
    return { submit, isLoading, successMessage, error }

}