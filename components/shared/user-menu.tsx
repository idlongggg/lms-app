"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Avatar } from "@/components/retroui";
import { type AuthUser } from "@/lib/auth";
import {
  CoinsIcon,
  ExpandIcon,
  LogOutIcon,
  ProfileIcon,
  RedeemedIcon,
  SettingsIcon,
} from "@/lib/icons";
import { roleDisplayInfo } from "@/lib/mock/users";

interface UserMenuProps {
  user: AuthUser | null;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  t: (key: string, options?: any) => string;
}

export function UserMenu({ user, logout, isAuthenticated, t }: UserMenuProps) {
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

  if (!isAuthenticated || !user) {
    return null;
  }

  const roleInfo = roleDisplayInfo[user.role];

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-border bg-primary flex h-9 items-center gap-2 border-2 px-3 shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="bg-background flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
          <Avatar className="h-6 w-6">
            <Avatar.Image src={user.avatarUrl || undefined} alt={user.name} />
            <Avatar.Fallback>
              <ProfileIcon className="h-3.5 w-3.5" />
            </Avatar.Fallback>
          </Avatar>
        </div>
        <span className="hidden max-w-[100px] truncate text-sm font-medium sm:block">
          {user.name.split(" ").slice(-1)[0]}
        </span>
        <ExpandIcon
          className={`hidden h-4 w-4 transition-transform sm:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-border bg-background absolute top-full right-0 z-50 mt-1 w-64 border-2 shadow-md">
          {/* User Info */}
          <div className="border-border border-b-2 p-4">
            <div className="flex items-center gap-3">
              <div className="border-border flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2">
                <Avatar className="h-12 w-12">
                  <Avatar.Image
                    src={user.avatarUrl || undefined}
                    alt={user.name}
                  />
                  <Avatar.Fallback
                    className="flex h-full w-full items-center justify-center font-bold text-white"
                    style={{ backgroundColor: roleInfo.color }}
                  >
                    {user.name.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium">{user.name}</p>
                <p className="text-muted-foreground truncate text-xs">
                  {user.email}
                </p>
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
                <CoinsIcon className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">
                  {user.coins.toLocaleString()}
                </span>
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
              className="hover:bg-muted flex items-center gap-3 px-4 py-3 font-medium transition-colors"
            >
              <ProfileIcon className="h-4 w-4" />
              <span>{t("navigation.sidebar.profile")}</span>
            </Link>
            <Link
              href="/rewards"
              onClick={() => setIsOpen(false)}
              className="hover:bg-muted flex items-center gap-3 px-4 py-3 font-medium transition-colors"
            >
              <RedeemedIcon className="h-4 w-4 text-pink-500" />
              <span>{t("rewards.title")}</span>
            </Link>
            <Link
              href="/profile/settings"
              onClick={() => setIsOpen(false)}
              className="hover:bg-muted flex items-center gap-3 px-4 py-3 font-medium transition-colors"
            >
              <SettingsIcon className="h-4 w-4" />
              <span>{t("navigation.sidebar.settings")}</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="border-border border-t-2 py-1">
            <button
              onClick={handleLogout}
              className="text-destructive hover:bg-destructive/10 flex w-full items-center gap-3 px-4 py-3 font-medium transition-colors"
            >
              <LogOutIcon className="h-4 w-4" />
              <span>{t("auth.logout")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
