"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginSchema } from "../schemas/login.schema";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Head from "@/components/ui/Head";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { ApiError } from "@/types/apiError.types";
import { getAuthLink, getRedirectUrl } from "@/libs/redirect-utils";
import { useAppDispatch } from "@/store/hooks";
import { loginThunk } from "../store/auth.thunks";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const redirectTo = useMemo(
    () => getRedirectUrl(searchParams),
    [searchParams],
  );

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: LoginSchema) => {
    console.log("#login_form submit data", data);
    try {
      const resultAction = await dispatch(
        loginThunk({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        }),
      ).unwrap();
      if (resultAction) {
        router.push("/project");
      }
    } catch (error) {
      console.error("#loginError", error);
      const { msg } = error as ApiError;
      toast.error(msg || "something went wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
          error={errors.email?.message}
        />
        {/* PASSWORD */}
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          {...form.register("password")}
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
        {/* REMEMBER ME */}
        <div className=" flex justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("rememberMe")} />
            Remember Me
          </label>
          <Link href="/forgot-password" className="text-primary">
            Forgot Password?
          </Link>
        </div>

        {/* ROOT ERROR */}
        {errors.root && (
          <p className="text-sm text-red-500">{errors.root.message}</p>
        )}
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
        <Link
          className="text-primary font-semibold ml-1"
          href={getAuthLink("/sign-up", redirectTo)}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
