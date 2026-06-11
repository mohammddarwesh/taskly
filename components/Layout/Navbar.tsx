"use client";

import { useUser } from "@/hooks/useUser";
import { Avatar } from "@/components/ui/Avatar";
import { useState } from "react";
import Image from "next/image";
import Logo from "../ui/Logo";

interface NavbarProps {
  onMenuClick: () => void;
  isMobileMenuOpen: boolean;
}

export function Navbar({ onMenuClick, isMobileMenuOpen }: NavbarProps) {
  const { user, isLoading } = useUser();
  console.log("userData NAV", user);
  const userName = user?.user_metadata?.name || "User";
  const userJobTitle = user?.user_metadata?.job_title || "Member";

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between  px-4 py-3 lg:px-6">
        {/* Menu button (mobile/tablet only)  */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          aria-label="Toggle menu"
        >
          <Image
            src={isMobileMenuOpen ? "/icons/x.svg" : "/icons/menu.svg"}
            width={24}
            height={24}
            alt="menu icon"
          />
        </button>

        {/* User info */}
        <div className="ms-auto flex items-start gap-3">
          {!isLoading && user && (
            <>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold  text-slate-900">{userName}</p>
                <p className="text-[10px] font-bold text-primary uppercase">
                  {userJobTitle}
                </p>
              </div>
              <Avatar name={userName} size="md" />
            </>
          )}
          {isLoading && (
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          )}
        </div>
      </div>
    </nav>
  );
}
