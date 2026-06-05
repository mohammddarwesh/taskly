import z from "zod";

const nameRegex = /^[\p{L}]+(?:[\p{L}]+)*$/u;

const specialCharRegex = /(?=.*[!@#$%^&*(),.?":{}|<>_\-])/;

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters")
      .regex(
        nameRegex,
        "Name can contain only letters and single spaces between words",
      ),
    email: z
      .string()
      .trim()
      .pipe(z.email({ error: "Please enter a valid email address" })),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" })
      .max(64, { error: "Password must not exceed 64 characters" })
      .refine((value) => !/\s/.test(value), {
        error: "Password must not contain spaces",
      })
      .refine((value) => /[A-Z]/.test(value), {
        error: "Password must contain at least one uppercase letter",
      })
      .refine((value) => /[a-z]/.test(value), {
        error: "Password must contain at least one lowercase letter",
      })
      .refine((value) => /\d/.test(value), {
        error: "Password must contain at least one digit",
      })
      .refine((value) => specialCharRegex.test(value), {
        error: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
    jobTitle: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
