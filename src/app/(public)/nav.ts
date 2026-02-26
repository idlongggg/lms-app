/**
 * Public Navigation
 * Navigation configuration for public (landing) pages
 */

import {
  AboutIcon,
  ContactIcon,
  FeaturesIcon,
  PrivacyIcon,
  TermsIcon,
  TournamentsIcon,
} from "@/lib/constants/icons";
import type { NavItem } from "@/lib/nav";

// ============================================================================
// Header Navigation
// ============================================================================

export const PUBLIC_HEADER_NAV: NavItem[] = [
  {
    key: "features",
    href: "#features",
    icon: FeaturesIcon,
  },
  {
    key: "tournaments",
    href: "#tournaments",
    icon: TournamentsIcon,
  },
  {
    key: "about",
    href: "#about",
    icon: AboutIcon,
  },
];

// ============================================================================
// Footer Navigation
// ============================================================================

export const PUBLIC_FOOTER_NAV: NavItem[] = [
  {
    key: "terms",
    href: "/terms",
    icon: TermsIcon,
  },
  {
    key: "privacy",
    href: "/privacy",
    icon: PrivacyIcon,
  },
  {
    key: "contact",
    href: "/contact",
    icon: ContactIcon,
  },
];

// ============================================================================
// Combined Export
// ============================================================================

export const PUBLIC_NAV = {
  header: PUBLIC_HEADER_NAV,
  footer: PUBLIC_FOOTER_NAV,
} as const;
