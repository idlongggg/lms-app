/**
 * Navigation Filter Functions
 */

import type { Permission } from "@/lib/constants/permissions";
import type { NavGroup, NavItem, NavTab } from "./types";

/**
 * Filter dashboard tabs by access
 */
export function filterTabs(
  tabs: NavTab[],
  hasPermission: (permission: Permission) => boolean,
): NavTab[] {
  return tabs
    .filter((tab) => {
      if (tab.access && tab.access.length > 0) {
        if (!tab.access.some((p) => hasPermission(p))) return false;
      }
      return true;
    })
    .map((tab) => ({
      ...tab,
      groups: filterNavGroups(tab.groups, hasPermission),
    }))
    .filter((tab) => tab.groups.length > 0 || tab.href === "/dashboard");
}

/**
 * Filter nav items by access
 */
export function filterNavItems(
  items: NavItem[],
  hasPermission: (permission: Permission) => boolean,
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
  hasPermission: (permission: Permission) => boolean,
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
export function getActiveTabKey(tabs: NavTab[], pathname: string): string {
  const matchedTab = tabs.find(
    (tab) => tab.href !== "/dashboard" && pathname.startsWith(tab.href),
  );
  return matchedTab?.key ?? "overview";
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
  const tabKey = getActiveTabKey(tabs, pathname);
  return getSidebarForTab(tabs, tabKey);
}
