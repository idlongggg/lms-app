"use client";

import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { Button, Loader } from "@/components/retroui";
import {
  Header,
  LanguageSwitcher,
  Logo,
  MobileMenuButton,
  Sidebar,
  ThemeToggle,
  UserMenu,
} from "@/components/shared";
import { useAuth, useRequireAuth } from "@/lib/auth";
import { useScrollPosition } from "@/lib/hooks";
import { filterTabs, getActiveTabKey, getSidebarForPath } from "@/lib/nav";
import {
  useLanguage,
  useSidebar,
  useTheme,
  useTranslation,
} from "@/lib/providers";

import { DashboardNav } from "./_components/dashboard-nav";
import { NAV } from "./nav";

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthorized, isLoading } = useRequireAuth();
  const { hasPermission, user, logout, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const { isCollapsed, isMobileOpen, toggle, openMobile, closeMobile } =
    useSidebar();
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();
  const {
    currentLanguage,
    languages,
    setLanguage,
    mounted: langMounted,
  } = useLanguage();

  const mainRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  useScrollPosition(mainRef, "content");
  useScrollPosition(sidebarRef, "sidebar");

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

  const tabs = filterTabs(NAV, hasPermission);
  const navigation = getSidebarForPath(tabs, pathname);
  const showTabs = tabs.length > 0;

  const activeTabKey = getActiveTabKey(tabs, pathname);
  const pageHeader = (
    <>
      <h1 className="text-2xl font-bold tracking-tight">
        {t(`navigation.tabs.${activeTabKey}`)}
      </h1>
      <p className="text-muted-foreground">
        {t(`dashboard.${activeTabKey}.description`, {
          defaultValue: t(`navigation.sidebar.${activeTabKey}`),
        })}
      </p>
    </>
  );

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      <Header
        left={
          <>
            <MobileMenuButton onClick={openMobile} />
            <Logo />
          </>
        }
        center={showTabs ? <DashboardNav tabs={tabs} /> : undefined}
        right={
          <>
            <SearchButton />
            <LanguageSwitcher
              currentLanguage={currentLanguage}
              languages={languages}
              setLanguage={setLanguage}
              mounted={langMounted}
            />
            <ThemeToggle
              theme={theme}
              toggleTheme={toggleTheme}
              mounted={themeMounted}
            />
            <UserMenu
              user={user}
              logout={logout}
              isAuthenticated={isAuthenticated}
              t={t}
            />
          </>
        }
      />
      <div className="mx-auto w-full max-w-7xl flex-1 overflow-hidden pt-6">
        <div className="flex h-full">
          <Sidebar
            navigation={navigation}
            isCollapsed={isCollapsed}
            isMobileOpen={isMobileOpen}
            toggle={toggle}
            closeMobile={closeMobile}
            pathname={pathname}
            t={t}
            sidebarRef={sidebarRef}
          />
          <main ref={mainRef} className="flex flex-1 flex-col overflow-hidden">
            <div className="border-border shrink-0 border-b-2 px-6 py-3">
              {pageHeader}
            </div>
            <div className="flex-1 overflow-auto p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
