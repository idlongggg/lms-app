"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Tabs, TabsTrigger, TabsTriggerList, Text } from "@/components/ui";
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
  // Handle empty tabs gracefully
  if (!tabs || tabs.length === 0) {
    return null;
  }

  const activeIndex = tabs.findIndex(
    (tab) => pathname === tab.href || pathname.startsWith(`${tab.href}/`),
  );

  const activeTab = tabs[activeIndex !== -1 ? activeIndex : 0];

  useEffect(() => {
    if (activeTab?.color) {
      setThemeColor(activeTab.color);
    }
  }, [activeTab, setThemeColor]);

  return (
    <Tabs
      selectedIndex={activeIndex !== -1 ? activeIndex : 0}
      className="w-full"
    >
      <TabsTriggerList>
        {tabs
          .filter((tab) => !tab.hideInHeader)
          .map((tab) => {
            return (
              <TabsTrigger key={tab.key}>
                <Link href={tab.href} className="flex items-center gap-2">
                  <tab.icon className="size-4" />
                  <Text className="hidden lg:inline">
                    {t(`navigation.tabs.${tab.key}`)}
                  </Text>
                </Link>
              </TabsTrigger>
            );
          })}
      </TabsTriggerList>
    </Tabs>
  );
}
