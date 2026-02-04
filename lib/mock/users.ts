/**
 * Mock Users Data
 * Based on database.md schema: User, UserProfile, UserSession
 * Based on rbac.md: 5 roles (root-admin, tenant-admin, teacher, student, parent)
 */

export type UserRole =
  | "root-admin"
  | "tenant-admin"
  | "teacher"
  | "student"
  | "parent";

export type UserStatus =
  | "PENDING"
  | "ACTIVE"
  | "SUSPENDED"
  | "PENDING_DEACTIVATION";

export type ThemePreference = "LIGHT" | "DARK";

export interface User {
  id: string;
  tenantId: string;
  email: string;
  phone: string | null;
  name: string;
  avatarUrl: string | null;
  provider: "INTERNAL" | "GOOGLE" | null;
  providerId: string | null;
  status: UserStatus;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UserProfile {
  userId: string;
  exp: number;
  level: number;
  coins: number;
  currentLevelExp: number;
  nextLevelExp: number;
  theme: ThemePreference;
  locale: string | null;
  updatedAt: string;
}

export interface UserRole_ {
  id: string;
  userId: string;
  roleId: string;
  tenantId: string;
  assignedAt: string;
}

export interface Role {
  id: string;
  tenantId: string | null;
  code: UserRole;
  name: string;
  description: string | null;
  color: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActive: string;
}

export interface MockUser extends User {
  role: UserRole;
  profile: UserProfile;
  streak: Streak;
}

// Tenants
export const tenants = {
  system: {
    id: "tenant-system",
    code: "system",
    name: "LMS System",
    domain: "lms.vn",
    logoUrl: null,
    status: "ACTIVE" as const,
    settings: {},
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  school: {
    id: "tenant-school-001",
    code: "school-001",
    name: "Trường THCS ABC",
    domain: "school.vn",
    logoUrl: null,
    status: "ACTIVE" as const,
    settings: {},
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
};

// Roles
export const roles: Role[] = [
  {
    id: "role-root-admin",
    tenantId: null, // System-wide
    code: "root-admin",
    name: "Quản trị viên hệ thống",
    description: "Toàn quyền trên hệ thống",
    color: "#e74c3c",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "role-tenant-admin",
    tenantId: tenants.school.id,
    code: "tenant-admin",
    name: "Quản trị viên trường",
    description: "Quản lý tenant",
    color: "#3498db",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "role-teacher",
    tenantId: tenants.school.id,
    code: "teacher",
    name: "Giáo viên",
    description: "Quản lý học liệu",
    color: "#2ecc71",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "role-student",
    tenantId: tenants.school.id,
    code: "student",
    name: "Học sinh",
    description: "Học viên",
    color: "#f39c12",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "role-parent",
    tenantId: tenants.school.id,
    code: "parent",
    name: "Phụ huynh",
    description: "Xem báo cáo con",
    color: "#9b59b6",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
];

// Mock Users - 5 users for 5 roles
export const mockUsers: MockUser[] = [
  // Root Admin
  {
    id: "user-root-admin",
    tenantId: tenants.system.id,
    email: "root@lms.vn",
    phone: null,
    name: "Admin Hệ Thống",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=root",
    provider: "INTERNAL",
    providerId: null,
    status: "ACTIVE",
    emailVerifiedAt: "2024-01-01T00:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
    role: "root-admin",
    profile: {
      userId: "user-root-admin",
      exp: 0,
      level: 99,
      coins: 999999,
      currentLevelExp: 0,
      nextLevelExp: 0,
      theme: "DARK",
      locale: "vi",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    streak: {
      userId: "user-root-admin",
      currentStreak: 0,
      longestStreak: 0,
      lastActive: "2026-02-03T00:00:00Z",
    },
  },
  // Tenant Admin
  {
    id: "user-tenant-admin",
    tenantId: tenants.school.id,
    email: "admin@school.vn",
    phone: "0901234567",
    name: "Nguyễn Văn Quản Lý",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    provider: "INTERNAL",
    providerId: null,
    status: "ACTIVE",
    emailVerifiedAt: "2024-01-15T00:00:00Z",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    deletedAt: null,
    role: "tenant-admin",
    profile: {
      userId: "user-tenant-admin",
      exp: 5000,
      level: 10,
      coins: 50000,
      currentLevelExp: 500,
      nextLevelExp: 1000,
      theme: "DARK",
      locale: "vi",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    streak: {
      userId: "user-tenant-admin",
      currentStreak: 15,
      longestStreak: 45,
      lastActive: "2026-02-03T00:00:00Z",
    },
  },
  // Teacher
  {
    id: "user-teacher",
    tenantId: tenants.school.id,
    email: "teacher@school.vn",
    phone: "0902345678",
    name: "Trần Thị Giáo Viên",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher",
    provider: "INTERNAL",
    providerId: null,
    status: "ACTIVE",
    emailVerifiedAt: "2024-02-01T00:00:00Z",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
    deletedAt: null,
    role: "teacher",
    profile: {
      userId: "user-teacher",
      exp: 12000,
      level: 15,
      coins: 8500,
      currentLevelExp: 700,
      nextLevelExp: 1500,
      theme: "LIGHT",
      locale: "vi",
      updatedAt: "2024-02-01T00:00:00Z",
    },
    streak: {
      userId: "user-teacher",
      currentStreak: 30,
      longestStreak: 60,
      lastActive: "2026-02-03T00:00:00Z",
    },
  },
  // Student
  {
    id: "user-student",
    tenantId: tenants.school.id,
    email: "student@school.vn",
    phone: "0903456789",
    name: "Lê Văn Học Sinh",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=student",
    provider: "INTERNAL",
    providerId: null,
    status: "ACTIVE",
    emailVerifiedAt: "2024-03-01T00:00:00Z",
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
    deletedAt: null,
    role: "student",
    profile: {
      userId: "user-student",
      exp: 3500,
      level: 8,
      coins: 1250,
      currentLevelExp: 350,
      nextLevelExp: 800,
      theme: "LIGHT",
      locale: "vi",
      updatedAt: "2024-03-01T00:00:00Z",
    },
    streak: {
      userId: "user-student",
      currentStreak: 7,
      longestStreak: 21,
      lastActive: "2026-02-03T00:00:00Z",
    },
  },
  // Parent
  {
    id: "user-parent",
    tenantId: tenants.school.id,
    email: "parent@school.vn",
    phone: "0904567890",
    name: "Phạm Thị Phụ Huynh",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=parent",
    provider: "INTERNAL",
    providerId: null,
    status: "ACTIVE",
    emailVerifiedAt: "2024-03-15T00:00:00Z",
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2024-03-15T00:00:00Z",
    deletedAt: null,
    role: "parent",
    profile: {
      userId: "user-parent",
      exp: 500,
      level: 2,
      coins: 200,
      currentLevelExp: 100,
      nextLevelExp: 300,
      theme: "LIGHT",
      locale: "vi",
      updatedAt: "2024-03-15T00:00:00Z",
    },
    streak: {
      userId: "user-parent",
      currentStreak: 3,
      longestStreak: 10,
      lastActive: "2026-02-03T00:00:00Z",
    },
  },
];

// Parent-Child Link (for parent role)
export const parentChildLinks = [
  {
    id: "link-001",
    parentId: "user-parent",
    childId: "user-student",
    inviteCode: "ABC123",
    status: "ACTIVE" as const,
    linkedAt: "2024-03-20T00:00:00Z",
    createdAt: "2024-03-15T00:00:00Z",
  },
];

// Helper functions
export function getUserByEmail(email: string): MockUser | undefined {
  return mockUsers.find((u) => u.email === email);
}

export function getUserById(id: string): MockUser | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function getUsersByRole(role: UserRole): MockUser[] {
  return mockUsers.filter((u) => u.role === role);
}

export function getUsersByTenant(tenantId: string): MockUser[] {
  return mockUsers.filter((u) => u.tenantId === tenantId);
}

export function getChildrenOfParent(parentId: string): MockUser[] {
  const links = parentChildLinks.filter(
    (l) => l.parentId === parentId && l.status === "ACTIVE",
  );
  return links
    .map((l) => getUserById(l.childId))
    .filter((u): u is MockUser => u !== undefined);
}

export function getRoleInfo(roleCode: UserRole): Role | undefined {
  return roles.find((r) => r.code === roleCode);
}

// Role display info
export const roleDisplayInfo: Record<
  UserRole,
  { label: string; color: string; description: string }
> = {
  "root-admin": {
    label: "Quản trị viên hệ thống",
    color: "#e74c3c",
    description: "Toàn quyền quản lý hệ thống",
  },
  "tenant-admin": {
    label: "Quản trị viên trường",
    color: "#3498db",
    description: "Quản lý người dùng và nội dung của trường",
  },
  teacher: {
    label: "Giáo viên",
    color: "#2ecc71",
    description: "Tạo và quản lý bài học, câu hỏi",
  },
  student: {
    label: "Học sinh",
    color: "#f39c12",
    description: "Học tập, thi đấu, đổi thưởng",
  },
  parent: {
    label: "Phụ huynh",
    color: "#9b59b6",
    description: "Theo dõi tiến độ học tập của con",
  },
};
