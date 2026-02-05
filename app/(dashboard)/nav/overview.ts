import {
  AchievementsIcon,
  CertificatesIcon,
  ChildrenIcon,
  OverviewIcon,
  ProgressIcon,
  RecentActivityIcon,
  ReportsIcon,
  StatsIcon,
  StudentsIcon,
} from "@/lib/constants/icons";
import type { NavTab } from "@/lib/nav";
import { PERMISSIONS } from "@/lib/constants/permissions";

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
    // Role-specific groups
    {
      key: "adminOverview",
      access: [PERMISSIONS.USER_READ, PERMISSIONS.PROGRESS_READ],
      items: [
        {
          key: "allStudents",
          href: "/dashboard/students",
          icon: StudentsIcon,
        },
        {
          key: "allProgress",
          href: "/dashboard/progress",
          icon: ProgressIcon,
        },
        { key: "reports", href: "/dashboard/reports", icon: ReportsIcon },
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
