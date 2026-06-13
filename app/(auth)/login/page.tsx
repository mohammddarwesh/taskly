import { LoginForm } from "@/features/auth/components/LoginForm";
import { Suspense } from "react";

const Login = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LoginForm />;
  </Suspense>
);

export default Login;
