"use client";

import { isApiError } from "@/types/apiError.types";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "react-toastify";

type Props = {
  onSuccess?: () => void;
  onError?: () => void;
};

export function useInviteMember({ onSuccess, onError }: Props = {}) {
  const mutation = useMutation({
    mutationFn: async ({ email, projectId }: { email: string; projectId: string }) => {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          p_email: email,
          p_project_id: projectId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to send invitation");
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Invitation sent successfully!");
      onSuccess?.();
    },
    onError: (err) => {
      let errorMessage = "Something went wrong. Please try again.";
      if (isApiError(err)) {
        errorMessage = err.msg;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast.error(errorMessage);
      onError?.();
    }
  });

  const inviteMember = useCallback(
    async (email: string, projectId: string) => {
      mutation.mutate({ email, projectId });
    },
    [mutation],
  );

  return { inviteMember, loading: mutation.isPending };
}
