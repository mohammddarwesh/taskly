"use client";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Logo from "../ui/Logo";
import { Avatar } from "../ui/Avatar";

type NavbarProps = {
  onMenuClick: () => void;
  isMobileMenuOpen: boolean;
};

export function Navbar({ onMenuClick, isMobileMenuOpen = true }: NavbarProps) {
  const { user, isLoading } = useUser();

  const userName = user?.user_metadata?.name || "User";
  const userJobTitle = user?.user_metadata?.job_title || "member";

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-background border-b border-{rgba(0, 0, 0, 0.102)]">
      <div className="flex w-full items-center justify-between  px-4 py-3 lg:px-6">
        {/* left side - menu button (mobile/tablet only) */}
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
        {/* Right side - User info */}
        <div className="flex items-center gap-3  ms-auto">
          {!isLoading && user && (
            <>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-800">{userName}</p>
                <p className="text-xs text-gray-500">{userJobTitle}</p>
              </div>
              <Avatar name={userName} />
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
