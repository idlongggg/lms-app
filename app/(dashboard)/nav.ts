import { PERMISSIONS } from "@/lib/constants";
import {
  AchievementsIcon,
  AnnouncementsIcon,
  CertificatesIcon,
  ChildrenIcon,
  CoinsIcon,
  CommunityIcon,
  CoursesIcon,
  DiscussionsIcon,
  EventsIcon,
  ForumIcon,
  LeaderboardIcon,
  LearningIcon,
  NewsIcon,
  OverviewIcon,
  ProfileIcon,
  ProgressIcon,
  QuestionBankIcon,
  RecentActivityIcon,
  RedeemedIcon,
  ReportsIcon,
  ScheduleIcon,
  SettingsIcon,
  ShopIcon,
  StatsIcon,
  StudentsIcon,
  TournamentIcon,
} from "@/lib/icons";
import type { DashboardTab, NavGroup, NavSection } from "@/lib/navigation";

// ============================================================================
// Dashboard Tabs (Header navigation)
// ============================================================================

export const DASHBOARD_TABS: DashboardTab[] = [
  {
    key: "overview",
    href: "/dashboard",
    icon: OverviewIcon,
    color: "default",
  },
  {
    key: "learning",
    href: "/learning",
    icon: LearningIcon,
    color: "learning",
    permissions: [
      PERMISSIONS.LESSON_READ,
      PERMISSIONS.PROGRESS_READ,
      PERMISSIONS.PROGRESS_READ_OWN,
      PERMISSIONS.PROGRESS_READ_CHILD,
    ],
  },
  {
    key: "tournament",
    href: "/tournament",
    icon: TournamentIcon,
    color: "tournament",
    permissions: [PERMISSIONS.TOURNAMENT_READ, PERMISSIONS.TOURNAMENT_JOIN],
  },
  {
    key: "community",
    href: "/community",
    icon: CommunityIcon,
    color: "community",
    permissions: [
      PERMISSIONS.LESSON_READ,
      PERMISSIONS.PROGRESS_READ_OWN,
      PERMISSIONS.PROGRESS_READ_CHILD,
    ],
  },
  {
    key: "news",
    href: "/news",
    icon: NewsIcon,
    color: "news",
  },
];

// ============================================================================
// Sidebar Navigation (per tab)
// ============================================================================

export const DASHBOARD_SIDEBARS: Record<string, NavGroup[]> = {
  overview: [
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
  ],
  learning: [
    {
      items: [
        { key: "learning", href: "/learning", icon: LearningIcon },
        { key: "allCourses", href: "/learning/courses", icon: CoursesIcon },
      ],
    },
  ],
  tournament: [
    {
      items: [
        { key: "arena", href: "/tournament", icon: TournamentIcon },
        { key: "schedule", href: "/tournament/schedule", icon: ScheduleIcon },
        {
          key: "leaderboard",
          href: "/tournament/leaderboard",
          icon: LeaderboardIcon,
        },
      ],
    },
  ],
  community: [
    {
      items: [
        { key: "forum", href: "/community", icon: ForumIcon },
        {
          key: "questionBank",
          href: "/community/questions",
          icon: QuestionBankIcon,
        },
        {
          key: "discussions",
          href: "/community/discussions",
          icon: DiscussionsIcon,
        },
      ],
    },
  ],
  rewards: [
    {
      items: [
        { key: "shop", href: "/rewards", icon: ShopIcon },
        { key: "myCoins", href: "/rewards/coins", icon: CoinsIcon },
        { key: "redeemed", href: "/rewards/redeemed", icon: RedeemedIcon },
      ],
    },
  ],
  news: [
    {
      items: [
        { key: "latestNews", href: "/news", icon: NewsIcon },
        {
          key: "announcements",
          href: "/news/announcements",
          icon: AnnouncementsIcon,
        },
        { key: "events", href: "/news/events", icon: EventsIcon },
      ],
    },
  ],
  profile: [
    {
      items: [
        { key: "profile", href: "/profile", icon: ProfileIcon },
        { key: "settings", href: "/profile/settings", icon: SettingsIcon },
      ],
    },
  ],
};

// ============================================================================
// Role-based Sections (for multi-view sidebar like admin viewing dashboard)
// ============================================================================

/**
 * Admin sections - visible when admin user views dashboard
 * Shows management tools and overview of all users
 */
export const ADMIN_SECTIONS: NavSection[] = [
  {
    key: "adminOverview",
    permissions: [PERMISSIONS.USER_READ, PERMISSIONS.PROGRESS_READ],
    items: [
      { key: "allStudents", href: "/dashboard/students", icon: StudentsIcon },
      { key: "allProgress", href: "/dashboard/progress", icon: ProgressIcon },
      { key: "reports", href: "/dashboard/reports", icon: ReportsIcon },
    ],
  },
];

/**
 * Parent sections - visible for parent role
 * Shows children's progress and activities
 */
export const PARENT_SECTIONS: NavSection[] = [
  {
    key: "childrenOverview",
    permissions: [PERMISSIONS.PROGRESS_READ_CHILD],
    items: [
      { key: "myChildren", href: "/dashboard/children", icon: ChildrenIcon },
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
];

/**
 * Student sections - visible for student role
 * Shows personal learning and achievements
 */
export const STUDENT_SECTIONS: NavSection[] = [
  {
    key: "myLearning",
    permissions: [PERMISSIONS.PROGRESS_READ_OWN],
    items: [
      { key: "myProgress", href: "/dashboard/my-progress", icon: ProgressIcon },
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
];

/**
 * All dashboard sections grouped by role
 */
export const DASHBOARD_SECTIONS = {
  admin: ADMIN_SECTIONS,
  parent: PARENT_SECTIONS,
  student: STUDENT_SECTIONS,
} as const;
