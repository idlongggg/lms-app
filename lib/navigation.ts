import {
  BookOpen,
  GraduationCap,
  Home,
  LayoutDashboard,
  Settings,
  Shield,
  Swords,
  Trophy,
  User,
  Users,
  FileText,
  Gift,
  Newspaper,
  BarChart3,
  Target,
  History,
  Star,
  Calendar,
  Medal,
  ShoppingBag,
  Coins,
  Clock,
  Bell,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: NavItem[];
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

// Dashboard Center Navigation (Header tabs)
export interface DashboardTab {
  title: string;
  href: string;
  icon: LucideIcon;
  key: string;
}

export const dashboardTabs: DashboardTab[] = [
  { title: "Tổng quan", href: "/dashboard", icon: Home, key: "overview" },
  { title: "Học tập", href: "/learning", icon: BookOpen, key: "learning" },
  { title: "Thách đấu", href: "/tournament", icon: Swords, key: "tournament" },
  { title: "Đổi quà", href: "/rewards", icon: Gift, key: "rewards" },
  { title: "Tin tức", href: "/news", icon: Newspaper, key: "news" },
];

// Sidebar navigation per tab
export const dashboardSidebars: Record<string, NavGroup[]> = {
  overview: [
    {
      items: [
        { title: "Tổng quan", href: "/dashboard", icon: Home },
        { title: "Thống kê", href: "/dashboard/stats", icon: BarChart3 },
        { title: "Hoạt động gần đây", href: "/dashboard/activity", icon: History },
      ],
    },
  ],
  learning: [
    {
      items: [
        { title: "Bài học của tôi", href: "/learning", icon: BookOpen },
        { title: "Đang học", href: "/learning/in-progress", icon: Clock },
        { title: "Hoàn thành", href: "/learning/completed", icon: Star },
      ],
    },
    {
      title: "Khám phá",
      items: [
        { title: "Tất cả khóa học", href: "/learning/courses", icon: GraduationCap },
        { title: "Đề xuất cho bạn", href: "/learning/recommended", icon: Target },
      ],
    },
  ],
  tournament: [
    {
      items: [
        { title: "Sảnh đấu", href: "/tournament", icon: Swords },
        { title: "Lịch đấu", href: "/tournament/schedule", icon: Calendar },
        { title: "Giải đấu live", href: "/tournament/live", icon: TrendingUp, badge: "LIVE" },
      ],
    },
    {
      title: "Thành tích",
      items: [
        { title: "Bảng xếp hạng", href: "/tournament/leaderboard", icon: Trophy },
        { title: "Huy chương", href: "/tournament/medals", icon: Medal },
        { title: "Lịch sử đấu", href: "/tournament/history", icon: History },
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
export function getSidebarForPath(pathname: string): NavGroup[] {
  if (pathname.startsWith("/learning")) return dashboardSidebars.learning;
  if (pathname.startsWith("/tournament")) return dashboardSidebars.tournament;
  if (pathname.startsWith("/rewards")) return dashboardSidebars.rewards;
  if (pathname.startsWith("/news")) return dashboardSidebars.news;
  if (pathname.startsWith("/profile")) return dashboardSidebars.profile;
  return dashboardSidebars.overview;
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

// Admin Sidebar Navigation
export const adminNavigation: NavGroup[] = [
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
