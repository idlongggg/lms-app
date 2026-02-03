/**
 * Mock Auth Service
 * Implementation of AuthService with LocalStorage persistence
 */

import type { MockUser } from '../mock/users';
import { getUserByEmail, mockUsers } from '../mock/users';
import type { AuthService, AuthState, AuthUser, LoginCredentials, UserRole } from './types';
import { LOGIN_REDIRECT, ROLE_PERMISSIONS } from './types';

const STORAGE_KEY = 'lms_auth_user';

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
  if (typeof window === 'undefined') return null;

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
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function clearUserFromStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

class MockAuthServiceImpl implements AuthService {
  private user: AuthUser | null = null;
  private isLoading: boolean = true;
  private listeners: Set<() => void> = new Set();

  constructor() {
    // Load from storage on init (client-side only)
    if (typeof window !== 'undefined') {
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
    const rolePermissions = ROLE_PERMISSIONS[this.user.role] || [];
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
    if (!this.user) return '/auth/login';
    return LOGIN_REDIRECT[this.user.role] || '/dashboard';
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

// Route access map (moved here to avoid circular dependency)
const ROUTE_ACCESS: Record<string, UserRole[]> = {
  '/admin': ['root-admin', 'tenant-admin'],
  '/admin/tenants': ['root-admin'],
  '/admin/users': ['root-admin', 'tenant-admin'],
  '/admin/health': ['root-admin'],
  '/admin/alerts': ['root-admin'],
  '/admin/settings': ['root-admin', 'tenant-admin'],
  '/admin/content': ['tenant-admin'],
  '/admin/tournaments': ['tenant-admin'],
  '/admin/reports': ['tenant-admin'],
  '/dashboard': ['teacher', 'student', 'parent'],
  '/learning': ['teacher', 'student', 'parent'],
  '/tournament': ['teacher', 'student', 'parent'],
  '/rewards': ['teacher', 'student', 'parent'],
  '/news': ['teacher', 'student', 'parent'],
  '/profile': ['teacher', 'student', 'parent'],
};

// Helper functions
export function canAccessRoute(path: string, role: UserRole): boolean {
  // Use local ROUTE_ACCESS to avoid circular dependency

  // Check exact match first
  if (ROUTE_ACCESS[path]) {
    return ROUTE_ACCESS[path].includes(role);
  }

  // Check parent paths
  const pathParts = path.split('/').filter(Boolean);
  while (pathParts.length > 0) {
    const parentPath = '/' + pathParts.join('/');
    if (ROUTE_ACCESS[parentPath]) {
      return ROUTE_ACCESS[parentPath].includes(role);
    }
    pathParts.pop();
  }

  // Default: allow if no specific rule
  return true;
}

export function getLayoutVariant(role: UserRole): 'admin' | 'dashboard' {
  if (role === 'root-admin' || role === 'tenant-admin') {
    return 'admin';
  }
  return 'dashboard';
}
