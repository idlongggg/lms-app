"use client";

import { type RefObject } from "react";
import { Button } from "@/components/retroui";
import { CloseIcon, CollapseIcon, ExpandIcon } from "@/lib/constants/icons";
import type { NavGroup } from "@/lib/nav";
import { Logo } from "@/components/shared/logo";
import { SidebarNav } from "./sidebar-nav";

export interface SidebarProps {
  navigation: NavGroup[];
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggle: () => void;
  closeMobile: () => void;
  pathname: string;
  t: (key: string) => string;
  sidebarRef: RefObject<HTMLElement | null>;
}

export function Sidebar({
  navigation,
  isCollapsed,
  isMobileOpen,
  toggle,
  closeMobile,
  pathname,
  t,
  sidebarRef,
}: SidebarProps) {
  const showCollapsed = isCollapsed;

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`border-border bg-background fixed top-0 left-0 z-50 flex h-full flex-col border-r-2 transition-all duration-300 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:shrink-0 ${
          showCollapsed ? "w-16" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Mobile Header */}
        <div className="border-border flex h-16 items-center justify-between border-b-2 px-4 md:hidden">
          <Logo title="LMS" />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <CloseIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Toggle Button (Desktop) */}
        <Button
          variant="outline"
          className="bg-background text-foreground absolute top-6 -right-3 z-10 hidden h-6 w-6 items-center justify-center p-0 md:flex"
          onClick={toggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ExpandIcon className="h-4 w-4" />
          ) : (
            <CollapseIcon className="h-4 w-4" />
          )}
        </Button>

        {/* Navigation Content */}
        <SidebarNav
          navigation={navigation}
          pathname={pathname}
          showCollapsed={showCollapsed}
          closeMobile={closeMobile}
          t={t}
          sidebarRef={sidebarRef}
        />
      </aside>
    </>
  );
}
