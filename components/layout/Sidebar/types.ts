export interface NavItemType {
  href: string;
  iconRef: string;
  label: string;
}

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}