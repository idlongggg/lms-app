/**
 * Mock Auth Service
 * Implementation of AuthService with LocalStorage persistence
 */

import type { MockUser } from "../mock/users";
import { getUserByEmail, mockUsers } from "../mock/users";
import { PERMISSIONS } from "../permissions";
import type {
  AuthService,
  AuthState,
  AuthUser,
  LoginCredentials,
  UserRole,
} from "./types";
import { LOGIN_REDIRECT } from "./types";

const STORAGE_KEY = "lms_auth_user";

// Role permissions mapping (Moved from constants/permissions.ts for mock purposes)
const MOCK_ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  "root-admin": Object.values(PERMISSIONS), // All permissions

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

function mockUserToAuthUser(mockUser: MockUser): AuthUser {
  return {
    id: mockUser.id,
    tenantId: mockUser.tenantId,
    email: mockUser.email,
    name: mockUser.name,
    avatarUrl: mockUser.avatarUrl,
    role: mockUser.role,
    level: mockUser.profile.level,
    exp: mockUser.profile.exp,
    coins: mockUser.profile.coins,
    streak: mockUser.streak.currentStreak,
  };
}

function loadUserFromStorage(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as AuthUser;
    }
  } catch {
    // Invalid stored data
    localStorage.removeItem(STORAGE_KEY);
  }
  return null;
}

function saveUserToStorage(user: AuthUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function clearUserFromStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

class MockAuthServiceImpl implements AuthService {
  private user: AuthUser | null = null;
  private isLoading: boolean = true;
  private listeners: Set<() => void> = new Set();

  constructor() {
    // Load from storage on init (client-side only)
    if (typeof window !== "undefined") {
      this.user = loadUserFromStorage();
      this.isLoading = false;
    }
  }

  getState(): AuthState {
    return {
      user: this.user,
      isAuthenticated: this.user !== null,
      isLoading: this.isLoading,
    };
  }

  async login(credentials: LoginCredentials): Promise<AuthUser | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = getUserByEmail(credentials.email);
    if (!mockUser) {
      return null;
    }

    // In real app, would verify password here
    // For mock, any password works
    const authUser = mockUserToAuthUser(mockUser);
    this.user = authUser;
    saveUserToStorage(authUser);
    this.notifyListeners();
    return authUser;
  }

  async loginWithMockUser(mockUser: MockUser): Promise<AuthUser> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const authUser = mockUserToAuthUser(mockUser);
    this.user = authUser;
    saveUserToStorage(authUser);
    this.notifyListeners();
    return authUser;
  }

  async logout(): Promise<void> {
    this.user = null;
    clearUserFromStorage();
    this.notifyListeners();
  }

  hasPermission(permission: string): boolean {
    if (!this.user) return false;
    const rolePermissions = MOCK_ROLE_PERMISSIONS[this.user.role] || [];
    return rolePermissions.includes(permission);
  }

  hasRole(role: UserRole | UserRole[]): boolean {
    if (!this.user) return false;
    if (Array.isArray(role)) {
      return role.includes(this.user.role);
    }
    return this.user.role === role;
  }

  getLoginRedirectPath(): string {
    if (!this.user) return "/auth/login";
    // Admin roles go to /admin, everyone else to /dashboard
    if (this.user.role === "root-admin" || this.user.role === "tenant-admin") {
      return "/admin";
    }
    return LOGIN_REDIRECT;
  }

  // For React integration
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  // Helper to get all mock users (for dev login)
  getMockUsers(): MockUser[] {
    return mockUsers;
  }
}

// Singleton instance
export const mockAuthService = new MockAuthServiceImpl();

// Simplified route access - admin routes require admin roles, everything else is open
// Fine-grained access is controlled via permissions within components
export function canAccessRoute(path: string, role: UserRole): boolean {
  // Admin routes require admin roles
  if (path.startsWith("/admin")) {
    return role === "root-admin" || role === "tenant-admin";
  }
  // All other routes are accessible - permissions are checked at component level
  return true;
}

export function getLayoutVariant(role: UserRole): "admin" | "dashboard" {
  if (role === "root-admin" || role === "tenant-admin") {
    return "admin";
  }
  return "dashboard";
}
