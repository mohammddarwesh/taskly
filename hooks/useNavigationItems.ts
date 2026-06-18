import { NavItemType } from "@/components/layout/Sidebar/types";
import { usePathname } from "next/navigation";

const globalNavItems: NavItemType[] = [
  { href: "/project", iconRef: "projects.svg", label: "Projects" },
  { href: "/epics", iconRef: "epics.svg", label: "Epics" },
  { href: "/tasks", iconRef: "tasks.svg", label: "Tasks" },
  { href: "/members", iconRef: "members.svg", label: "Members" },
  { href: "/details", iconRef: "details.svg", label: "Details" },
];

const getProjectIdFromPath = (pathname: string): string | null => {
  const match = pathname.match(/^\/project\/([^/]+)/);
  return match ? match[1] : null;
};

const getProjectNavItems = (projectId: string): NavItemType[] => [
  { href: "/project", iconRef: "projects.svg", label: "Projects" },
  {
    href: `/project/${projectId}/tasks`,
    iconRef: "tasks.svg",
    label: "Project Tasks",
  },
  {
    href: `/project/${projectId}/members`,
    iconRef: "members.svg",
    label: "Project Members",
  },
  {
    href: `/project/${projectId}/epics`,
    iconRef: "epics.svg",
    label: "Project Epics",
  },
  {
    href: `/project/${projectId}/edit`,
    iconRef: "details.svg",
    label: "Project Details",
  },
];

export function useNavigationItems(): NavItemType[] {
  const pathname = usePathname() || "";
  const projectId = getProjectIdFromPath(pathname);

  if (projectId) {
    return getProjectNavItems(projectId);
  }
  return globalNavItems;
}
