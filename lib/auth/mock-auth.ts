/**
 * Mock Auth Service
 * Implementation of AuthService with LocalStorage persistence
 */

import type { MockUser } from "../mock/users";
import { getUserByEmail, mockUsers } from "../mock/users";
import type {
  AuthService,
  AuthState,
  AuthUser,
  LoginCredentials,
  UserRole,
} from "./types";
import { LOGIN_REDIRECT, type Permission } from "./types";

const STORAGE_KEY = "lms_auth_user";

function mockUserToAuthUser(mockUser: MockUser): AuthUser {
  return {
    id: mockUser.id,
    tenantId: mockUser.tenantId,
    email: mockUser.email,
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    avatarUrl: mockUser.avatarUrl,
    role: mockUser.role, // Now the rich object
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

  hasPermission(permission: Permission): boolean {
    if (!this.user) return false;
    return this.user.role.permissions.includes(permission);
  }

  hasRole(roleName: string | string[]): boolean {
    if (!this.user) return false;
    const userRoleCode = this.user.role.code;
    if (Array.isArray(roleName)) {
      return roleName.includes(userRoleCode);
    }
    return userRoleCode === roleName;
  }

  getLoginRedirectPath(): string {
    if (!this.user) return "/auth/login";
    // Admin roles go to /admin, everyone else to /dashboard
    if (
      this.user.role.code === "root-admin" ||
      this.user.role.code === "tenant-admin"
    ) {
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
    return role.code === "root-admin" || role.code === "tenant-admin";
  }
  // All other routes are accessible - permissions are checked at component level
  return true;
}

export function getLayoutVariant(role: UserRole): "admin" | "dashboard" {
  if (role.code === "root-admin" || role.code === "tenant-admin") {
    return "admin";
  }
  return "dashboard";
}
