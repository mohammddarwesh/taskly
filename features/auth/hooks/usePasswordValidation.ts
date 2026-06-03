import { PasswordRules } from "../types";
import { useMemo } from "react";

export function usePasswordValidation(password: string) {
  return useMemo<PasswordRules>(() => {
    return {
      minLength: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      noSpaces: !/\s/.test(password),
    };
  }, [password]);
}
