import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  Coins,
  FileText,
  Gift,
  GraduationCap,
  History,
  Home,
  LayoutDashboard,
  type LucideIcon,
  Newspaper,
  Settings,
  Shield,
  ShoppingBag,
  Swords,
  Trophy,
  User,
  Users,
} from "lucide-react";

import type { UserRole } from "./auth/types";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: NavItem[];
  roles?: UserRole[]; // Roles that can see this item
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
  roles?: UserRole[]; // Roles that can see this group
}

// Dashboard Center Navigation (Header tabs)
export interface DashboardTab {
  title: string;
  href: string;
  icon: LucideIcon;
  key: string;
  roles?: UserRole[]; // Roles that can see this tab
}

// All possible tabs
const allDashboardTabs: DashboardTab[] = [
  { title: "Tổng quan", href: "/dashboard", icon: Home, key: "overview" },
  {
    title: "Học tập",
    href: "/learning",
    icon: BookOpen,
    key: "learning",
    roles: ["teacher", "student", "parent"],
  },
  { title: "Thách đấu", href: "/tournament", icon: Swords, key: "tournament" },
  {
    title: "Đổi quà",
    href: "/rewards",
    icon: Gift,
    key: "rewards",
    roles: ["student"],
  },
  { title: "Tin tức", href: "/news", icon: Newspaper, key: "news" },
];

// Get tabs filtered by role
export function getTabsByRole(role: UserRole): DashboardTab[] {
  // Admin roles use admin layout, not tabs
  if (role === "root-admin" || role === "tenant-admin") {
    return [];
  }

  return allDashboardTabs.filter((tab) => {
    if (!tab.roles) return true; // No role restriction
    return tab.roles.includes(role);
  });
}

// Legacy export for compatibility
export const dashboardTabs: DashboardTab[] = allDashboardTabs;

// Sidebar navigation per tab - unified (role-specific views are handled by components)
export const dashboardSidebars: Record<string, NavGroup[]> = {
  overview: [
    {
      items: [
        { title: "Tổng quan", href: "/dashboard", icon: Home },
        { title: "Thống kê", href: "/dashboard/stats", icon: BarChart3 },
        {
          title: "Hoạt động gần đây",
          href: "/dashboard/activity",
          icon: History,
        },
      ],
    },
  ],
  learning: [
    {
      items: [
        { title: "Học tập", href: "/learning", icon: BookOpen },
        {
          title: "Tất cả khóa học",
          href: "/learning/courses",
          icon: GraduationCap,
        },
      ],
    },
  ],
  tournament: [
    {
      items: [
        { title: "Sảnh đấu", href: "/tournament", icon: Swords },
        { title: "Lịch đấu", href: "/tournament/schedule", icon: Calendar },
        {
          title: "Bảng xếp hạng",
          href: "/tournament/leaderboard",
          icon: Trophy,
        },
      ],
    },
  ],
  rewards: [
    {
      items: [
        { title: "Cửa hàng", href: "/rewards", icon: ShoppingBag },
        { title: "Xu của tôi", href: "/rewards/coins", icon: Coins },
        { title: "Đã đổi", href: "/rewards/redeemed", icon: Gift },
      ],
    },
  ],
  news: [
    {
      items: [
        { title: "Tin mới nhất", href: "/news", icon: Newspaper },
        { title: "Thông báo", href: "/news/announcements", icon: Bell },
        { title: "Sự kiện", href: "/news/events", icon: Calendar },
      ],
    },
  ],
  profile: [
    {
      items: [
        { title: "Hồ sơ cá nhân", href: "/profile", icon: User },
        { title: "Cài đặt", href: "/profile/settings", icon: Settings },
      ],
    },
  ],
};

// Helper function to get sidebar based on current path
// Role-specific content is now handled within page components via permissions
export function getSidebarForPath(
  pathname: string,
  _role?: UserRole,
): NavGroup[] {
  const key = getActiveTabKey(pathname);
  return dashboardSidebars[key] || dashboardSidebars.overview;
}

// Helper function to get active tab key
export function getActiveTabKey(pathname: string): string {
  if (pathname.startsWith("/learning")) return "learning";
  if (pathname.startsWith("/tournament")) return "tournament";
  if (pathname.startsWith("/rewards")) return "rewards";
  if (pathname.startsWith("/news")) return "news";
  if (pathname.startsWith("/profile")) return "profile";
  return "overview";
}

// Legacy export for compatibility
export const dashboardNavigation: NavGroup[] = dashboardSidebars.overview;

// Admin Sidebar Navigation - Root Admin (system-wide)
export const rootAdminNavigation: NavGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Hệ thống",
    items: [
      {
        title: "Tenants",
        href: "/admin/tenants",
        icon: Building2,
      },
      {
        title: "Người dùng",
        href: "/admin/users",
        icon: Users,
      },
    ],
  },
  {
    title: "Giám sát",
    items: [
      {
        title: "Trạng thái",
        href: "/admin/health",
        icon: Activity,
      },
      {
        title: "Cảnh báo",
        href: "/admin/alerts",
        icon: AlertTriangle,
      },
      {
        title: "Cài đặt",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

// Admin Sidebar Navigation - Tenant Admin (tenant-scoped)
export const tenantAdminNavigation: NavGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Quản lý",
    items: [
      {
        title: "Người dùng",
        href: "/admin/users",
        icon: Users,
      },
      {
        title: "Nội dung",
        href: "/admin/content",
        icon: FileText,
      },
      {
        title: "Giải đấu",
        href: "/admin/tournaments",
        icon: Trophy,
      },
    ],
  },
  {
    title: "Báo cáo",
    items: [
      {
        title: "Thống kê",
        href: "/admin/reports",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Hệ thống",
    items: [
      {
        title: "Cài đặt",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

// Legacy export for compatibility
export const adminNavigation: NavGroup[] = tenantAdminNavigation;

// Get admin navigation by role
export function getAdminNavByRole(role: UserRole): NavGroup[] {
  if (role === "root-admin") {
    return rootAdminNavigation;
  }
  if (role === "tenant-admin") {
    return tenantAdminNavigation;
  }
  return [];
}

// Public Header Navigation
export const publicNavigation: NavItem[] = [
  {
    title: "Tính năng",
    href: "#features",
    icon: GraduationCap,
  },
  {
    title: "Giải đấu",
    href: "#tournaments",
    icon: Trophy,
  },
  {
    title: "Về chúng tôi",
    href: "#about",
    icon: Shield,
  },
];
