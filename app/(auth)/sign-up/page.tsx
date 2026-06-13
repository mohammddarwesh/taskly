import { SignUpForm } from "@/features/auth/components/SignUpForm";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  );
};

export default page;
