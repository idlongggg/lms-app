'use client';

import { Menu, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { DashboardNav, Header, Logo, Sidebar, ThemeToggle, UserMenu } from '@/components/common';
import { Loader } from '@/components/retroui';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { SidebarProvider, useSidebar } from '@/hooks/use-sidebar';
import { useAuth, useRequireAuth } from '@/lib/auth';
import type { UserRole } from '@/lib/auth/types';
import { getSidebarForPath, getTabsByRole } from '@/lib/navigation';

function MobileMenuButton() {
  const { openMobile } = useSidebar();

  return (
    <button
      onClick={openMobile}
      className="border-border bg-background flex h-9 w-9 items-center justify-center border-2 shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm md:hidden"
      aria-label="Open menu"
    >
      <Menu className="h-4 w-4" />
    </button>
  );
}

function SearchButton() {
  return (
    <button
      className="border-border bg-background hidden h-9 items-center gap-2 border-2 px-3 shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm sm:flex"
      aria-label="Search"
    >
      <Search className="h-4 w-4" />
      <span className="text-muted-foreground text-sm">Tìm kiếm...</span>
      <kbd className="border-border bg-muted ml-2 rounded border px-1.5 py-0.5 text-xs">⌘K</kbd>
    </button>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  const { user } = useAuth();

  useScrollPosition(mainRef, 'content');

  const userRole = user?.role as UserRole | undefined;
  const navigation = getSidebarForPath(pathname, userRole);
  const tabs = userRole ? getTabsByRole(userRole) : [];
  const showTabs = tabs.length > 0;

  return (
    <div className="bg-background h-screen">
      <Header
        left={
          <>
            <MobileMenuButton />
            <Logo />
          </>
        }
        center={showTabs ? <DashboardNav tabs={tabs} /> : undefined}
        right={
          <>
            <SearchButton />
            <ThemeToggle />
            <UserMenu />
          </>
        }
      />
      <div className="mx-auto h-[calc(100vh-4rem)] max-w-7xl">
        <div className="relative flex h-full gap-4 overflow-hidden pt-16">
          <Sidebar navigation={navigation} variant="collapsible" />
          <main ref={mainRef} className="flex h-full flex-1 flex-col overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthorized, isLoading } = useRequireAuth();

  if (isLoading) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
