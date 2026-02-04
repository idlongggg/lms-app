"use client";

import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { Loader } from "@/components/retroui";
import {
  LanguageSwitcher,
  Layout,
  ThemeToggle,
  UserMenu,
} from "@/components/shared";
import { useAuth, useRequireAuth } from "@/lib/auth";
import { filterTabs, getActiveTabKey, getSidebarForPath } from "@/lib/nav";
import { useTranslation } from "@/lib/providers";

import { DashboardNav } from "./_components/dashboard-nav";
import { NAVIGATION_CONFIG } from "./nav";

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
  const { hasPermission } = useAuth();
  const { t } = useTranslation();

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

  const tabs = filterTabs(NAVIGATION_CONFIG, hasPermission);
  const navigation = getSidebarForPath(tabs, pathname);
  const showTabs = tabs.length > 0;

  const activeTabKey = getActiveTabKey(pathname);
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
    <Layout
      nav={navigation}
      variant="collapsible"
      center={showTabs ? <DashboardNav tabs={tabs} /> : undefined}
      right={
        <>
          <SearchButton />
          <LanguageSwitcher />
          <ThemeToggle />
          <UserMenu />
        </>
      }
      header={pageHeader}
    >
      {children}
    </Layout>
  );
}
