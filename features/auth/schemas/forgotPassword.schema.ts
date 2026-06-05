import z from "zod";


export const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .trim()
      .pipe(z.email({ error: "Please enter a valid email address" })),
  });

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
