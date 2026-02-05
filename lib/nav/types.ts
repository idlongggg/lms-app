/**
 * Navigation Types
 */

import type { ThemeKey } from "@/lib/constants/colors";
import type { Icon } from "@/lib/constants/icons";
import type { Permission } from "@/lib/constants/permissions";

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
