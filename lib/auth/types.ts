/**
 * Auth Types
 * Type definitions for authentication system
 */

import type { UserRole } from "../types/user";
import type { MockUser } from "../mock/users";

// Re-export from constants for backward compatibility
export type { UserRole } from "../types/user";
export { type Permission, PERMISSIONS } from "../constants/permissions";

export interface AuthUser {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
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

import { Permission } from "../constants/permissions";

export interface AuthService {
  getState(): AuthState;
  login(credentials: LoginCredentials): Promise<AuthUser | null>;
  loginWithMockUser(user: MockUser): Promise<AuthUser>;
  logout(): Promise<void>;
  hasPermission(permission: Permission): boolean;
  hasRole(roleName: string | string[]): boolean;
  getLoginRedirectPath(): string;
}

// Unified login redirect - all users go to dashboard
// Role-specific content is rendered via permissions within the page
export const LOGIN_REDIRECT = "/dashboard";
