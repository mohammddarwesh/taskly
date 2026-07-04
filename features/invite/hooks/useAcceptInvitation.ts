"use client";

import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { isApiError } from "@/types/apiError.types";
import { toast } from "react-toastify";

export function useAcceptInvitation() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (token: string) => {
      const res = await fetch("/api/accept-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p_token: token }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to accept invitation");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success("You have successfully joined the project!");
      if (data.project_id) {
        router.push(`/project/${data.project_id}`);
      } else {
        router.push("/projects");
      }
    },
    onError: (err) => {
      let errorMessage = "Something went wrong. Please try again.";
      if (isApiError(err)) {
        errorMessage = err.msg;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error(errorMessage);
    }
  });

  const acceptInvitation = useCallback(
    async (token: string) => {
      mutation.mutate(token);
    },
    [mutation],
  );

  const error = mutation.error
    ? isApiError(mutation.error)
      ? mutation.error.msg
      : (mutation.error as Error).message || "Something went wrong"
    : null;

  return { acceptInvitation, loading: mutation.isPending, error };
}