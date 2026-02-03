"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { dashboardTabs, getActiveTabKey } from "@/lib/navigation";

export function DashboardNav() {
  const pathname = usePathname();
  const activeKey = getActiveTabKey(pathname);
  const activeTab = dashboardTabs.find((tab) => tab.key === activeKey);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-1 md:flex">
        {dashboardTabs.map((tab) => {
          const isActive = tab.key === activeKey;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 font-medium transition-all",
                isActive
                  ? "border-2 border-border bg-primary shadow-xs"
                  : "hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Dropdown */}
      <MobileNavDropdown activeTab={activeTab} />
    </>
  );
}

function MobileNavDropdown({
  activeTab,
}: {
  activeTab: (typeof dashboardTabs)[0] | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        className="flex items-center gap-2 border-2 border-border bg-background px-3 py-2 font-medium shadow-xs"
      >
        <ActiveIcon className="h-4 w-4" />
        <span>{activeTab.title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-48 border-2 border-border bg-background shadow-md">
          {dashboardTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.key === activeTab.key;

            return (
              <Link
                key={tab.key}
                href={tab.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 font-medium transition-colors",
                  isActive ? "bg-primary" : "hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
