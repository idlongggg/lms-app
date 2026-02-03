"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center gap-2 border-2 border-border bg-primary px-3 shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background">
          <User className="h-3.5 w-3.5" />
        </div>
        <span className="hidden text-sm font-medium sm:block">Tài khoản</span>
        <ChevronDown
          className={cn(
            "hidden h-4 w-4 transition-transform sm:block",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-56 border-2 border-border bg-background shadow-md">
          {/* User Info */}
          <div className="border-b-2 border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-primary">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium">Nguyễn Văn A</p>
                <p className="truncate text-sm text-muted-foreground">
                  1,250 xu
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 font-medium transition-colors hover:bg-muted"
            >
              <User className="h-4 w-4" />
              <span>Hồ sơ cá nhân</span>
            </Link>
            <Link
              href="/profile/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 font-medium transition-colors hover:bg-muted"
            >
              <Settings className="h-4 w-4" />
              <span>Cài đặt</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t-2 border-border py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                // Handle logout
              }}
              className="flex w-full items-center gap-3 px-4 py-3 font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
