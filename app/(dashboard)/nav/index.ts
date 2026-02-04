import type { NavTab } from "@/lib/nav";
import { NAV_ADMIN } from "./admin";
import { NAV_COMMUNITY } from "./community";
import { NAV_LEARNING } from "./learning";
import { NAV_NEWS } from "./news";
import { NAV_OVERVIEW } from "./overview";
import { NAV_PROFILE } from "./profile";
import { NAV_REWARDS } from "./rewards";
import { NAV_TOURNAMENT } from "./tournament";

// Re-export individual nav tabs
export {
  NAV_ADMIN,
  NAV_COMMUNITY,
  NAV_LEARNING,
  NAV_NEWS,
  NAV_OVERVIEW,
  NAV_PROFILE,
  NAV_REWARDS,
  NAV_TOURNAMENT,
};

// Combined NAV array for dashboard
export const NAV: NavTab[] = [
  NAV_OVERVIEW,
  NAV_LEARNING,
  NAV_TOURNAMENT,
  NAV_COMMUNITY,
  NAV_NEWS,
  NAV_PROFILE,
  NAV_REWARDS,
  NAV_ADMIN,
];
