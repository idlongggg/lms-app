import {
  AchievementsIcon,
  AlertsIcon,
  AnnouncementsIcon,
  CertificatesIcon,
  ChildrenIcon,
  CoinsIcon,
  CommunityIcon,
  ContentIcon,
  CoursesIcon,
  DashboardIcon,
  DiscussionsIcon,
  EventsIcon,
  ForumIcon,
  HealthIcon,
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
  StatisticsIcon,
  StatsIcon,
  StudentsIcon,
  TenantsIcon,
  TournamentIcon,
  TournamentsIcon,
  UsersIcon,
} from "@/lib/icons";
import type { NavTab } from "@/lib/nav";
import { PERMISSIONS } from "@/lib/permissions";

// ============================================================================
// NAV
// ============================================================================

export const NAV: NavTab[] = [
  {
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
  },
  {
    key: "learning",
    href: "/learning",
    icon: LearningIcon,
    color: "preset02",
    access: [
      PERMISSIONS.LESSON_READ,
      PERMISSIONS.PROGRESS_READ,
      PERMISSIONS.PROGRESS_READ_OWN,
      PERMISSIONS.PROGRESS_READ_CHILD,
    ],
    groups: [
      {
        items: [
          { key: "learning", href: "/learning", icon: LearningIcon },
          { key: "allCourses", href: "/learning/courses", icon: CoursesIcon },
        ],
      },
    ],
  },
  {
    key: "tournament",
    href: "/tournament",
    icon: TournamentIcon,
    color: "preset03",
    access: [PERMISSIONS.TOURNAMENT_READ, PERMISSIONS.TOURNAMENT_JOIN],
    groups: [
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
  },
  {
    key: "community",
    href: "/community",
    icon: CommunityIcon,
    color: "preset04",
    access: [
      PERMISSIONS.LESSON_READ,
      PERMISSIONS.PROGRESS_READ_OWN,
      PERMISSIONS.PROGRESS_READ_CHILD,
    ],
    groups: [
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
  },
  {
    key: "news",
    href: "/news",
    icon: NewsIcon,
    color: "preset05",
    groups: [
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
  },
  {
    key: "profile",
    href: "/profile",
    icon: ProfileIcon,
    hideInHeader: true,
    groups: [
      {
        items: [
          { key: "profile", href: "/profile", icon: ProfileIcon },
          { key: "settings", href: "/profile/settings", icon: SettingsIcon },
        ],
      },
    ],
  },
  {
    key: "rewards",
    href: "/rewards",
    icon: ShopIcon,
    hideInHeader: true,
    groups: [
      {
        items: [
          { key: "shop", href: "/rewards", icon: ShopIcon },
          { key: "myCoins", href: "/rewards/coins", icon: CoinsIcon },
          { key: "redeemed", href: "/rewards/redeemed", icon: RedeemedIcon },
        ],
      },
    ],
  },
  {
    key: "admin",
    href: "/admin",
    icon: DashboardIcon,
    color: "preset00", // Assuming a new color preset
    hideInHeader: false, // Make it visible if user has access
    access: [
      PERMISSIONS.TENANT_READ,
      PERMISSIONS.TENANT_CREATE,
      PERMISSIONS.USER_READ,
      PERMISSIONS.USER_CREATE,
    ], // Broad access check, groups refine it
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
          { key: "dashboard", href: "/admin", icon: DashboardIcon }, // Dashboard is shared
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
        items: [
          { key: "settings", href: "/admin/settings", icon: SettingsIcon },
        ],
      },
    ],
  },
];
