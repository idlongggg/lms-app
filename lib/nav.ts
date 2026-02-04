import type { ThemeKey } from "@/lib/colors";
import type { Icon } from "@/lib/icons";
import type { Permission } from "@/lib/permissions";

// --- Types ---

export interface NavItem {
  key: string;
  href: string;
  icon: Icon;
  badge?: string;
  access?: Permission[];
}

export interface NavGroup {
  key?: string;
  items: NavItem[];
  access?: Permission[];
}

export interface NavTab {
  key: string;
  href: string;
  icon: Icon;
  color?: ThemeKey;
  access?: Permission[];
  groups: NavGroup[];
  hideInHeader?: boolean;
}

/**
 * Filter dashboard tabs by access
 */
export function filterTabs(
  tabs: NavTab[],
  hasPermission: (permission: string) => boolean,
): NavTab[] {
  return tabs
    .filter((tab) => {
      // Check tab-level access
      if (tab.access && tab.access.length > 0) {
        if (!tab.access.some((p) => hasPermission(p))) return false;
      }
      return true;
    })
    .map((tab) => ({
      ...tab,
      // Filter groups within the tab
      groups: filterNavGroups(tab.groups, hasPermission),
    }))
    .filter((tab) => tab.groups.length > 0 || tab.href === "/dashboard"); // Keep dashboard even if no groups
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
 * Get sidebar navigation for a specific tab
 */
export function getSidebarForTab(tabs: NavTab[], tabKey: string): NavGroup[] {
  const tab = tabs.find((t) => t.key === tabKey);
  return tab?.groups || [];
}

/**
 * Get sidebar navigation based on current path
 */
export function getSidebarForPath(
  tabs: NavTab[],
  pathname: string,
): NavGroup[] {
  const tabKey = getActiveTabKey(pathname);
  return getSidebarForTab(tabs, tabKey);
}
