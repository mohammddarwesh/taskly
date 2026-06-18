"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";
import { NavItemType } from "./types";

interface NavItemsListProps {
  items: NavItemType[];
  isCollapsed: boolean;
  onMobileClose: () => void;
}

export function NavItemsList({
  items,
  isCollapsed,
  onMobileClose,
}: NavItemsListProps) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/project") {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + "/");
  };
  return (
    <nav className="flex-1  space-y-1 mt-4">
      {items.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          iconRef={item.iconRef}
          label={item.label}
          isActive={isActive(item.href)}
          isCollapsed={isCollapsed}
          onMobileClose={onMobileClose}
        />
      ))}
    </nav>
  );
}
