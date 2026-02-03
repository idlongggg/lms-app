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

// Dashboard Sidebar Navigation
export const dashboardNavigation: NavGroup[] = [
  {
    items: [
      {
        title: "Trang chủ",
        href: "/dashboard",
        icon: Home,
      },
    ],
  },
  {
    title: "Học tập",
    items: [
      {
        title: "Bài học của tôi",
        href: "/learning",
        icon: BookOpen,
      },
      {
        title: "Giải đấu",
        href: "/tournament",
        icon: Swords,
      },
    ],
  },
  {
    title: "Cá nhân",
    items: [
      {
        title: "Hồ sơ",
        href: "/profile",
        icon: User,
      },
    ],
  },
];

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
