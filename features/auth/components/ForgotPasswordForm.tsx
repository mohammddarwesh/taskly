"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Head from "@/components/ui/Head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "../schemas/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [cooldown, setCooldown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [sent, setSent] = useState(false);
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  const MAX_ATTEMPTS = 3;

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setSent(false);
    await fetch("/api/auth/recover", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email }),
    });

    setAttempts((p) => p + 1);
    setCooldown(300); // 5 minutes
    setSent(true);
  };

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);
  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="card flex flex-col gap-4 m-auto">
      <Head
        head="Forgot password?"
        sub="No worries, we'll send you reset instructions."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...form.register("email")}
          error={errors.email?.message}
        />
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={isSubmitting || cooldown > 0 || attempts >= MAX_ATTEMPTS}
          className="rounded-b-lg py-4"
        >
          Send Reset Link
        </Button>
        {sent && (
          <p className="p-4 rounded-lg text-sm bg-[#82F9BE33] text-[#005235]">
            <Image
              src="/icons/checked.svg"
              width={20}
              height={20}
              alt="checked"
              className="inline-block"
            />{" "}
            If an account exists with this email, we’ve sent a reset link.
          </p>
        )}
        {cooldown > 0 && (
          <p className="text-sm">Try again in: {formatTime(cooldown)}</p>
        )}
        {attempts >= MAX_ATTEMPTS && (
          <p className="text-red-500 text-sm">Max attempts reached</p>
        )}
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
