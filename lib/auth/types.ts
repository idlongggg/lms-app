/**
 * Auth Types
 * Type definitions for authentication system
 */

import type { MockUser, UserRole } from '../mock/users';

export type { UserRole } from '../mock/users';

export interface AuthUser {
  id: string;
  tenantId: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: UserRole;
  level: number;
  exp: number;
  coins: number;
  streak: number;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthService {
  // Get current auth state
  getState(): AuthState;

  // Login with credentials
  login(credentials: LoginCredentials): Promise<AuthUser | null>;

  // Login with mock user (for dev)
  loginWithMockUser(user: MockUser): Promise<AuthUser>;

  // Logout
  logout(): Promise<void>;

  // Check if user has permission
  hasPermission(permission: string): boolean;

  // Check if user has role
  hasRole(role: UserRole | UserRole[]): boolean;

  // Get redirect path after login based on role
  getLoginRedirectPath(): string;
}

// Permission definitions based on rbac.md
export const PERMISSIONS = {
  // Admin
  TENANT_CREATE: 'tenant:create',
  TENANT_READ: 'tenant:read',
  TENANT_UPDATE: 'tenant:update',
  TENANT_DELETE: 'tenant:delete',
  TENANT_SUSPEND: 'tenant:suspend',
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_IMPORT: 'user:import',
  USER_IMPERSONATE: 'user:impersonate',
  ROLE_ASSIGN: 'role:assign',

  // Content
  SUBJECT_CREATE: 'subject:create',
  SUBJECT_READ: 'subject:read',
  SUBJECT_UPDATE: 'subject:update',
  SUBJECT_DELETE: 'subject:delete',
  TOPIC_CREATE: 'topic:create',
  TOPIC_READ: 'topic:read',
  TOPIC_UPDATE: 'topic:update',
  TOPIC_DELETE: 'topic:delete',
  LESSON_CREATE: 'lesson:create',
  LESSON_READ: 'lesson:read',
  LESSON_UPDATE: 'lesson:update',
  LESSON_DELETE: 'lesson:delete',
  LESSON_PUBLISH: 'lesson:publish',
  QUESTION_CREATE: 'question:create',
  QUESTION_READ: 'question:read',
  QUESTION_UPDATE: 'question:update',
  QUESTION_DELETE: 'question:delete',
  QUESTION_IMPORT: 'question:import',
  MEDIA_UPLOAD: 'media:upload',
  MEDIA_DELETE: 'media:delete',

  // Learning
  PROGRESS_READ: 'progress:read',
  PROGRESS_READ_OWN: 'progress:read_own',
  PROGRESS_READ_CHILD: 'progress:read_child',
  EXERCISE_SUBMIT: 'exercise:submit',
  LEARNING_PATH_READ: 'learning_path:read',

  // Tournament
  TOURNAMENT_CREATE: 'tournament:create',
  TOURNAMENT_READ: 'tournament:read',
  TOURNAMENT_UPDATE: 'tournament:update',
  TOURNAMENT_DELETE: 'tournament:delete',
  TOURNAMENT_JOIN: 'tournament:join',
  TOURNAMENT_SUBMIT: 'tournament:submit',

  // Gamification
  LEADERBOARD_READ: 'leaderboard:read',
  REWARD_REDEEM: 'reward:redeem',
  BADGE_READ: 'badge:read',

  // Analytics
  REPORT_READ: 'report:read',
  REPORT_READ_OWN: 'report:read_own',
  REPORT_EXPORT: 'report:export',
  ANALYTICS_DASHBOARD: 'analytics:dashboard',
} as const;

// Role permissions mapping based on rbac.md
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  'root-admin': Object.values(PERMISSIONS), // All permissions

  'tenant-admin': [
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

// Route access control
export const ROUTE_ACCESS: Record<string, UserRole[]> = {
  // Admin routes - only admin roles
  '/admin': ['root-admin', 'tenant-admin'],
  '/admin/users': ['root-admin', 'tenant-admin'],
  '/admin/content': ['root-admin', 'tenant-admin', 'teacher'],
  '/admin/settings': ['root-admin', 'tenant-admin'],
  '/admin/tenants': ['root-admin'],
  '/admin/tournaments': ['tenant-admin'],
  '/admin/reports': ['root-admin', 'tenant-admin'],
  '/admin/health': ['root-admin'],
  '/admin/alerts': ['root-admin'],

  // Dashboard - all authenticated users but different views
  '/dashboard': ['root-admin', 'tenant-admin', 'teacher', 'student', 'parent'],
  '/dashboard/stats': ['root-admin', 'tenant-admin', 'teacher', 'student', 'parent'],
  '/dashboard/activity': ['root-admin', 'tenant-admin', 'teacher', 'student', 'parent'],
  '/dashboard/classes': ['teacher'],
  '/dashboard/children': ['parent'],

  // Learning routes
  '/learning': ['teacher', 'student', 'parent'],
  '/learning/courses': ['teacher', 'student'],
  '/learning/in-progress': ['student'],
  '/learning/completed': ['student', 'parent'],
  '/learning/recommended': ['student'],
  '/learning/questions': ['teacher'],
  '/learning/classes': ['teacher'],
  '/learning/class-progress': ['teacher'],

  // Tournament routes
  '/tournament': ['root-admin', 'tenant-admin', 'teacher', 'student', 'parent'],
  '/tournament/live': ['student'],
  '/tournament/schedule': ['root-admin', 'tenant-admin', 'teacher', 'student'],
  '/tournament/leaderboard': ['root-admin', 'tenant-admin', 'teacher', 'student', 'parent'],
  '/tournament/medals': ['student'],
  '/tournament/history': ['student'],
  '/tournament/create': ['teacher', 'tenant-admin'],
  '/tournament/manage': ['teacher'],
  '/tournament/my-tournaments': ['teacher'],
  '/tournament/join': ['student'],
  '/tournament/children': ['parent'],
  '/tournament/child-achievements': ['parent'],

  // Rewards - student only
  '/rewards': ['student'],
  '/rewards/coins': ['student'],
  '/rewards/redeemed': ['student'],

  // News - all users
  '/news': ['root-admin', 'tenant-admin', 'teacher', 'student', 'parent'],
  '/news/announcements': ['root-admin', 'tenant-admin', 'teacher', 'student', 'parent'],
  '/news/events': ['root-admin', 'tenant-admin', 'teacher', 'student', 'parent'],

  // Profile - all users
  '/profile': ['root-admin', 'tenant-admin', 'teacher', 'student', 'parent'],
  '/profile/settings': ['root-admin', 'tenant-admin', 'teacher', 'student', 'parent'],
};

// Login redirect paths by role
export const LOGIN_REDIRECT: Record<UserRole, string> = {
  'root-admin': '/admin',
  'tenant-admin': '/admin',
  teacher: '/dashboard',
  student: '/dashboard',
  parent: '/dashboard',
};
