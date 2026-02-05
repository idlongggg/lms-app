"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { type NavTab } from "@/lib/nav";
import { useTranslation } from "@/lib/providers";

interface DashboardNavProps {
  tabs: NavTab[];
}

export function DashboardNav({ tabs }: DashboardNavProps) {
  const pathname = usePathname();
  const { t } = useTranslation();

  // Handle empty tabs gracefully
  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 overflow-x-auto">
      {tabs
        .filter((tab) => !tab.hideInHeader)
        .map((tab) => {
          const isActive =
            pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                "hover:bg-muted flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden lg:inline">
                {t(`navigation.tabs.${tab.key}`)}
              </span>
            </Link>
          );
        })}
    </nav>
  );
}
