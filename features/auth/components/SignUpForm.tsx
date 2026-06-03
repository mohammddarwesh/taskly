"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpSchema, signUpSchema } from "../schemas/sign-up.schema";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { getPasswordChecklistItems } from "../utils/getPasswordChecklistItems";
import PasswordChecklist from "./PasswordChecklist";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export function SignUpForm() {
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
    formState: { errors, isValid, isSubmitting },
  } = form;

  const password = useWatch({ control: form.control, name: "password" });
  // const password = "asasasassaA1@";
  const rules = usePasswordValidation(password || "");
  console.log("rules", rules);
  const items = getPasswordChecklistItems(rules);

  const onSubmit = async (data: SignUpSchema) => {
    console.log("submit data", data);
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="card flex flex-col gap-6"
    >
      {/* NAME */}
      <Input
        label="Name"
        placeholder="Enter your name"
        {...form.register("name")}
        error={form.formState.errors.name?.message}
      />

      {/* EMAIL */}
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...form.register("email")}
        error={form.formState.errors.email?.message}
      />
      {/* JOB TITLE */}
      <Input
        label="Job Title (optional)"
        placeholder="Frontend Developer"
        {...form.register("jobTitle")}
        error={form.formState.errors.jobTitle?.message}
      />

      {/* PASSWORD */}
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        {...form.register("password")}
        error={form.formState.errors.password?.message}
      />

      {/* PASSWORD CHECKLIST */}
      <PasswordChecklist items={items} />

      {/* CONFIRM PASSWORD */}
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        {...form.register("confirmPassword")}
        error={form.formState.errors.confirmPassword?.message}
      />

      {/* SUBMIT BUTTON */}
      <Button
        type="submit"
        variant="primary"
        loading={form.formState.isSubmitting}
        disabled={form.formState.isSubmitting}
      >
        Create Account
      </Button>
    </form>
  );
}
