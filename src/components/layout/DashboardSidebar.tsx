"use client";

import { useRef } from "react";
import Link from "next/link";

import { Badge, Button } from "@/components/ui";
import { useScrollPosition } from "@/hooks";
import { CloseIcon, CollapseIcon, ExpandIcon } from "@/lib/constants/icons";
import type { NavGroup } from "@/lib/nav";

interface DashboardSidebarProps {
  navigation: NavGroup[];
  pathname: string;
  t: (key: string) => string;
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggle: () => void;
  closeMobile: () => void;
}

export function DashboardSidebar({
  navigation,
  pathname,
  t,
  isCollapsed,
  isMobileOpen,
  toggle,
  closeMobile,
}: DashboardSidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  useScrollPosition(sidebarRef, "sidebar");

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`bg-background fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r-2 transition-all duration-300 md:relative md:z-0 md:h-full md:shrink-0 ${
          isCollapsed ? "w-16" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        ref={sidebarRef}
      >
        <div className="border-border flex h-16 items-center justify-between border-b-2 px-4 md:hidden">
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

        <Button
          variant="outline"
          size="icon"
          className="bg-background absolute top-5 -right-3 hidden size-6 p-0 md:flex"
          onClick={toggle}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <ExpandIcon className="size-4" />
          ) : (
            <CollapseIcon className="size-4" />
          )}
        </Button>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {navigation.map((group, idx) => (
            <div key={idx} className="mb-4">
              {group.key && !isCollapsed && (
                <span className="mb-2 text-xs font-bold tracking-wider uppercase">
                  {t(`navigation.sidebar.${group.key}`)}
                </span>
              )}
              <div className="flex flex-col space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const title = t(`navigation.sidebar.${item.key}`);
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      title={isCollapsed ? title : undefined}
                      className="w-full"
                    >
                      <button
                        role="tab"
                        aria-selected={isActive}
                        className={`flex w-full items-center justify-start gap-3 px-4 py-1 focus:outline-hidden ${
                          isCollapsed ? "justify-center px-2" : "px-3"
                        } ${
                          isActive
                            ? "border-border bg-primary text-primary-foreground border-2 font-semibold"
                            : "border-2 border-transparent"
                        }`}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {!isCollapsed && <span>{title}</span>}
                        {!isCollapsed && item.badge && (
                          <Badge className="ml-auto">{item.badge}</Badge>
                        )}
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
