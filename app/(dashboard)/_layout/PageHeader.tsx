"use client";

import { usePathname } from "next/navigation";

import { useAuth } from "@/lib/auth";
import { filterTabs, getActiveNavItemKey, getActiveTabKey } from "@/lib/nav";
import { useTranslation } from "@/lib/providers";

import { NAV } from "../nav";

export function PageHeader() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { hasPermission } = useAuth();

  const tabs = filterTabs(NAV, hasPermission);
  const activeTabKey = getActiveTabKey(tabs, pathname);
  const activeNavItemKey = getActiveNavItemKey(tabs, pathname);

  const titleKey = activeNavItemKey
    ? `navigation.sidebar.${activeNavItemKey}`
    : `navigation.tabs.${activeTabKey}`;

  const descriptionKey = activeNavItemKey
    ? `dashboard.${activeNavItemKey}.description` // Use specific description for nav item
    : `dashboard.${activeTabKey}.description`;

  const defaultDescription = activeNavItemKey
    ? t(`navigation.sidebar.${activeNavItemKey}`)
    : t(`navigation.sidebar.${activeTabKey}`);

  // Fallback to tab description if nav item description is missing (or same as title)
  // This logic wraps the translation call to provide a sensible default

  return (
    <div className="border-border shrink-0 border-b-2 px-6 py-3">
      <h1 className="text-2xl font-bold tracking-tight">{t(titleKey)}</h1>
      <p className="text-muted-foreground">
        {t(descriptionKey, {
          defaultValue: defaultDescription,
        })}
      </p>
    </div>
  );
}
