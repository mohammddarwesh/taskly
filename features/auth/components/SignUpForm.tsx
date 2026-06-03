import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpSchema, signUpSchema } from "../schemas/sign-up.schema";

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
    watch,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const password = useWatch({ control: form.control, name: "password" });

  const onSubmit = async (data: SignUpSchema) => {
    console.log("submit data", data);
  };

  return <div>SignUpForm</div>;
}
