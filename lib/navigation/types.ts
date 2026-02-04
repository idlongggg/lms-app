import type { IconComponent } from "@/lib/icons";

export interface NavItem {
  key: string; // i18n key suffix
  href: string;
  icon: IconComponent;
  badge?: string;
  children?: NavItem[];
  permissions?: string[]; // Required permissions (any of these)
}

export interface NavGroup {
  key?: string; // i18n key suffix for group title
  items: NavItem[];
  permissions?: string[]; // Required permissions for this group
}

export interface NavSection {
  key: string; // i18n key suffix for section title (e.g., "admin", "parent", "student")
  permissions: string[]; // Required permissions to see this section
  items: NavItem[];
}

import type { ThemeKey } from "@/lib/constants/colors";
import type { Permission } from "@/lib/constants/permissions";

export interface DashboardTab {
  key: string; // Used for i18n: navigation.tabs.{key}
  href: string;
  icon: IconComponent;
  color: ThemeKey;
  permissions?: Permission[]; // Required permissions (any of these)
}
