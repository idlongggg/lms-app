import { Permission } from "../permissions";

export type UserStatus =
  | "PENDING"
  | "ACTIVE"
  | "SUSPENDED"
  | "PENDING_DEACTIVATION";

export type ThemePreference = "LIGHT" | "DARK";

export interface UserRole {
  code: string;
  name: string;
  color: string;
  permissions: Permission[];
}

export interface User {
  id: string;
  tenantId: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  provider: "INTERNAL" | "GOOGLE" | null;
  providerId: string | null;
  status: UserStatus;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  role: UserRole;
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

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActive: string;
}
