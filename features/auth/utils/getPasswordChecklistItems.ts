import { checkListItems, PasswordRules } from "../types";

export function getPasswordChecklistItems(rules: PasswordRules): checkListItems {
  return [
    {
      label: "At least 8 characters",
      valid: rules.minLength,
    },
    {
      label: "One uppercase, lowercase, and digit",
      valid: rules.upperCase && rules.lowerCase && rules.number,
    },
    {
      label: "One special character",
      valid: rules.specialChar,
    },
  ];
}
