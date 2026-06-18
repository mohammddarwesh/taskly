"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useNavigationItems } from "@/hooks/useNavigationItems";
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

  useEffect(() => {
    if (!isLoading && !user) {
      dispatch(fetchUserThunk());
    }
  }, [user, isLoading, dispatch]);


  // Persist collapse state
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-collapsed", String(isCollapsed));
    }
  }, [isCollapsed]);

  const handleToggleCollapse = () => setIsCollapsed((prev) => !prev);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = useNavigationItems();

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

  return (
    <div className="bg-gray-50 flex min-h-screen">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />

      <div className="flex flex-1 flex-col min-h-screen ">
        <Navbar
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
