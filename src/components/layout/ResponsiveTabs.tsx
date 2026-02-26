"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { NavTab } from "@/lib/nav";

interface ResponsiveTabsProps {
  tabs: NavTab[];
  labels: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

export function ResponsiveTabs({
  tabs,
  labels,
  selectedIndex,
  onSelect,
  className,
}: ResponsiveTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const checkTextVisibility = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const tabCount = tabs.length;
      const minTabWidth = 60;
      const availableWidth = containerWidth / tabCount;

      setShowText(availableWidth >= minTabWidth);
    };

    checkTextVisibility();

    const resizeObserver = new ResizeObserver(checkTextVisibility);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [tabs.length]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex w-full items-center justify-between gap-1",
        className,
      )}
    >
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isActive = index === selectedIndex;
        const label = labels[index] || tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onSelect(index)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1 truncate px-2 py-1.5 text-sm font-medium transition-colors",
              "border-b-2 focus:outline-hidden",
              isActive
                ? "border-primary text-primary"
                : "text-muted-foreground hover:text-foreground border-transparent",
            )}
          >
            <Icon className={cn("size-4 shrink-0", !showText && "md:hidden")} />
            <span
              className={cn(
                "truncate transition-all",
                !showText && "hidden md:inline",
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
