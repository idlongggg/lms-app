import {
  Activity,
  AlertTriangle,
  Baby,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  Clock,
  Coins,
  FileText,
  Gift,
  GraduationCap,
  History,
  Home,
  LayoutDashboard,
  type LucideIcon,
  Medal,
  Newspaper,
  Settings,
  Shield,
  ShoppingBag,
  Star,
  Swords,
  Target,
  TrendingUp,
  Trophy,
  User,
  Users,
} from 'lucide-react';

import type { UserRole } from './auth/types';

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
  { title: 'Tổng quan', href: '/dashboard', icon: Home, key: 'overview' },
  {
    title: 'Học tập',
    href: '/learning',
    icon: BookOpen,
    key: 'learning',
    roles: ['teacher', 'student', 'parent'],
  },
  { title: 'Thách đấu', href: '/tournament', icon: Swords, key: 'tournament' },
  { title: 'Đổi quà', href: '/rewards', icon: Gift, key: 'rewards', roles: ['student'] },
  { title: 'Tin tức', href: '/news', icon: Newspaper, key: 'news' },
];

// Get tabs filtered by role
export function getTabsByRole(role: UserRole): DashboardTab[] {
  // Admin roles use admin layout, not tabs
  if (role === 'root-admin' || role === 'tenant-admin') {
    return [];
  }

  return allDashboardTabs.filter((tab) => {
    if (!tab.roles) return true; // No role restriction
    return tab.roles.includes(role);
  });
}

// Legacy export for compatibility
export const dashboardTabs: DashboardTab[] = allDashboardTabs;

// Sidebar navigation per tab
export const dashboardSidebars: Record<string, NavGroup[]> = {
  overview: [
    {
      items: [
        { title: 'Tổng quan', href: '/dashboard', icon: Home },
        { title: 'Thống kê', href: '/dashboard/stats', icon: BarChart3 },
        { title: 'Hoạt động gần đây', href: '/dashboard/activity', icon: History },
      ],
    },
  ],
  learning: [
    {
      items: [
        { title: 'Bài học của tôi', href: '/learning', icon: BookOpen },
        { title: 'Đang học', href: '/learning/in-progress', icon: Clock, roles: ['student'] },
        { title: 'Hoàn thành', href: '/learning/completed', icon: Star, roles: ['student'] },
      ],
    },
    {
      title: 'Khám phá',
      items: [
        { title: 'Tất cả khóa học', href: '/learning/courses', icon: GraduationCap },
        {
          title: 'Đề xuất cho bạn',
          href: '/learning/recommended',
          icon: Target,
          roles: ['student'],
        },
      ],
    },
  ],
  tournament: [
    {
      items: [
        { title: 'Sảnh đấu', href: '/tournament', icon: Swords },
        { title: 'Lịch đấu', href: '/tournament/schedule', icon: Calendar },
        {
          title: 'Giải đấu live',
          href: '/tournament/live',
          icon: TrendingUp,
          badge: 'LIVE',
          roles: ['student'],
        },
      ],
    },
    {
      title: 'Thành tích',
      items: [
        { title: 'Bảng xếp hạng', href: '/tournament/leaderboard', icon: Trophy },
        { title: 'Huy chương', href: '/tournament/medals', icon: Medal, roles: ['student'] },
        { title: 'Lịch sử đấu', href: '/tournament/history', icon: History, roles: ['student'] },
      ],
    },
  ],
  rewards: [
    {
      items: [
        { title: 'Cửa hàng', href: '/rewards', icon: ShoppingBag },
        { title: 'Xu của tôi', href: '/rewards/coins', icon: Coins },
        { title: 'Đã đổi', href: '/rewards/redeemed', icon: Gift },
      ],
    },
  ],
  news: [
    {
      items: [
        { title: 'Tin mới nhất', href: '/news', icon: Newspaper },
        { title: 'Thông báo', href: '/news/announcements', icon: Bell },
        { title: 'Sự kiện', href: '/news/events', icon: Calendar },
      ],
    },
  ],
  profile: [
    {
      items: [
        { title: 'Hồ sơ cá nhân', href: '/profile', icon: User },
        { title: 'Cài đặt', href: '/profile/settings', icon: Settings },
      ],
    },
  ],
};

// Teacher-specific sidebars
const teacherSidebars: Record<string, NavGroup[]> = {
  overview: [
    {
      items: [
        { title: 'Tổng quan', href: '/dashboard', icon: Home },
        { title: 'Lớp học của tôi', href: '/dashboard/classes', icon: Users },
        { title: 'Thống kê', href: '/dashboard/stats', icon: BarChart3 },
      ],
    },
  ],
  learning: [
    {
      title: 'Quản lý nội dung',
      items: [
        { title: 'Bài học', href: '/learning', icon: BookOpen },
        { title: 'Ngân hàng câu hỏi', href: '/learning/questions', icon: FileText },
        { title: 'Quản lý lớp', href: '/learning/classes', icon: Users },
      ],
    },
    {
      title: 'Theo dõi học sinh',
      items: [{ title: 'Tiến độ lớp', href: '/learning/class-progress', icon: BarChart3 }],
    },
  ],
  tournament: [
    {
      items: [
        { title: 'Sảnh đấu', href: '/tournament', icon: Swords },
        { title: 'Tạo giải đấu', href: '/tournament/create', icon: Calendar },
      ],
    },
    {
      title: 'Quản lý',
      items: [
        { title: 'Giải đấu của tôi', href: '/tournament/manage', icon: Trophy },
        { title: 'Bảng xếp hạng', href: '/tournament/leaderboard', icon: Medal },
      ],
    },
  ],
};

// Parent-specific sidebars
const parentSidebars: Record<string, NavGroup[]> = {
  overview: [
    {
      items: [
        { title: 'Tổng quan', href: '/dashboard', icon: Home },
        { title: 'Con của tôi', href: '/dashboard/children', icon: Baby },
        { title: 'Hoạt động gần đây', href: '/dashboard/activity', icon: History },
      ],
    },
  ],
  learning: [
    {
      items: [
        { title: 'Tiến độ học tập', href: '/learning', icon: BookOpen },
        { title: 'Bài đã hoàn thành', href: '/learning/completed', icon: Star },
      ],
    },
  ],
  tournament: [
    {
      items: [
        { title: 'Giải đấu', href: '/tournament', icon: Swords },
        { title: 'Bảng xếp hạng', href: '/tournament/leaderboard', icon: Trophy },
        { title: 'Thành tích con', href: '/tournament/children', icon: Medal },
      ],
    },
  ],
};

// Helper function to get sidebar based on current path and role
export function getSidebarForPath(pathname: string, role?: UserRole): NavGroup[] {
  const key = getActiveTabKey(pathname);

  // Role-specific sidebars
  if (role === 'teacher' && teacherSidebars[key]) {
    return teacherSidebars[key];
  }
  if (role === 'parent' && parentSidebars[key]) {
    return parentSidebars[key];
  }

  // Default sidebars (student)
  const sidebar = dashboardSidebars[key] || dashboardSidebars.overview;

  // Filter items by role
  if (role) {
    return sidebar
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (!item.roles) return true;
          return item.roles.includes(role);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }

  return sidebar;
}

// Helper function to get active tab key
export function getActiveTabKey(pathname: string): string {
  if (pathname.startsWith('/learning')) return 'learning';
  if (pathname.startsWith('/tournament')) return 'tournament';
  if (pathname.startsWith('/rewards')) return 'rewards';
  if (pathname.startsWith('/news')) return 'news';
  if (pathname.startsWith('/profile')) return 'profile';
  return 'overview';
}

// Legacy export for compatibility
export const dashboardNavigation: NavGroup[] = dashboardSidebars.overview;

// Admin Sidebar Navigation - Root Admin (system-wide)
export const rootAdminNavigation: NavGroup[] = [
  {
    items: [
      {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Hệ thống',
    items: [
      {
        title: 'Tenants',
        href: '/admin/tenants',
        icon: Building2,
      },
      {
        title: 'Người dùng',
        href: '/admin/users',
        icon: Users,
      },
    ],
  },
  {
    title: 'Giám sát',
    items: [
      {
        title: 'Trạng thái',
        href: '/admin/health',
        icon: Activity,
      },
      {
        title: 'Cảnh báo',
        href: '/admin/alerts',
        icon: AlertTriangle,
      },
      {
        title: 'Cài đặt',
        href: '/admin/settings',
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
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Quản lý',
    items: [
      {
        title: 'Người dùng',
        href: '/admin/users',
        icon: Users,
      },
      {
        title: 'Nội dung',
        href: '/admin/content',
        icon: FileText,
      },
      {
        title: 'Giải đấu',
        href: '/admin/tournaments',
        icon: Trophy,
      },
    ],
  },
  {
    title: 'Báo cáo',
    items: [
      {
        title: 'Thống kê',
        href: '/admin/reports',
        icon: BarChart3,
      },
    ],
  },
  {
    title: 'Hệ thống',
    items: [
      {
        title: 'Cài đặt',
        href: '/admin/settings',
        icon: Settings,
      },
    ],
  },
];

// Legacy export for compatibility
export const adminNavigation: NavGroup[] = tenantAdminNavigation;

// Get admin navigation by role
export function getAdminNavByRole(role: UserRole): NavGroup[] {
  if (role === 'root-admin') {
    return rootAdminNavigation;
  }
  if (role === 'tenant-admin') {
    return tenantAdminNavigation;
  }
  return [];
}

// Public Header Navigation
export const publicNavigation: NavItem[] = [
  {
    title: 'Tính năng',
    href: '#features',
    icon: GraduationCap,
  },
  {
    title: 'Giải đấu',
    href: '#tournaments',
    icon: Trophy,
  },
  {
    title: 'Về chúng tôi',
    href: '#about',
    icon: Shield,
  },
];
