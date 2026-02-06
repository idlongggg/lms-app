"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";

import { Sidebar as LayoutSidebar } from "@/components/layout";
import { useScrollPosition } from "@/hooks";
import { useAuth } from "@/lib/auth";
import { filterTabs, getSidebarForPath } from "@/lib/nav";
import { useSidebar, useTranslation } from "@/lib/providers";

import { NAV } from "../nav";

export function Sidebar() {
  const pathname = usePathname();
  const { hasPermission } = useAuth();
  const { t } = useTranslation();
  const { isCollapsed, isMobileOpen, toggle, closeMobile } = useSidebar();

  const sidebarRef = useRef<HTMLElement>(null);
  useScrollPosition(sidebarRef, "sidebar");

  const tabs = filterTabs(NAV, hasPermission);
  const navigation = getSidebarForPath(tabs, pathname);

  return (
    <LayoutSidebar
      navigation={navigation}
      isCollapsed={isCollapsed}
      isMobileOpen={isMobileOpen}
      toggle={toggle}
      closeMobile={closeMobile}
      pathname={pathname}
      t={t}
      sidebarRef={sidebarRef}
    />
  );
}
