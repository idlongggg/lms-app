"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";

import {
  DashboardHeader,
  DashboardPageHeader,
  DashboardSidebar,
} from "@/components/layout";
import { Loader } from "@/components/ui";
import { useScrollPosition } from "@/hooks";
import { useRequireAuth } from "@/lib/auth";
import {
  useLanguage,
  useSidebar,
  useTheme,
  useTranslation,
} from "@/lib/providers";
import { filterTabs, getActiveNavItemKey, getSidebarForPath } from "@/lib/nav";
import { NAV } from "@/lib/nav/dashboard";
import { useAuth } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const { isAuthorized, isLoading } = useRequireAuth();
  const { user, logout, isAuthenticated, hasPermission } = useAuth();

  const { t } = useTranslation();
  const {
    setThemeColor,
    theme,
    toggleTheme,
    mounted: themeMounted,
  } = useTheme();
  const { isCollapsed, isMobileOpen, toggle, openMobile, closeMobile } =
    useSidebar();
  const {
    currentLanguage,
    languages,
    setLanguage,
    mounted: langMounted,
  } = useLanguage();

  const tabs = useMemo(() => filterTabs(NAV, hasPermission), [hasPermission]);

  const navigation = useMemo(
    () => getSidebarForPath(tabs, pathname),
    [tabs, pathname],
  );

  const activeNavItemKey = useMemo(
    () => getActiveNavItemKey(tabs, pathname),
    [tabs, pathname],
  );

  const mainRef = useRef<HTMLElement>(null);
  useScrollPosition(mainRef, "content");

  useEffect(() => {
    if (!tabs || tabs.length === 0) return;

    const matchIndex = tabs.findIndex(
      (tab) => pathname === tab.href || pathname.startsWith(`${tab.href}/`),
    );
    const activeIndex = matchIndex !== -1 ? matchIndex : 0;
    const activeTab = tabs[activeIndex];

    if (activeTab?.color) {
      setThemeColor(activeTab.color);
    }
  }, [pathname, tabs, setThemeColor]);

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
    <div className="mx-auto flex h-screen max-w-7xl flex-col overflow-hidden">
      <DashboardHeader
        tabs={tabs}
        pathname={pathname}
        user={user}
        isAuthenticated={isAuthenticated}
        logout={logout}
        t={t}
        openMobile={openMobile}
        theme={theme}
        toggleTheme={toggleTheme}
        themeMounted={themeMounted}
        currentLanguage={currentLanguage}
        languages={languages}
        setLanguage={setLanguage}
        langMounted={langMounted}
      />
      <div className="relative flex flex-1 overflow-hidden pt-4">
        <DashboardSidebar
          navigation={navigation}
          pathname={pathname}
          t={t}
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          toggle={toggle}
          closeMobile={closeMobile}
        />
        <main
          ref={mainRef}
          className="flex flex-1 flex-col overflow-hidden bg-white"
        >
          <DashboardPageHeader activeNavItemKey={activeNavItemKey} t={t} />
          <div className="flex-1 overflow-y-auto p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
