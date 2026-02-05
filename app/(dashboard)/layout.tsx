"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";

import {
  Header,
  LanguageSwitcher,
  Logo,
  MobileMenuButton,
  Search,
  Sidebar,
  ThemeToggle,
  UserMenu,
} from "@/components/layout";
import { Button, Loader, Text } from "@/components/ui";
import { useScrollPosition } from "@/hooks";
import { useAuth, useRequireAuth } from "@/lib/auth";
import { filterTabs, getActiveTabKey, getSidebarForPath } from "@/lib/nav";
import {
  useLanguage,
  useSidebar,
  useTheme,
  useTranslation,
} from "@/lib/providers";

import { DashboardNav } from "./_components/DashboardNav";
import { NAV } from "./nav";
import { LogoIcon } from "@/lib/constants";
import Link from "next/link";
import { title } from "process";

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
    <>
      <Header
        left={
          <>
            <MobileMenuButton onClick={openMobile} />

            <Link href="/" className="flex items-center gap-2">
              <Button size="icon" className="size-9">
                <Logo />
              </Button>
              <Text as="h3" className="font-bold">
                {t("app.name")}
              </Text>
            </Link>
          </>
        }
        center={showTabs ? <DashboardNav tabs={tabs} /> : undefined}
        right={
          <>
            <Search t={t} />
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
      <div className="bg-background flex h-screen flex-col overflow-hidden">
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
            <main
              ref={mainRef}
              className="flex flex-1 flex-col overflow-hidden"
            >
              <div className="border-border shrink-0 border-b-2 px-6 py-3">
                {pageHeader}
              </div>
              <div className="flex-1 overflow-auto p-6">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
