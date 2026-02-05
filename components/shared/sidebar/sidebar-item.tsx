"use client";

import Link from "next/link";

import { Badge, Button } from "@/components/retroui";
import type { NavItem } from "@/lib/nav";

export interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  showCollapsed: boolean;
  closeMobile: () => void;
  title: string;
}

export function SidebarItem({
  item,
  isActive,
  showCollapsed,
  closeMobile,
  title,
}: SidebarItemProps) {
  const Icon = item.icon;

  return (
    <li>
      <Button
        variant={isActive ? "default" : "ghost"}
        className={`w-full justify-start gap-3 ${
          showCollapsed ? "justify-center px-2" : "px-3"
        } ${isActive ? "" : "hover:bg-transparent"}`}
        asChild
      >
        <Link
          href={item.href}
          onClick={closeMobile}
          title={showCollapsed ? title : undefined}
        >
          <Icon className="h-5 w-5 shrink-0" />
          {!showCollapsed && <span>{title}</span>}
          {!showCollapsed && item.badge && (
            <Badge className="ml-auto">{item.badge}</Badge>
          )}
        </Link>
      </Button>
    </li>
  );
}
