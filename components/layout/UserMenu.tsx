"use client";

import Link from "next/link";

import {
  Avatar,
  Badge,
  Button,
  Loader,
  Menu,
  Text,
  Tooltip,
} from "@/components/ui";
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
  isLoading?: boolean;
  t: (key: string) => string;
}

function LoadingButton() {
  return (
    <Button className="h-9 w-36 gap-2 px-3" disabled>
      <Loader size="sm" />
    </Button>
  );
}

interface UserMenuTriggerProps {
  user: AuthUser;
  t: (key: string) => string;
}

function UserMenuTrigger({ user, t }: UserMenuTriggerProps) {
  const fullName = `${user.lastName} ${user.firstName}`;

  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Menu.Trigger asChild>
            <Button
              variant="default"
              className="h-9 w-36 gap-2 px-3"
              aria-label={t("navigation.profile")}
            >
              <div className="bg-background flex size-6 rounded-full">
                <Avatar className="size-6">
                  <Avatar.Image
                    src={user.avatarUrl || undefined}
                    alt={fullName}
                  />
                  <Avatar.Fallback>
                    <ProfileIcon className="size-3.5" />
                  </Avatar.Fallback>
                </Avatar>
              </div>
              <Text className="hidden flex-1 truncate text-left text-sm font-medium lg:block">
                {user.firstName}
              </Text>
              <DropdownIcon className="hidden size-4 shrink-0 lg:block" />
            </Button>
          </Menu.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Content>{fullName}</Tooltip.Content>
      </Tooltip>
    </Tooltip.Provider>
  );
}

interface UserInfoSectionProps {
  user: AuthUser;
}

function UserInfoSection({ user }: UserInfoSectionProps) {
  const fullName = `${user.lastName} ${user.firstName}`;

  return (
    <div className="border-border border-b-2 p-4">
      <div className="flex items-center gap-3">
        <div className="border-border flex size-12 items-center justify-center overflow-hidden rounded-full border-2">
          <Avatar className="size-12">
            <Avatar.Image src={user.avatarUrl || undefined} alt={fullName} />
            <Avatar.Fallback
              className="flex size-full items-center justify-center font-bold text-white"
              style={{ backgroundColor: user.role.color }}
            >
              {user.firstName.charAt(0)}
            </Avatar.Fallback>
          </Avatar>
        </div>
        <div className="flex-1 overflow-hidden">
          <Text className="truncate font-medium">{fullName}</Text>
          <Text className="text-muted-foreground truncate pb-1 text-xs">
            {user.email}
          </Text>
          <Badge
            size="sm"
            className="mt-1 text-white"
            style={{ backgroundColor: user.role.color }}
          >
            {user.role.name}
          </Badge>
        </div>
      </div>

      <div className="mt-3 flex gap-3 text-sm">
        <div className="flex items-center gap-1">
          <CoinsIcon className="size-4 text-yellow-500" />
          <Text className="font-medium">{user.coins.toLocaleString()}</Text>
        </div>
        <Text className="text-muted-foreground">
          Lv.{user.level} • {user.streak}🔥
        </Text>
      </div>
    </div>
  );
}

interface MenuItemsSectionProps {
  t: (key: string) => string;
}

function MenuItemsSection({ t }: MenuItemsSectionProps) {
  return (
    <div className="py-1">
      <Menu.Item asChild>
        <Link href="/profile" className="text-foreground gap-2">
          <ProfileIcon className="size-4" />
          <Text className="text-sm">{t("navigation.sidebar.profile")}</Text>
        </Link>
      </Menu.Item>
      <Menu.Item asChild>
        <Link href="/rewards" className="text-foreground gap-2">
          <RedeemedIcon className="size-4" />
          <Text className="text-sm">{t("rewards.title")}</Text>
        </Link>
      </Menu.Item>
      <Menu.Item asChild>
        <Link href="/profile/settings" className="text-foreground gap-2">
          <SettingsIcon className="size-4" />
          <Text className="text-sm">{t("navigation.sidebar.settings")}</Text>
        </Link>
      </Menu.Item>
    </div>
  );
}

interface LogoutSectionProps {
  logout: () => void;
  t: (key: string) => string;
}

function LogoutSection({ logout, t }: LogoutSectionProps) {
  return (
    <div className="border-border border-t-2 py-1">
      <Menu.Item onSelect={logout} className="text-destructive gap-2">
        <LogOutIcon className="size-4" />
        <Text className="text-sm">{t("auth.logout")}</Text>
      </Menu.Item>
    </div>
  );
}

export function UserMenu({
  user,
  logout,
  isAuthenticated,
  isLoading,
  t,
}: UserMenuProps) {
  if (isLoading) {
    return <LoadingButton />;
  }

  if (!isAuthenticated || !user) return null;

  return (
    <Menu>
      <UserMenuTrigger user={user} t={t} />
      <Menu.Content align="end" className="w-64 p-0">
        <UserInfoSection user={user} />
        <MenuItemsSection t={t} />
        <LogoutSection logout={logout} t={t} />
      </Menu.Content>
    </Menu>
  );
}
