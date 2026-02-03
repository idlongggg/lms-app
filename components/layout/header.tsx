"use client";

import Link from "next/link";
import { Menu, Search, User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { useSidebar } from "@/hooks/use-sidebar";

interface SimpleNavItem {
  title: string;
  href: string;
}

interface HeaderProps {
  variant?: "transparent" | "fixed" | "slim" | "admin";
  simpleNavItems?: SimpleNavItem[];
  showSearch?: boolean;
  showUserMenu?: boolean;
  showMobileToggle?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Header({
  variant = "fixed",
  simpleNavItems,
  showSearch = false,
  showUserMenu = false,
  showMobileToggle = false,
  className,
  children,
}: HeaderProps) {
  const isTransparent = variant === "transparent";
  const isSlim = variant === "slim";

  return (
    <header
      className={cn(
        "z-50 w-full border-b-2 border-border",
        isTransparent
          ? "absolute bg-transparent"
          : "sticky top-0 bg-background shadow-sm",
        isSlim ? "h-12" : "h-16",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-full items-center justify-between px-4",
          isTransparent ? "max-w-7xl" : ""
        )}
      >
        {/* Left section */}
        <div className="flex items-center gap-4">
          {showMobileToggle && <MobileMenuButton />}
          <Logo collapsed={isSlim} />
        </div>

        {/* Center section - Nav links or custom children */}
        {children ? (
          <div className="hidden flex-1 items-center justify-center md:flex">
            {children}
          </div>
        ) : simpleNavItems ? (
          <nav className="hidden items-center gap-1 md:flex">
            {simpleNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 font-medium transition-colors hover:bg-muted"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}

        {/* Right section */}
        <div className="flex items-center gap-2">
          {showSearch && <SearchButton />}
          <ThemeToggle />
          {showUserMenu ? (
            <UserMenuButton />
          ) : (
            <AuthButtons isTransparent={isTransparent} />
          )}
        </div>
      </div>
    </header>
  );
}

function MobileMenuButton() {
  const { openMobile } = useSidebar();

  return (
    <button
      onClick={openMobile}
      className="flex h-9 w-9 items-center justify-center border-2 border-border bg-background shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm md:hidden"
      aria-label="Open menu"
    >
      <Menu className="h-4 w-4" />
    </button>
  );
}

function SearchButton() {
  return (
    <button
      className="hidden h-9 items-center gap-2 border-2 border-border bg-background px-3 shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm sm:flex"
      aria-label="Search"
    >
      <Search className="h-4 w-4" />
      <span className="text-sm text-muted-foreground">Tìm kiếm...</span>
      <kbd className="ml-2 rounded border border-border bg-muted px-1.5 py-0.5 text-xs">
        ⌘K
      </kbd>
    </button>
  );
}

function UserMenuButton() {
  return (
    <div className="relative">
      <button
        className="flex h-9 w-9 items-center justify-center border-2 border-border bg-primary shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
        aria-label="User menu"
      >
        <User className="h-4 w-4" />
      </button>
      {/* Dropdown menu will be implemented with RetroUI DropdownMenu */}
    </div>
  );
}

function AuthButtons({ isTransparent }: { isTransparent: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/auth/login"
        className={cn(
          "hidden px-4 py-2 font-medium transition-colors hover:bg-muted sm:block",
          isTransparent && "text-foreground"
        )}
      >
        Đăng nhập
      </Link>
      <Link
        href="/auth/register"
        className="flex h-9 items-center border-2 border-border bg-primary px-4 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
      >
        Đăng ký
      </Link>
    </div>
  );
}
