"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import {
  selectAuthLoading,
  selectUser,
} from "@/features/auth/store/auth.selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUserThunk } from "@/features/auth/store/auth.thunks";

const getInitialCollapsedState = (): boolean => {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem("sidebar-collapsed");
  return saved === "true";
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(getInitialCollapsedState);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectAuthLoading);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/login" || pathname === "/sign-up") return;
    if (!isLoading && !user) {
      dispatch(fetchUserThunk())
        .unwrap()
        .catch(() => router.push("/login"));
    }
  }, [user, isLoading, router, dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("sidebar-collapsed", String(isCollapsed));
  }, [isCollapsed]);

  const handleToggleCollapse = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />
      <main
        className="transition-all duration-300 pt-16"
        style={{
          marginLeft:
            typeof window !== "undefined" && window.innerWidth >= 1024
              ? isCollapsed
                ? "5rem"
                : "16rem"
              : 0,
        }}
      >
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
