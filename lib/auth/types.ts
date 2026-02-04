/**
 * Auth Types
 * Type definitions for authentication system
 */

import type { MockUser, UserRole } from "../mock/users";

// Re-export from constants for backward compatibility
export type { UserRole } from "../mock/users";
export { type Permission, PERMISSIONS } from "../permissions";

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
  getState(): AuthState;
  login(credentials: LoginCredentials): Promise<AuthUser | null>;
  loginWithMockUser(user: MockUser): Promise<AuthUser>;
  logout(): Promise<void>;
  hasPermission(permission: string): boolean;
  hasRole(role: UserRole | UserRole[]): boolean;
  getLoginRedirectPath(): string;
}

// Unified login redirect - all users go to dashboard
// Role-specific content is rendered via permissions within the page
export const LOGIN_REDIRECT = "/dashboard";
