"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { isApiError } from "@/types/apiError.types";
import { toast } from "react-toastify";

export function useAcceptInvitation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSubmitting = useRef(false);
  const router = useRouter();

  const acceptInvitation = useCallback(
    async (token: string) => {
      if (isSubmitting.current) return;
      isSubmitting.current = true;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/accept-invitation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ p_token: token }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || "Failed to accept invitation");
        }

        toast.success("You have successfully joined the project!");

        if (data.project_id) {
          router.push(`/project/${data.project_id}`);
        } else {
          router.push("/projects");
        }
      } catch (err) {
        let errorMessage = "Something went wrong. Please try again.";
        if (isApiError(err)) {
          errorMessage = err.msg;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
        isSubmitting.current = false;
      }
    },
    [router]
  );

  return { acceptInvitation, loading, error };
}