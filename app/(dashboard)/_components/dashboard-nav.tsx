"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { type DashboardTab, getActiveTabKey } from "@/lib/nav";
import { useTheme, useTranslation } from "@/lib/providers";
import { cn } from "@/lib/utils";

import { DASHBOARD_TABS } from "../nav";

interface DashboardNavProps {
  tabs?: DashboardTab[];
}

export function DashboardNav({ tabs }: DashboardNavProps) {
  const pathname = usePathname();
  const activeKey = getActiveTabKey(pathname);
  const { t } = useTranslation();
  const { setThemeColor } = useTheme();

  // Use provided tabs or fallback to default
  const navTabs = tabs || DASHBOARD_TABS;
  const activeTab = navTabs.find((tab) => tab.key === activeKey);

  // Update theme color when active tab changes
  useEffect(() => {
    if (activeTab?.color) {
      setThemeColor(activeTab.color);
    }
  }, [activeTab, setThemeColor]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-1 md:flex">
        {navTabs.map((tab) => {
          const isActive = tab.key === activeKey;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                "flex items-center gap-2 border-2 px-4 py-2 font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground border-border shadow-xs"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground border-transparent",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{t(`navigation.tabs.${tab.key}`)}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Dropdown */}
      <MobileNavDropdown activeTab={activeTab} tabs={navTabs} />
    </>
  );
}

function MobileNavDropdown({
  activeTab,
  tabs,
}: {
  activeTab: DashboardTab | undefined;
  tabs: DashboardTab[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!activeTab) return null;

  const ActiveIcon = activeTab.icon;

  return (
    <div ref={dropdownRef} className="relative md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 border-2 px-3 py-2 font-medium shadow-xs",
          "bg-primary text-primary-foreground border-border",
        )}
      >
        <ActiveIcon className="h-4 w-4" />
        <span>{t(`navigation.tabs.${activeTab.key}`)}</span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="border-border bg-background absolute top-full left-0 z-50 mt-1 w-48 border-2 shadow-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.key === activeTab?.key;

            return (
              <Link
                key={tab.key}
                href={tab.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{t(`navigation.tabs.${tab.key}`)}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
