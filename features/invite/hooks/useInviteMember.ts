"use client";

import { isApiError } from "@/types/apiError.types";
import { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";

type Props = {
  onSuccess?: () => void;
  onError?: () => void;
};

export function useInviteMember({ onSuccess, onError }: Props = {}) {
  const [loading, setLoading] = useState(false);
  const isSubmitting = useRef(false);

  const inviteMember = useCallback(
    async (email: string, projectId: string) => {
      if (isSubmitting.current) return;
      isSubmitting.current = true;
      setLoading(true);

      try {
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

        toast.success("Invitation sent successfully!");
        onSuccess?.();
      } catch (err) {
        let errorMessage = "Something went wrong. Please try again.";
        if (isApiError(err)) {
          errorMessage = err.msg;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        toast.error(errorMessage);
        onError?.();
      } finally {
        setLoading(false);
        isSubmitting.current = false;
      }
    },
    [onSuccess, onError],
  );

  return { inviteMember, loading };
}
