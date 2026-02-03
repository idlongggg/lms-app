"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, ChevronDown, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { roleDisplayInfo } from "@/lib/mock/users";

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout, isAuthenticated } = useAuth();

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

  if (!isAuthenticated || !user) {
    return null;
  }

  const roleInfo = roleDisplayInfo[user.role];

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  return (
    <div ref={menuRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center gap-2 border-2 border-border bg-primary px-3 shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background overflow-hidden">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <User className="h-3.5 w-3.5" />
          )}
        </div>
        <span className="hidden text-sm font-medium sm:block max-w-[100px] truncate">
          {user.name.split(' ').slice(-1)[0]}
        </span>
        <ChevronDown
          className={cn(
            "hidden h-4 w-4 transition-transform sm:block",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-64 border-2 border-border bg-background shadow-md">
          {/* User Info */}
          <div className="border-b-2 border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center border-2 border-border overflow-hidden rounded-full">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <div 
                    className="h-full w-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: roleInfo.color }}
                  >
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                <div 
                  className="mt-1 inline-block rounded px-1.5 py-0.5 text-xs font-medium text-white"
                  style={{ backgroundColor: roleInfo.color }}
                >
                  {roleInfo.label}
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-3 flex gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{user.coins.toLocaleString()}</span>
              </div>
              <div className="text-muted-foreground">
                Lv.{user.level} • {user.streak}🔥
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
              onClick={handleLogout}
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
