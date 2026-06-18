"use client";

import { cn } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const ROUTE_MAP: Record<string, string> = {
  projects: "Projects",
  add: "Add New Project",
  edit: "Edit Project",
};

type BreadcrumbItem = {
  label: string;
  href: string;
};

export function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const items: BreadcrumbItem[] = segments.map((segment, index) => ({
    label: ROUTE_MAP[segment] ?? segment.replace(/-/g, " ").toUpperCase(),
    href: `/${segments.slice(0, index + 1).join("/")}`,
  }));

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2">
      {items.map((item, index) => {
        const isActive = index === items.length - 1;

        return (
          <Fragment key={item.href}>
            {index > 0 && (
              <svg
                width="4"
                height="6"
                viewBox="0 0 4 6"
                fill="none"
                className="text-text-secondary/40"
                aria-hidden="true"
              >
                <path
                  d="M1 1L3 3L1 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {isActive ? (
              <span
                className={cn(
                  "text-xs font-bold uppercase leading-4 tracking-[1.2px]",
                  "text-primary",
                )}
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "text-xs font-bold uppercase leading-4 tracking-[1.2px]",
                  "text-text-secondary/60 transition-colors hover:text-text-secondary",
                )}
              >
                {item.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
