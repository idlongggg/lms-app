"use client";

import Link from "next/link";

import { Avatar, Badge, Button, Menu, Text } from "@/components/retroui";
import { type AuthUser } from "@/lib/auth";
import {
  CoinsIcon,
  DropdownIcon,
  LogOutIcon,
  ProfileIcon,
  RedeemedIcon,
  SettingsIcon,
} from "@/lib/constants/icons";

interface UserMenuProps {
  user: AuthUser | null;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  t: (key: string) => string;
}

export function UserMenu({ user, logout, isAuthenticated, t }: UserMenuProps) {
  if (!isAuthenticated || !user) return null;

  const fullName = `${user.lastName} ${user.firstName}`;

  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button
          variant="default"
          className="h-9 gap-2 px-3"
          aria-label="User menu"
        >
          <div className="bg-background flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
            <Avatar className="h-6 w-6">
              <Avatar.Image src={user.avatarUrl || undefined} alt={fullName} />
              <Avatar.Fallback>
                <ProfileIcon className="h-3.5 w-3.5" />
              </Avatar.Fallback>
            </Avatar>
          </div>
          <Text
            as="p"
            className="hidden max-w-[100px] truncate text-sm font-medium sm:block"
          >
            {user.firstName}
          </Text>
          <DropdownIcon className="hidden h-4 w-4 sm:block" />
        </Button>
      </Menu.Trigger>

      <Menu.Content align="end" className="w-64 p-0">
        {/* User Info */}
        <div className="border-border border-b-2 p-4">
          <div className="flex items-center gap-3">
            <div className="border-border flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2">
              <Avatar className="h-12 w-12">
                <Avatar.Image
                  src={user.avatarUrl || undefined}
                  alt={fullName}
                />
                <Avatar.Fallback
                  className="flex h-full w-full items-center justify-center font-bold text-white"
                  style={{ backgroundColor: user.role.color }}
                >
                  {user.firstName.charAt(0)}
                </Avatar.Fallback>
              </Avatar>
            </div>
            <div className="flex-1 overflow-hidden">
              <Text as="p" className="truncate font-medium">
                {fullName}
              </Text>
              <Text as="p" className="text-muted-foreground truncate text-xs">
                {user.email}
              </Text>
              <Badge
                className="mt-1 text-white"
                style={{ backgroundColor: user.role.color }}
              >
                {user.role.name}
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-3 flex gap-3 text-sm">
            <div className="flex items-center gap-1">
              <CoinsIcon className="h-4 w-4 text-yellow-500" />
              <Text as="p" className="font-medium">
                {user.coins.toLocaleString()}
              </Text>
            </div>
            <Text as="p" className="text-muted-foreground">
              Lv.{user.level} • {user.streak}🔥
            </Text>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          <Menu.Item asChild>
            <Link href="/profile" className="flex items-center gap-3">
              <ProfileIcon className="h-4 w-4" />
              <span>{t("navigation.sidebar.profile")}</span>
            </Link>
          </Menu.Item>
          <Menu.Item asChild>
            <Link href="/rewards" className="flex items-center gap-3">
              <RedeemedIcon className="h-4 w-4 text-pink-500" />
              <span>{t("rewards.title")}</span>
            </Link>
          </Menu.Item>
          <Menu.Item asChild>
            <Link href="/profile/settings" className="flex items-center gap-3">
              <SettingsIcon className="h-4 w-4" />
              <span>{t("navigation.sidebar.settings")}</span>
            </Link>
          </Menu.Item>
        </div>

        {/* Logout */}
        <div className="border-border border-t-2 py-1">
          <Menu.Item
            onSelect={logout}
            className="text-destructive hover:bg-destructive/10"
          >
            <LogOutIcon className="h-4 w-4" />
            <span>{t("auth.logout")}</span>
          </Menu.Item>
        </div>
      </Menu.Content>
    </Menu>
  );
}
