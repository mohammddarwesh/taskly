"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpSchema, signUpSchema } from "../schemas/sign-up.schema";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { getPasswordChecklistItems } from "../utils/getPasswordChecklistItems";
import PasswordChecklist from "./PasswordChecklist";

export function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
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
    <div>
      <PasswordChecklist items={items} />
    </div>
  );
}
