export type PasswordRules = {
    minLength: boolean
    lowerCase: boolean
    upperCase: boolean
    number: boolean
    specialChar: boolean
    noSpaces: boolean
}


export type signUpFormData = {
    name: string
    email: string
    password: string
    confirmPassword: string
    jobTitle?: string
}