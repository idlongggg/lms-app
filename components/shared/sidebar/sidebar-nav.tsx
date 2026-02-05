"use client";

import { type RefObject } from "react";

import { Text } from "@/components/retroui";
import type { NavGroup } from "@/lib/nav";

import { SidebarItem } from "./sidebar-item";

export interface SidebarNavProps {
  navigation: NavGroup[];
  pathname: string;
  showCollapsed: boolean;
  closeMobile: () => void;
  t: (key: string) => string;
  sidebarRef?: RefObject<HTMLElement | null>;
}

export function SidebarNav({
  navigation,
  pathname,
  showCollapsed,
  closeMobile,
  t,
  sidebarRef,
}: SidebarNavProps) {
  return (
    <nav ref={sidebarRef} className="flex-1 overflow-y-auto p-2">
      {navigation.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-4">
          {group.key && !showCollapsed && (
            <Text
              as="h6"
              className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase"
            >
              {t(`navigation.sidebar.${group.key}`)}
            </Text>
          )}
          <ul className="space-y-1">
            {group.items.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
                isActive={pathname === item.href}
                showCollapsed={showCollapsed}
                closeMobile={closeMobile}
                title={t(`navigation.sidebar.${item.key}`)}
              />
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
