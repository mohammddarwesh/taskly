"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/Input";
import Image from "next/image";
import { useInviteMember } from "@/features/invite/hooks/useInviteMember";
import { InviteMemberHeader } from "./InviteMemberHeader";
import { InviteMemberFooter } from "./InviteMemberFooter";

const inviteSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

type InviteFormData = z.infer<typeof inviteSchema>;

type Props = {
  projectId: string;
  onClose: () => void;
};

export function InviteMemberForm({ projectId, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  const { inviteMember } = useInviteMember({
    onSuccess: () => {
      reset();
      onClose();
    },
  });

  const onSubmit = (data: InviteFormData) => {
    inviteMember(data.email, projectId);
  };

  return (
    <div className="p-8 flex flex-col gap-6">
      <InviteMemberHeader onClose={onClose} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          {...register("email")}
          error={errors.email?.message}
          icon={
            <Image
              src="/icons/mail.svg"
              width={20}
              height={20}
              alt="Email"
              className="opacity-40"
            />
          }
        />
        <InviteMemberFooter isSubmitting={isSubmitting} onClose={onClose} />
      </form>
    </div>
  );
}
