import {
  AchievementsIcon,
  CertificatesIcon,
  ChildrenIcon,
  OverviewIcon,
  ProgressIcon,
  RecentActivityIcon,
  StatsIcon,
} from "@/lib/constants/icons";
import { PERMISSIONS } from "@/lib/constants/permissions";
import type { NavTab } from "@/lib/nav";

export const NAV_OVERVIEW: NavTab = {
  key: "overview",
  href: "/dashboard",
  icon: OverviewIcon,
  color: "preset00",
  groups: [
    {
      items: [
        { key: "overview", href: "/dashboard", icon: OverviewIcon },
        { key: "stats", href: "/dashboard/stats", icon: StatsIcon },
        {
          key: "recentActivity",
          href: "/dashboard/activity",
          icon: RecentActivityIcon,
        },
      ],
    },
    {
      key: "childrenOverview",
      access: [PERMISSIONS.PROGRESS_READ_CHILD],
      items: [
        {
          key: "myChildren",
          href: "/dashboard/children",
          icon: ChildrenIcon,
        },
        {
          key: "childProgress",
          href: "/dashboard/children/progress",
          icon: ProgressIcon,
        },
        {
          key: "childActivities",
          href: "/dashboard/children/activities",
          icon: RecentActivityIcon,
        },
      ],
    },
    {
      key: "myLearning",
      access: [PERMISSIONS.PROGRESS_READ_OWN],
      items: [
        {
          key: "myProgress",
          href: "/dashboard/my-progress",
          icon: ProgressIcon,
        },
        {
          key: "myAchievements",
          href: "/dashboard/achievements",
          icon: AchievementsIcon,
        },
        {
          key: "myCertificates",
          href: "/dashboard/certificates",
          icon: CertificatesIcon,
        },
      ],
    },
  ],
};
