import type { ThemeKey } from "@/lib/colors";
import type { Icon } from "@/lib/icons";
import type { Permission } from "@/lib/permissions";

// --- Types ---

export interface NavItem {
  key: string; // i18n key suffix
  href: string;
  icon: Icon;
  badge?: string;
  children?: NavItem[];
  access?: Permission[]; // Required permissions (any of these)
}

export interface NavGroup {
  key?: string; // i18n key suffix for group title
  items: NavItem[];
  access?: Permission[]; // Required permissions for this group
}

export interface NavSection {
  key: string; // i18n key suffix for section title (e.g., "admin", "parent", "student")
  access: Permission[]; // Required permissions to see this section
  items: NavItem[];
}

export interface DashboardTab {
  key: string; // Used for i18n: navigation.tabs.{key}
  href: string;
  icon: Icon;
  color: ThemeKey;
  access?: Permission[]; // Required permissions (any of these)
}

// --- Helpers ---

/**
 * Filter dashboard tabs by access
 */
export function filterTabs(
  tabs: DashboardTab[],
  hasPermission: (permission: string) => boolean,
): DashboardTab[] {
  return tabs.filter((tab) => {
    if (!tab.access || tab.access.length === 0) return true;
    return tab.access.some((p) => hasPermission(p));
  });
}

/**
 * Filter nav items by access
 */
export function filterNavItems(
  items: NavItem[],
  hasPermission: (permission: string) => boolean,
): NavItem[] {
  return items.filter((item) => {
    if (!item.access || item.access.length === 0) return true;
    return item.access.some((p) => hasPermission(p));
  });
}

/**
 * Filter nav groups by access
 */
export function filterNavGroups(
  groups: NavGroup[],
  hasPermission: (permission: string) => boolean,
): NavGroup[] {
  return groups
    .filter((group) => {
      if (!group.access || group.access.length === 0) return true;
      return group.access.some((p) => hasPermission(p));
    })
    .map((group) => ({
      ...group,
      items: filterNavItems(group.items, hasPermission),
    }))
    .filter((group) => group.items.length > 0);
}

/**
 * Filter nav sections by access
 */
export function filterNavSections(
  sections: NavSection[],
  hasPermission: (permission: string) => boolean,
): NavSection[] {
  return sections
    .filter((section) => {
      if (!section.access || section.access.length === 0) return true;
      return section.access.some((p) => hasPermission(p));
    })
    .map((section) => ({
      ...section,
      items: filterNavItems(section.items, hasPermission),
    }))
    .filter((section) => section.items.length > 0);
}

/**
 * Get active tab key from pathname
 */
export function getActiveTabKey(pathname: string): string {
  if (pathname.startsWith("/learning")) return "learning";
  if (pathname.startsWith("/tournament")) return "tournament";
  if (pathname.startsWith("/community")) return "community";
  if (pathname.startsWith("/rewards")) return "rewards";
  if (pathname.startsWith("/news")) return "news";
  if (pathname.startsWith("/profile")) return "profile";
  return "overview";
}

/**
 * Get sidebar navigation for a specific tab key
 */
export function getSidebarForTab(
  sidebars: Record<string, NavGroup[]>,
  tabKey: string,
): NavGroup[] {
  return sidebars[tabKey] || sidebars.overview || [];
}

/**
 * Get sidebar navigation based on current path
 */
export function getSidebarForPath(
  sidebars: Record<string, NavGroup[]>,
  pathname: string,
): NavGroup[] {
  const tabKey = getActiveTabKey(pathname);
  return getSidebarForTab(sidebars, tabKey);
}
