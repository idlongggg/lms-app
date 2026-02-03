/**
 * Mock Admin Statistics Data
 * Dashboard stats for root-admin, tenant-admin roles
 */

import { getContentStats } from './courses';
import { getTournamentStats } from './tournaments';
import { mockUsers, tenants } from './users';

// System-wide stats (for root-admin)
export interface SystemStats {
  totalTenants: number;
  activeTenants: number;
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  totalLessons: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  uptime: string;
  lastBackup: string;
}

export function getSystemStats(): SystemStats {
  const contentStats = getContentStats();
  return {
    totalTenants: 2, // System + school
    activeTenants: 2,
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter((u) => u.status === 'ACTIVE').length,
    newUsersToday: 3,
    newUsersThisWeek: 15,
    newUsersThisMonth: 48,
    totalLessons: contentStats.totalLessons,
    systemHealth: 'healthy',
    uptime: '99.9%',
    lastBackup: '2026-02-03T02:00:00Z',
  };
}

// Tenant-specific stats (for tenant-admin)
export interface TenantStats {
  tenantId: string;
  tenantName: string;
  totalUsers: number;
  activeUsers: number;
  students: number;
  teachers: number;
  parents: number;
  newUsersThisWeek: number;
  totalLessons: number;
  publishedLessons: number;
  totalQuestions: number;
  activeTournaments: number;
  completedTournaments: number;
}

export function getTenantStats(tenantId: string): TenantStats {
  const tenant = tenantId === tenants.system.id ? tenants.system : tenants.school;
  const tenantUsers = mockUsers.filter((u) => u.tenantId === tenantId);
  const contentStats = getContentStats();
  const tournamentStats = getTournamentStats();

  return {
    tenantId,
    tenantName: tenant.name,
    totalUsers: tenantUsers.length,
    activeUsers: tenantUsers.filter((u) => u.status === 'ACTIVE').length,
    students: tenantUsers.filter((u) => u.role === 'student').length,
    teachers: tenantUsers.filter((u) => u.role === 'teacher').length,
    parents: tenantUsers.filter((u) => u.role === 'parent').length,
    newUsersThisWeek: 8,
    totalLessons: contentStats.totalLessons,
    publishedLessons: contentStats.publishedLessons,
    totalQuestions: contentStats.totalQuestions,
    activeTournaments: tournamentStats.live + tournamentStats.upcoming,
    completedTournaments: tournamentStats.completed,
  };
}

// Dashboard cards data
export interface DashboardCard {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: string;
  href?: string;
}

export function getAdminDashboardCards(
  role: 'root-admin' | 'tenant-admin',
  tenantId?: string,
): DashboardCard[] {
  if (role === 'root-admin') {
    const stats = getSystemStats();
    return [
      {
        id: 'total-tenants',
        title: 'Tổng Tenants',
        value: stats.totalTenants,
        icon: 'Building2',
        color: '#3498db',
        href: '/admin/tenants',
      },
      {
        id: 'total-users',
        title: 'Tổng người dùng',
        value: stats.totalUsers,
        change: 12,
        changeLabel: 'so với tuần trước',
        icon: 'Users',
        color: '#2ecc71',
        href: '/admin/users',
      },
      {
        id: 'active-users',
        title: 'Đang hoạt động',
        value: stats.activeUsers,
        icon: 'UserCheck',
        color: '#f39c12',
      },
      {
        id: 'system-health',
        title: 'Trạng thái hệ thống',
        value: stats.systemHealth === 'healthy' ? 'Tốt' : 'Cảnh báo',
        icon: 'Activity',
        color: stats.systemHealth === 'healthy' ? '#27ae60' : '#e74c3c',
        href: '/admin/settings',
      },
    ];
  }

  // Tenant-admin
  const stats = getTenantStats(tenantId || tenants.school.id);
  return [
    {
      id: 'total-students',
      title: 'Học sinh',
      value: stats.students,
      change: 5,
      changeLabel: 'mới tuần này',
      icon: 'GraduationCap',
      color: '#3498db',
      href: '/admin/users?role=student',
    },
    {
      id: 'total-teachers',
      title: 'Giáo viên',
      value: stats.teachers,
      icon: 'UserCog',
      color: '#2ecc71',
      href: '/admin/users?role=teacher',
    },
    {
      id: 'published-lessons',
      title: 'Bài học',
      value: stats.publishedLessons,
      icon: 'BookOpen',
      color: '#9b59b6',
      href: '/admin/content',
    },
    {
      id: 'active-tournaments',
      title: 'Giải đấu',
      value: stats.activeTournaments,
      icon: 'Trophy',
      color: '#f39c12',
      href: '/admin/tournaments',
    },
  ];
}

// User growth chart data
export interface ChartDataPoint {
  date: string;
  label: string;
  value: number;
}

export function getUserGrowthData(days: number = 7): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const baseDate = new Date('2026-02-03');

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric' }),
      value: Math.floor(Math.random() * 10) + 5, // Random 5-15 new users per day
    });
  }

  return data;
}

// Activity distribution
export interface ActivityData {
  name: string;
  value: number;
  color: string;
}

export function getActivityDistribution(): ActivityData[] {
  return [
    { name: 'Học bài', value: 45, color: '#3498db' },
    { name: 'Làm quiz', value: 30, color: '#2ecc71' },
    { name: 'Thi đấu', value: 15, color: '#e74c3c' },
    { name: 'Xem video', value: 10, color: '#f39c12' },
  ];
}

// Recent users list
export interface RecentUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  joinedAt: string;
  status: string;
}

export function getRecentUsers(limit: number = 5): RecentUser[] {
  return mockUsers
    .filter((u) => u.role !== 'root-admin')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
    .map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      avatar: u.avatarUrl,
      role: u.role,
      joinedAt: u.createdAt,
      status: u.status,
    }));
}

// System alerts
export interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

export function getSystemAlerts(): SystemAlert[] {
  return [
    {
      id: 'alert-001',
      type: 'warning',
      title: 'Disk space low',
      message: 'Server storage đạt 85% dung lượng',
      timestamp: '2026-02-03T08:00:00Z',
      resolved: false,
    },
    {
      id: 'alert-002',
      type: 'info',
      title: 'Backup completed',
      message: 'Database backup hoàn thành lúc 02:00',
      timestamp: '2026-02-03T02:00:00Z',
      resolved: true,
    },
    {
      id: 'alert-003',
      type: 'info',
      title: 'New version available',
      message: 'Phiên bản 2.1.0 đã sẵn sàng để cập nhật',
      timestamp: '2026-02-02T10:00:00Z',
      resolved: false,
    },
  ];
}

// Admin users list (for user management page)
export interface AdminUserListItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  role: string;
  roleLabel: string;
  status: string;
  statusLabel: string;
  level: number;
  exp: number;
  lastActive: string;
  createdAt: string;
}

const roleLabels: Record<string, string> = {
  'root-admin': 'Admin hệ thống',
  'tenant-admin': 'Admin trường',
  teacher: 'Giáo viên',
  student: 'Học sinh',
  parent: 'Phụ huynh',
};

const statusLabels: Record<string, string> = {
  ACTIVE: 'Hoạt động',
  PENDING: 'Chờ xác thực',
  SUSPENDED: 'Đã khóa',
  PENDING_DEACTIVATION: 'Chờ xóa',
};

export function getAdminUserList(
  tenantId?: string,
  filters?: { role?: string; status?: string; search?: string },
): AdminUserListItem[] {
  let users = mockUsers;

  // Filter by tenant (tenant-admin only sees their tenant)
  if (tenantId) {
    users = users.filter((u) => u.tenantId === tenantId);
  }

  // Apply filters
  if (filters?.role) {
    users = users.filter((u) => u.role === filters.role);
  }
  if (filters?.status) {
    users = users.filter((u) => u.status === filters.status);
  }
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search) ||
        (u.phone && u.phone.includes(search)),
    );
  }

  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    avatar: u.avatarUrl,
    role: u.role,
    roleLabel: roleLabels[u.role] || u.role,
    status: u.status,
    statusLabel: statusLabels[u.status] || u.status,
    level: u.profile.level,
    exp: u.profile.exp,
    lastActive: u.streak.lastActive,
    createdAt: u.createdAt,
  }));
}

// Content management list
export interface ContentListItem {
  id: string;
  title: string;
  type: 'subject' | 'topic' | 'lesson' | 'question';
  typeLabel: string;
  status: string;
  statusLabel: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export function getContentList(): ContentListItem[] {
  // Mock content list combining subjects, lessons
  return [
    {
      id: 'subject-math',
      title: 'Toán học',
      type: 'subject',
      typeLabel: 'Môn học',
      status: 'PUBLISHED',
      statusLabel: 'Đã xuất bản',
      author: 'Admin',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'lesson-math-1',
      title: 'Số nguyên tố và hợp số',
      type: 'lesson',
      typeLabel: 'Bài học',
      status: 'PUBLISHED',
      statusLabel: 'Đã xuất bản',
      author: 'Trần Thị Giáo Viên',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-02-01T00:00:00Z',
    },
    {
      id: 'lesson-math-2',
      title: 'Ước và bội số',
      type: 'lesson',
      typeLabel: 'Bài học',
      status: 'PUBLISHED',
      statusLabel: 'Đã xuất bản',
      author: 'Trần Thị Giáo Viên',
      createdAt: '2024-01-20T00:00:00Z',
      updatedAt: '2024-02-05T00:00:00Z',
    },
    {
      id: 'lesson-en-2',
      title: 'Past Simple Tense',
      type: 'lesson',
      typeLabel: 'Bài học',
      status: 'DRAFT',
      statusLabel: 'Nháp',
      author: 'Trần Thị Giáo Viên',
      createdAt: '2024-02-01T00:00:00Z',
      updatedAt: '2024-02-01T00:00:00Z',
    },
  ];
}

// Settings data
export interface SystemSettings {
  general: {
    appName: string;
    tagline: string;
    logoUrl: string | null;
    timezone: string;
    language: string;
  };
  security: {
    passwordMinLength: number;
    passwordRequireSpecial: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    twoFactorEnabled: boolean;
  };
  notification: {
    emailEnabled: boolean;
    pushEnabled: boolean;
    digestFrequency: 'daily' | 'weekly' | 'never';
  };
}

export function getSystemSettings(): SystemSettings {
  return {
    general: {
      appName: 'LMS Platform',
      tagline: 'Học tập thông minh, tiến bộ mỗi ngày',
      logoUrl: null,
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi',
    },
    security: {
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      sessionTimeout: 30, // Minutes
      maxLoginAttempts: 5,
      twoFactorEnabled: false,
    },
    notification: {
      emailEnabled: true,
      pushEnabled: true,
      digestFrequency: 'daily',
    },
  };
}

// Recent activity feed for admin dashboard
export interface RecentActivityItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  description: string;
  time: string;
  userId?: string;
  userName?: string;
}

export function getRecentActivity(tenantId?: string): RecentActivityItem[] {
  return [
    {
      id: 'activity-001',
      type: 'success',
      title: 'Học sinh mới đăng ký',
      description: 'Nguyễn Văn Học Sinh đã hoàn tất đăng ký tài khoản',
      time: '5 phút trước',
      userId: 'user-student',
      userName: 'Nguyễn Văn Học Sinh',
    },
    {
      id: 'activity-002',
      type: 'info',
      title: 'Bài học mới được xuất bản',
      description: 'Giáo viên Trần đã xuất bản bài "Số nguyên tố"',
      time: '30 phút trước',
      userId: 'user-teacher',
      userName: 'Trần Thị Giáo Viên',
    },
    {
      id: 'activity-003',
      type: 'warning',
      title: 'Dung lượng lưu trữ',
      description: 'Đã sử dụng 85% dung lượng lưu trữ',
      time: '1 giờ trước',
    },
    {
      id: 'activity-004',
      type: 'success',
      title: 'Giải đấu kết thúc',
      description: 'Giải "Toán Siêu Tốc" đã kết thúc với 45 người tham gia',
      time: '2 giờ trước',
    },
    {
      id: 'activity-005',
      type: 'info',
      title: 'Backup hoàn thành',
      description: 'Database backup hoàn thành lúc 02:00',
      time: '6 giờ trước',
    },
  ];
}
