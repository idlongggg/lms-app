'use client';

/**
 * AppShell Component
 * Unified layout wrapper for admin and dashboard views
 * Provides consistent structure with role-based navigation
 */

import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header, Sidebar, DashboardNav } from '@/components/layout';
import { SidebarProvider } from '@/hooks/use-sidebar';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { useAuth } from '@/lib/auth';
import {
  getSidebarForPath,
  getAdminNavByRole,
  getTabsByRole,
} from '@/lib/navigation';
import type { UserRole } from '@/lib/auth/types';

export interface AppShellProps {
  children: React.ReactNode;
  /**
   * Layout variant
   * - 'admin': Expanded sidebar, dark mode, no header tabs
   * - 'dashboard': Collapsible sidebar, header tabs for navigation
   */
  variant?: 'admin' | 'dashboard';
  /**
   * Override sidebar variant
   */
  sidebarVariant?: 'expanded' | 'collapsible';
  /**
   * Force dark mode (only for admin variant)
   */
  forceDarkMode?: boolean;
}

function AppShellContent({
  children,
  variant = 'dashboard',
  sidebarVariant,
  forceDarkMode = false,
}: AppShellProps) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  const { user } = useAuth();

  useScrollPosition(mainRef, 'content');

  // Force dark mode for admin if enabled
  useEffect(() => {
    if (forceDarkMode || variant === 'admin') {
      document.documentElement.classList.add('dark');
      return () => {
        document.documentElement.classList.remove('dark');
      };
    }
  }, [forceDarkMode, variant]);

  // Determine navigation based on role and variant
  const userRole = user?.role as UserRole | undefined;
  
  const navigation = variant === 'admin'
    ? getAdminNavByRole(userRole || 'tenant-admin')
    : getSidebarForPath(pathname, userRole);

  const resolvedSidebarVariant = sidebarVariant || (variant === 'admin' ? 'expanded' : 'collapsible');
  
  // Get tabs for dashboard variant
  const tabs = variant === 'dashboard' && userRole ? getTabsByRole(userRole) : [];
  const showTabs = variant === 'dashboard' && tabs.length > 0;

  return (
    <div className="h-screen bg-background">
      <Header
        variant={variant === 'admin' ? 'admin' : 'fixed'}
        showSearch
        showUserMenu
        showMobileToggle
      >
        {showTabs && <DashboardNav tabs={tabs} />}
      </Header>
      <div className="mx-auto h-[calc(100vh-4rem)] max-w-7xl">
        <div className="relative flex h-full overflow-hidden pt-16">
          <Sidebar navigation={navigation} variant={resolvedSidebarVariant} />
          <main ref={mainRef} className="h-full flex-1 overflow-y-auto">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export function AppShell(props: AppShellProps) {
  return (
    <SidebarProvider>
      <AppShellContent {...props} />
    </SidebarProvider>
  );
}

export default AppShell;
