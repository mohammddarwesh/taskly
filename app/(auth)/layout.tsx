import Logo from "@/components/ui/Logo";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Logo />
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </div>
  );
}
