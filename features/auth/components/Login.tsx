"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginSchema } from "../schemas/login.schema";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { getPasswordChecklistItems } from "../utils/getPasswordChecklistItems";
import PasswordChecklist from "./PasswordChecklist";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Head from "@/components/ui/Head";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiClient } from "@/libs/api-client";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit = async (data: LoginSchema) => {
    const formattedData = {
      email: data.email,
      password: data.password,
    };
    console.log("#login_form submit data", formattedData);
    try {
      const res = await apiClient("/api/auth/Login", {
        method: "POST",
        body: formattedData,
      });

      console.log("Login SUCCESS", res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="card w-full max-w-120 m-auto">
      <Head
        head="Welcome Back"
        sub="Please enter your details to access your workspace"
      />
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-6">
        {/* EMAIL */}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...form.register("email")}
          error={form.formState.errors.email?.message}
        />
        {/* PASSWORD */}
        <div className="flex grow justify-start gap-2 flex-col md:flex-row">
          <div className="relative w-full">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...form.register("password")}
              error={form.formState.errors.password?.message}
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
        </div>
        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="rounded-b-lg py-4"
        >
          Log in
        </Button>
      </form>
      <div className="flex items-center justify-center mt-8 text-sm">
        <p className="text-slate-600 ">Don&apos;t have an account?</p>
        <Link className="text-primary font-semibold ml-1" href="/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
