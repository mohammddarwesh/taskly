"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpSchema, signUpSchema } from "../schemas/sign-up.schema";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { getPasswordChecklistItems } from "../utils/getPasswordChecklistItems";
import PasswordChecklist from "./PasswordChecklist";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Head from "@/components/ui/Head";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/libs/api-client";
import { toast } from "react-toastify";
import { ApiError } from "@/types/apiError.types";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      jobTitle: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const password = useWatch({ control: control, name: "password" });
  // const password = "asasasassaA1@";
  const rules = usePasswordValidation(password || "");
  // console.log("rules", rules);
  const items = getPasswordChecklistItems(rules);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit = async (data: SignUpSchema) => {
    const formattedData = {
      email: data.email,
      password: data.password,
      data: {
        name: data.name,
        job_title: data.jobTitle,
      },
    };
    console.log("submit data", formattedData);
    try {
      const response = await apiClient("/api/auth/signUp", {
        method: "POST",
        body: formattedData,
      });

      console.log("SUCCESS", response);
      router.push("/project");
      router.refresh();
    } catch (error) {
      console.error("#sign-upForm ", error);
      const { msg } = error as ApiError;
      toast.error(msg);
    }
  };
  return (
    <div className="card max-w-xl m-auto">
      <Head
        head="Create your workspace"
        sub="Join the editorial approach to task management."
      />
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-6">
        {/* NAME */}
        <Input
          label="Name"
          placeholder="Enter your name"
          {...register("name")}
          error={errors.name?.message}
        />
        {/* EMAIL */}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />
        {/* JOB TITLE */}
        <Input
          label="Job Title (optional)"
          placeholder="Frontend Developer"
          {...register("jobTitle")}
          error={errors.jobTitle?.message}
        />
        {/* PASSWORD */}
        <div className="flex grow justify-start gap-2 flex-col md:flex-row">
          <div className="relative w-full">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
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
          {/* CONFIRM PASSWORD */}

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>
        {/* PASSWORD CHECKLIST */}
        <PasswordChecklist items={items} />
        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="rounded-b-lg py-4"
        >
          Create Account
        </Button>
      </form>
      <div className="flex items-center justify-center mt-8 text-sm">
        <p className="text-slate-600 ">Already have an account?</p>
        <Link className="text-primary font-semibold ml-1" href="/login">
          Log in
        </Link>
      </div>
    </div>
  );
}
