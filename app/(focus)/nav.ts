/**
 * Focus Navigation
 * Minimal navigation configuration for focus/immersive mode
 */

import { BackIcon, HomeIcon } from "@/lib/icons";
import type { NavItem } from "@/lib/nav";

// ============================================================================
// Focus Mode Navigation (minimal)
// ============================================================================

export const FOCUS_NAV: NavItem[] = [
  {
    key: "back",
    href: "/dashboard",
    icon: BackIcon,
  },
  {
    key: "home",
    href: "/dashboard",
    icon: HomeIcon,
  },
];
