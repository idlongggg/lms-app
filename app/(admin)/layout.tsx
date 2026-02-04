"use client";

import { Search } from "lucide-react";

import { Loader } from "@/components/retroui";
import {
  LanguageSwitcher,
  Layout,
  ThemeToggle,
  UserMenu,
} from "@/components/shared";
import { useAuth, useRequireAuth } from "@/lib/auth";
import { useTranslation } from "@/lib/providers";

import { getAdminNavByRole } from "./nav";

function SearchButton() {
  const { t } = useTranslation();

  return (
    <button
      className="border-border bg-background hidden h-9 items-center gap-2 border-2 px-3 shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm sm:flex"
      aria-label={t("common.search")}
    >
      <Search className="h-4 w-4" />
      <span className="text-muted-foreground text-sm">
        {t("admin.dashboard.search")}
      </span>
      <kbd className="border-border bg-muted ml-2 rounded border px-1.5 py-0.5 text-xs">
        ⌘K
      </kbd>
    </button>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthorized, isLoading } = useRequireAuth([
    "root-admin",
    "tenant-admin",
  ]);
  const { user } = useAuth();

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

  const userRole = user?.role || "tenant-admin";
  const navigation = getAdminNavByRole(userRole);

  return (
    <Layout
      nav={navigation}
      variant="expanded"
      forceDark={true}
      right={
        <>
          <SearchButton />
          <LanguageSwitcher />
          <ThemeToggle />
          <UserMenu />
        </>
      }
    >
      {children}
    </Layout>
  );
}
