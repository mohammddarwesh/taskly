export type PasswordRules = {
  minLength: boolean;
  lowerCase: boolean;
  upperCase: boolean;
  number: boolean;
  specialChar: boolean;
  noSpaces: boolean;
};

export type signUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  jobTitle?: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  data: {
    name: string;
    job_title?: string;
  };
};

export type checkListItem = {
  label: string;
  valid: boolean;
};
export type checkListItems = checkListItem[];
