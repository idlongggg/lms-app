/**
 * Admin Navigation
 * Navigation configuration for admin layout
 */

import {
  AlertsIcon,
  ContentIcon,
  DashboardIcon,
  HealthIcon,
  SettingsIcon,
  StatisticsIcon,
  TenantsIcon,
  TournamentsIcon,
  UsersIcon,
} from "@/lib/icons";
import type { NavGroup } from "@/lib/nav";
import { PERMISSIONS } from "@/lib/permissions";

// ============================================================================
// Root Admin Navigation (System-wide management)
// ============================================================================

export const ROOT_ADMIN_NAV: NavGroup[] = [
  {
    items: [{ key: "dashboard", href: "/admin", icon: DashboardIcon }],
  },
  {
    key: "system",
    items: [
      { key: "tenants", href: "/admin/tenants", icon: TenantsIcon },
      { key: "users", href: "/admin/users", icon: UsersIcon },
    ],
  },
  {
    key: "monitoring",
    items: [
      { key: "health", href: "/admin/health", icon: HealthIcon },
      { key: "alerts", href: "/admin/alerts", icon: AlertsIcon },
      { key: "settings", href: "/admin/settings", icon: SettingsIcon },
    ],
  },
];

// ============================================================================
// Tenant Admin Navigation (Tenant-scoped management)
// ============================================================================

export const TENANT_ADMIN_NAV: NavGroup[] = [
  {
    items: [{ key: "dashboard", href: "/admin", icon: DashboardIcon }],
  },
  {
    key: "management",
    items: [
      { key: "users", href: "/admin/users", icon: UsersIcon },
      { key: "content", href: "/admin/content", icon: ContentIcon },
      { key: "tournaments", href: "/admin/tournaments", icon: TournamentsIcon },
    ],
  },
  {
    key: "reports",
    items: [
      { key: "statistics", href: "/admin/reports", icon: StatisticsIcon },
    ],
  },
  {
    key: "system",
    items: [{ key: "settings", href: "/admin/settings", icon: SettingsIcon }],
  },
];

// ============================================================================
// Admin Sections (for permission-based filtering)
// ============================================================================

export const ADMIN_SECTIONS: NavGroup[] = [
  {
    key: "systemAdmin",
    access: [PERMISSIONS.TENANT_READ, PERMISSIONS.TENANT_CREATE],
    items: [
      { key: "tenants", href: "/admin/tenants", icon: TenantsIcon },
      { key: "health", href: "/admin/health", icon: HealthIcon },
      { key: "alerts", href: "/admin/alerts", icon: AlertsIcon },
    ],
  },
  {
    key: "tenantAdmin",
    access: [PERMISSIONS.USER_READ, PERMISSIONS.USER_CREATE],
    items: [
      { key: "users", href: "/admin/users", icon: UsersIcon },
      { key: "content", href: "/admin/content", icon: ContentIcon },
      { key: "tournaments", href: "/admin/tournaments", icon: TournamentsIcon },
      { key: "statistics", href: "/admin/reports", icon: StatisticsIcon },
    ],
  },
];

/**
 * Get admin navigation based on role
 */
export function getAdminNavByRole(role: string): NavGroup[] {
  if (role === "root-admin") {
    return ROOT_ADMIN_NAV;
  }
  if (role === "tenant-admin") {
    return TENANT_ADMIN_NAV;
  }
  return [];
}
