import z from "zod";


export const loginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .pipe(z.email({ error: "Please enter a valid email address" })),
    password: z
      .string()
      .min(1, { error: "Please enter a Password" })
  });

export type LoginSchema = z.infer<typeof loginSchema>;
