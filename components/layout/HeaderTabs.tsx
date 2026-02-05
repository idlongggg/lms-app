"use client";

import Link from "next/link";

import { Button } from "@/components/ui";
import { type ThemeKey } from "@/lib/constants/colors";
import { type NavTab } from "@/lib/nav";

interface HeaderTabsProps {
  tabs: NavTab[];
  pathname: string;
  t: (key: string) => string;
  setThemeColor: (color: ThemeKey) => void;
}

export function HeaderTabs({
  tabs,
  pathname,
  t,
  setThemeColor,
}: HeaderTabsProps) {
  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto p-1">
      {tabs
        .filter((tab) => !tab.hideInHeader)
        .map((tab) => {
          const Icon = tab.icon;
          const isActive =
            pathname === tab.href || pathname.startsWith(`${tab.href}/`);

          return (
            <Button
              key={tab.key}
              asChild
              variant={isActive ? "default" : "ghost"}
              className="flex h-10 items-center gap-2"
              onClick={() => {
                if (tab.color) {
                  setThemeColor(tab.color);
                }
              }}
            >
              <Link href={tab.href}>
                <Icon className="size-4" />
                <span className="hidden lg:inline">
                  {t(`navigation.tabs.${tab.key}`)}
                </span>
              </Link>
            </Button>
          );
        })}
    </div>
  );
}
