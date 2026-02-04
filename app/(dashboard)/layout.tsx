"use client";

import { Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { Loader } from "@/components/retroui";
import {
  Header,
  LanguageSwitcher,
  Logo,
  Sidebar,
  ThemeToggle,
  UserMenu,
} from "@/components/shared";
import { useAuth, useRequireAuth } from "@/lib/auth";
import { useScrollPosition } from "@/lib/hooks";
import { getSidebarForPath, filterTabs } from "@/lib/nav";
import { SidebarProvider, useSidebar } from "@/lib/providers";

import { DashboardNav } from "./_components/dashboard-nav";
import { NAVIGATION_CONFIG } from "./nav";

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
      <kbd className="border-border bg-muted ml-2 rounded border px-1.5 py-0.5 text-xs">
        ⌘K
      </kbd>
    </button>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  const { hasPermission } = useAuth();

  useScrollPosition(mainRef, "content");

  const tabs = filterTabs(NAVIGATION_CONFIG, hasPermission);
  const navigation = getSidebarForPath(tabs, pathname);
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
            <LanguageSwitcher />
            <ThemeToggle />
            <UserMenu />
          </>
        }
      />
      <div className="mx-auto h-[calc(100vh-4rem)] max-w-7xl">
        <div className="relative flex h-full gap-4 overflow-hidden pt-6">
          <Sidebar navigation={navigation} variant="collapsible" />
          <main
            ref={mainRef}
            className="flex h-full flex-1 flex-col overflow-auto"
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
