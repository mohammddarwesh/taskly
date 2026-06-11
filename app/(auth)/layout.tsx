import Logo from "@/components/ui/Logo";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Logo className="h-20 p-10" />
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </div>
  );
}
