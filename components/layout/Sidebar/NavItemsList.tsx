"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";
import { NavItemType } from "./types";

const navItems: NavItemType[] = [
  { href: "/project", iconRef: "projects.svg", label: "Projects" },
  { href: "/epics", iconRef: "epics.svg", label: "Epics" },
  { href: "/tasks", iconRef: "tasks.svg", label: "Tasks" },
  { href: "/members", iconRef: "members.svg", label: "Members" },
  { href: "/details", iconRef: "details.svg", label: "Details" },
];

interface NavItemsListProps {
  isCollapsed: boolean;
  onMobileClose: () => void;
}

export function NavItemsList({ isCollapsed, onMobileClose }: NavItemsListProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <nav className="flex-1  space-y-1 mt-4">
      {navItems.map((item) => (
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