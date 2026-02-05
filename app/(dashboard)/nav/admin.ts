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
} from "@/lib/constants/icons";
import type { NavTab } from "@/lib/nav";
import { PERMISSIONS } from "@/lib/constants/permissions";

export const NAV_ADMIN: NavTab = {
  key: "admin",
  href: "/admin",
  icon: DashboardIcon,
  color: "preset00",
  hideInHeader: false,
  access: [
    PERMISSIONS.TENANT_READ,
    PERMISSIONS.TENANT_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_CREATE,
  ],
  groups: [
    {
      key: "systemAdmin",
      access: [PERMISSIONS.TENANT_READ, PERMISSIONS.TENANT_CREATE],
      items: [
        { key: "dashboard", href: "/admin", icon: DashboardIcon },
        { key: "tenants", href: "/admin/tenants", icon: TenantsIcon },
        { key: "health", href: "/admin/health", icon: HealthIcon },
        { key: "alerts", href: "/admin/alerts", icon: AlertsIcon },
      ],
    },
    {
      key: "tenantAdmin",
      access: [PERMISSIONS.USER_READ, PERMISSIONS.USER_CREATE],
      items: [
        { key: "dashboard", href: "/admin", icon: DashboardIcon },
        { key: "users", href: "/admin/users", icon: UsersIcon },
        { key: "content", href: "/admin/content", icon: ContentIcon },
        {
          key: "tournaments",
          href: "/admin/tournaments",
          icon: TournamentsIcon,
        },
        { key: "statistics", href: "/admin/reports", icon: StatisticsIcon },
      ],
    },
    {
      key: "system",
      items: [{ key: "settings", href: "/admin/settings", icon: SettingsIcon }],
    },
  ],
};
