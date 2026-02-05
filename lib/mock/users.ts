/**
 * Mock Users Data
 * Based on database.md schema: User, UserProfile, UserSession
 * Based on rbac.md: 5 roles (root-admin, tenant-admin, teacher, student, parent)
 */

import { PERMISSIONS, type Permission } from "../constants/permissions";
import type { User, UserProfile, Streak, UserRole } from "../types/user";

// Re-export types
export type { User, UserProfile, Streak, UserRole } from "../types/user";

// Role Logic helpers (previously in mock-auth)
const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  "root-admin": [
    // System
    PERMISSIONS.TENANT_CREATE,
    PERMISSIONS.TENANT_READ,
    PERMISSIONS.TENANT_UPDATE,
    PERMISSIONS.TENANT_DELETE,
    PERMISSIONS.TENANT_SUSPEND,

    // Users
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.USER_IMPORT,
    PERMISSIONS.USER_IMPERSONATE,
    PERMISSIONS.ROLE_ASSIGN,

    // Content (Full access)
    PERMISSIONS.SUBJECT_CREATE,
    PERMISSIONS.SUBJECT_READ,
    PERMISSIONS.SUBJECT_UPDATE,
    PERMISSIONS.SUBJECT_DELETE,
    PERMISSIONS.TOPIC_CREATE,
    PERMISSIONS.TOPIC_READ,
    PERMISSIONS.TOPIC_UPDATE,
    PERMISSIONS.TOPIC_DELETE,
    PERMISSIONS.LESSON_CREATE,
    PERMISSIONS.LESSON_READ,
    PERMISSIONS.LESSON_UPDATE,
    PERMISSIONS.LESSON_DELETE,
    PERMISSIONS.LESSON_PUBLISH,
    PERMISSIONS.QUESTION_CREATE,
    PERMISSIONS.QUESTION_READ,
    PERMISSIONS.QUESTION_UPDATE,
    PERMISSIONS.QUESTION_DELETE,
    PERMISSIONS.QUESTION_IMPORT,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.MEDIA_DELETE,

    // Progress & Gamification
    PERMISSIONS.PROGRESS_READ,
    PERMISSIONS.TOURNAMENT_CREATE,
    PERMISSIONS.TOURNAMENT_READ,
    PERMISSIONS.TOURNAMENT_UPDATE,
    PERMISSIONS.TOURNAMENT_DELETE,
    PERMISSIONS.LEADERBOARD_READ,

    // Analytics
    PERMISSIONS.ANALYTICS_DASHBOARD,
    PERMISSIONS.REPORT_READ,
    PERMISSIONS.REPORT_EXPORT,
  ],
  "tenant-admin": [
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.USER_IMPORT,
    PERMISSIONS.ROLE_ASSIGN,
    PERMISSIONS.SUBJECT_CREATE,
    PERMISSIONS.SUBJECT_READ,
    PERMISSIONS.SUBJECT_UPDATE,
    PERMISSIONS.SUBJECT_DELETE,
    PERMISSIONS.TOPIC_CREATE,
    PERMISSIONS.TOPIC_READ,
    PERMISSIONS.TOPIC_UPDATE,
    PERMISSIONS.TOPIC_DELETE,
    PERMISSIONS.LESSON_CREATE,
    PERMISSIONS.LESSON_READ,
    PERMISSIONS.LESSON_UPDATE,
    PERMISSIONS.LESSON_DELETE,
    PERMISSIONS.LESSON_PUBLISH,
    PERMISSIONS.QUESTION_CREATE,
    PERMISSIONS.QUESTION_READ,
    PERMISSIONS.QUESTION_UPDATE,
    PERMISSIONS.QUESTION_DELETE,
    PERMISSIONS.QUESTION_IMPORT,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.MEDIA_DELETE,
    PERMISSIONS.PROGRESS_READ,
    PERMISSIONS.TOURNAMENT_CREATE,
    PERMISSIONS.TOURNAMENT_READ,
    PERMISSIONS.TOURNAMENT_UPDATE,
    PERMISSIONS.TOURNAMENT_DELETE,
    PERMISSIONS.LEADERBOARD_READ,
    PERMISSIONS.REPORT_READ,
    PERMISSIONS.REPORT_EXPORT,
    PERMISSIONS.ANALYTICS_DASHBOARD,
  ],
  teacher: [
    PERMISSIONS.SUBJECT_READ,
    PERMISSIONS.TOPIC_CREATE,
    PERMISSIONS.TOPIC_READ,
    PERMISSIONS.TOPIC_UPDATE,
    PERMISSIONS.LESSON_CREATE,
    PERMISSIONS.LESSON_READ,
    PERMISSIONS.LESSON_UPDATE,
    PERMISSIONS.QUESTION_CREATE,
    PERMISSIONS.QUESTION_READ,
    PERMISSIONS.QUESTION_UPDATE,
    PERMISSIONS.QUESTION_DELETE,
    PERMISSIONS.QUESTION_IMPORT,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.PROGRESS_READ,
    PERMISSIONS.TOURNAMENT_CREATE,
    PERMISSIONS.TOURNAMENT_READ,
    PERMISSIONS.TOURNAMENT_UPDATE,
    PERMISSIONS.LEADERBOARD_READ,
    PERMISSIONS.REPORT_READ,
  ],
  student: [
    PERMISSIONS.SUBJECT_READ,
    PERMISSIONS.TOPIC_READ,
    PERMISSIONS.LESSON_READ,
    PERMISSIONS.QUESTION_READ,
    PERMISSIONS.PROGRESS_READ_OWN,
    PERMISSIONS.EXERCISE_SUBMIT,
    PERMISSIONS.LEARNING_PATH_READ,
    PERMISSIONS.TOURNAMENT_READ,
    PERMISSIONS.TOURNAMENT_JOIN,
    PERMISSIONS.TOURNAMENT_SUBMIT,
    PERMISSIONS.LEADERBOARD_READ,
    PERMISSIONS.REWARD_REDEEM,
    PERMISSIONS.BADGE_READ,
    PERMISSIONS.REPORT_READ_OWN,
  ],
  parent: [
    PERMISSIONS.PROGRESS_READ_CHILD,
    PERMISSIONS.TOURNAMENT_READ,
    PERMISSIONS.LEADERBOARD_READ,
    PERMISSIONS.BADGE_READ,
    PERMISSIONS.REPORT_READ_OWN,
  ],
};

export interface UserRoleAssignment {
  id: string;
  userId: string;
  roleId: string;
  tenantId: string;
  assignedAt: string;
}

export interface Role {
  id: string;
  tenantId: string | null;
  code: string;
  name: string;
  description: string | null;
  color: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MockUser extends User {
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

// Roles Catalog
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

// Helper to construct Role object
const createRole = (code: string): UserRole => {
  const roleDef = roles.find((r) => r.code === code);
  return {
    code: code,
    name: roleDef?.name || code,
    color: roleDef?.color || "#000000",
    permissions: ROLE_PERMISSIONS[code] || [],
  };
};

/*
 * Mock Users - 5 users for 5 roles
 */
export const mockUsers: MockUser[] = [
  // Root Admin
  {
    id: "user-root-admin",
    tenantId: tenants.system.id,
    email: "root@lms.vn",
    phone: null,
    firstName: "Admin",
    lastName: "Hệ Thống",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=root",
    provider: "INTERNAL",
    providerId: null,
    status: "ACTIVE",
    emailVerifiedAt: "2024-01-01T00:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    deletedAt: null,
    role: createRole("root-admin"),
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
    firstName: "Quản Lý",
    lastName: "Nguyễn Văn",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    provider: "INTERNAL",
    providerId: null,
    status: "ACTIVE",
    emailVerifiedAt: "2024-01-15T00:00:00Z",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    deletedAt: null,
    role: createRole("tenant-admin"),
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
    firstName: "Giáo Viên",
    lastName: "Trần Thị",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher",
    provider: "INTERNAL",
    providerId: null,
    status: "ACTIVE",
    emailVerifiedAt: "2024-02-01T00:00:00Z",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
    deletedAt: null,
    role: createRole("teacher"),
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
    firstName: "Học Sinh",
    lastName: "Lê Văn",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=student",
    provider: "INTERNAL",
    providerId: null,
    status: "ACTIVE",
    emailVerifiedAt: "2024-03-01T00:00:00Z",
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
    deletedAt: null,
    role: createRole("student"),
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
    firstName: "Phụ Huynh",
    lastName: "Phạm Thị",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=parent",
    provider: "INTERNAL",
    providerId: null,
    status: "ACTIVE",
    emailVerifiedAt: "2024-03-15T00:00:00Z",
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2024-03-15T00:00:00Z",
    deletedAt: null,
    role: createRole("parent"),
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

// Helper functions (updated for new structure)
export function getUserByEmail(email: string): MockUser | undefined {
  return mockUsers.find((u) => u.email === email);
}

export function getUserById(id: string): MockUser | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function getUsersByRole(roleName: string): MockUser[] {
  // Be permissive with role name matching as we used codes before
  return mockUsers.filter(
    (u) => u.role.code === roleName || u.role.name === roleName,
  );
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

export function getRoleInfo(roleCode: string): Role | undefined {
  return roles.find((r) => r.code === roleCode);
}
