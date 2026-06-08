"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Head from "@/components/ui/Head";
import PasswordChecklist from "./PasswordChecklist";

import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { getPasswordChecklistItems } from "../utils/getPasswordChecklistItems";
import { apiClient } from "@/libs/api-client";

import {
  confirmPasswordSchema,
  type ConfirmPasswordSchema,
} from "../schemas/confirm-password.schema";
import { useResetPassword } from "../hooks/useResetPassword";
import { toast } from "react-toastify";

type ResetPasswordFormProps = {
  accessToken: string;
};

export function ResetPasswordForm({ accessToken }: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { submit, isLoading, successMessage, error } =
    useResetPassword(accessToken);

  const router = useRouter();

  const form = useForm<ConfirmPasswordSchema>({
    resolver: zodResolver(confirmPasswordSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const password = useWatch({ control, name: "password" });
  const rules = usePasswordValidation(password || "");
  const items = getPasswordChecklistItems(rules);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: ConfirmPasswordSchema) => {
    try {
      await submit(data.password);
      toast.success(successMessage ||"password updated successfully , you will be redirect to login page in 3 seconds");
    } catch {
      toast.error(error);
    }
  };

  return (
    <div className="card max-w-xl m-auto">
      <Head head="Reset your password" sub="Enter your new password below." />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex grow justify-start gap-2 flex-col md:flex-row">
          <div className="relative w-full">
            <Input
              label="New Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              {...register("password")}
              error={errors.password?.message}
              icon={
                <Image
                  src={showPassword ? "/icons/eyeOff.svg" : "/icons/eye.svg"}
                  width={22}
                  height={15}
                  alt="showPassword"
                  onClick={toggleShowPassword}
                  className="cursor-pointer"
                />
              }
            />
          </div>

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>

        <PasswordChecklist items={items} />

        {successMessage && (
          <p className="p-4 rounded-lg text-sm bg-[#82F9BE33] text-[#005235]">
            {successMessage}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting || isLoading}
          disabled={isSubmitting}
          className="rounded-b-lg py-4"
        >
          Reset Password
        </Button>
      </form>

      <div className="flex items-center justify-center mt-8 text-sm">
        <p className="text-slate-600">Back to</p>
        <Link className="text-primary font-semibold ml-1" href="/login">
          Log in
        </Link>
      </div>
    </div>
  );
}
