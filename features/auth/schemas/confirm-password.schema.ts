import { z } from "zod";
import { passwordSchema } from "./password.schema";


export const confirmPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ConfirmPasswordSchema = z.infer<typeof confirmPasswordSchema>;