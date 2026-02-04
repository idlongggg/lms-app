"use client";

import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { MockUser } from "../mock/users";
import { canAccessRoute, mockAuthService } from "./mock-auth";
import type { AuthState, AuthUser, UserRole } from "./types";

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<AuthUser | null>;
  loginWithMockUser: (user: MockUser) => Promise<AuthUser>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  canAccess: (path: string) => boolean;
  getMockUsers: () => MockUser[];
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize state from service
  useEffect(() => {
    // Use queueMicrotask to avoid sync setState in effect
    queueMicrotask(() => {
      const currentState = mockAuthService.getState();
      setState({
        ...currentState,
        isLoading: false,
      });
    });

    // Subscribe to changes
    const unsubscribe = mockAuthService.subscribe(() => {
      setState({
        ...mockAuthService.getState(),
        isLoading: false,
      });
    });

    return unsubscribe;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const user = await mockAuthService.login({ email, password });
    return user;
  }, []);

  const loginWithMockUser = useCallback(
    async (user: MockUser) => {
      const authUser = await mockAuthService.loginWithMockUser(user);
      const redirectPath = mockAuthService.getLoginRedirectPath();
      router.push(redirectPath);
      return authUser;
    },
    [router],
  );

  const logout = useCallback(async () => {
    await mockAuthService.logout();
    router.push("/");
  }, [router]);

  const hasPermission = useCallback((permission: string) => {
    return mockAuthService.hasPermission(permission);
  }, []);

  const hasRole = useCallback((role: UserRole | UserRole[]) => {
    return mockAuthService.hasRole(role);
  }, []);

  const canAccess = useCallback(
    (path: string) => {
      if (!state.user) return false;
      return canAccessRoute(path, state.user.role);
    },
    [state.user],
  );

  const getMockUsers = useCallback(() => {
    return mockAuthService.getMockUsers();
  }, []);

  // Route protection
  useEffect(() => {
    if (state.isLoading) return;

    // Check if current route requires auth
    const isAuthRoute = pathname?.startsWith("/auth");
    const isPublicRoute = pathname === "/" || isAuthRoute;

    if (!state.isAuthenticated && !isPublicRoute) {
      // Redirect to login
      router.push("/auth/login");
    } else if (state.isAuthenticated && state.user && !isPublicRoute) {
      // Check route access
      if (!canAccessRoute(pathname || "/", state.user.role)) {
        // Redirect to appropriate dashboard
        router.push(mockAuthService.getLoginRedirectPath());
      }
    }
  }, [state.isLoading, state.isAuthenticated, state.user, pathname, router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      loginWithMockUser,
      logout,
      hasPermission,
      hasRole,
      canAccess,
      getMockUsers,
    }),
    [
      state,
      login,
      loginWithMockUser,
      logout,
      hasPermission,
      hasRole,
      canAccess,
      getMockUsers,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Hook to get current user (convenience)
export function useUser(): AuthUser | null {
  const { user } = useAuth();
  return user;
}

// Hook to check if user is admin
export function useIsAdmin(): boolean {
  const { user } = useAuth();
  return user?.role === "root-admin" || user?.role === "tenant-admin";
}

// Hook to check single permission
export function usePermission(permission: string): boolean {
  const { hasPermission } = useAuth();
  return hasPermission(permission);
}

// Hook to check multiple permissions (returns true if user has ANY of the permissions)
export function usePermissions(permissions: string[]): boolean {
  const { hasPermission } = useAuth();
  return permissions.some((p) => hasPermission(p));
}

// Component for conditional rendering based on permission
export function Can({
  permission,
  children,
  fallback = null,
}: {
  permission: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}): React.ReactNode {
  const { hasPermission } = useAuth();

  const hasAccess = Array.isArray(permission)
    ? permission.some((p) => hasPermission(p))
    : hasPermission(permission);

  return hasAccess ? children : fallback;
}

// Hook for route protection
export function useRequireAuth(requiredRoles?: UserRole[]): {
  isAuthorized: boolean;
  isLoading: boolean;
} {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return { isAuthorized: false, isLoading: true };
  }

  if (!isAuthenticated || !user) {
    return { isAuthorized: false, isLoading: false };
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const isAuthorized = requiredRoles.includes(user.role);
    return { isAuthorized, isLoading: false };
  }

  return { isAuthorized: true, isLoading: false };
}
