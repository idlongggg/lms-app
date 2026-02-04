import type { DashboardTab, NavGroup, NavItem, NavSection } from "./types";

/**
 * Filter dashboard tabs by user permissions
 */
export function filterTabsByPermissions(
  tabs: DashboardTab[],
  hasPermission: (permission: string) => boolean,
): DashboardTab[] {
  return tabs.filter((tab) => {
    if (!tab.permissions || tab.permissions.length === 0) return true;
    // User needs at least one of the permissions
    return tab.permissions.some((p) => hasPermission(p));
  });
}

/**
 * Filter nav items by user permissions
 */
export function filterNavItemsByPermissions(
  items: NavItem[],
  hasPermission: (permission: string) => boolean,
): NavItem[] {
  return items.filter((item) => {
    if (!item.permissions || item.permissions.length === 0) return true;
    return item.permissions.some((p) => hasPermission(p));
  });
}

/**
 * Filter nav groups by user permissions
 */
export function filterNavGroupsByPermissions(
  groups: NavGroup[],
  hasPermission: (permission: string) => boolean,
): NavGroup[] {
  return groups
    .filter((group) => {
      if (!group.permissions || group.permissions.length === 0) return true;
      return group.permissions.some((p) => hasPermission(p));
    })
    .map((group) => ({
      ...group,
      items: filterNavItemsByPermissions(group.items, hasPermission),
    }))
    .filter((group) => group.items.length > 0);
}

/**
 * Filter nav sections by user permissions
 */
export function filterNavSectionsByPermissions(
  sections: NavSection[],
  hasPermission: (permission: string) => boolean,
): NavSection[] {
  return sections
    .filter((section) => {
      if (!section.permissions || section.permissions.length === 0) return true;
      return section.permissions.some((p) => hasPermission(p));
    })
    .map((section) => ({
      ...section,
      items: filterNavItemsByPermissions(section.items, hasPermission),
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
