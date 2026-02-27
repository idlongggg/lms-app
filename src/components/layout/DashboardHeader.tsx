"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LanguageSwitcher,
  Logo,
  ResponsiveTabs,
  ThemeToggle,
} from "@/components/layout";
import {
  Avatar,
  Badge,
  Button,
  Command,
  Menu,
  Text,
  Tooltip,
} from "@/components/ui";
import type { AuthUser } from "@/lib/auth";
import {
  CoinsIcon,
  DropdownIcon,
  LogOutIcon,
  MenuIcon,
  ProfileIcon,
  RedeemedIcon,
  SearchIcon,
  SettingsIcon,
} from "@/lib/constants/icons";
import type { Language, LanguageOption } from "@/lib/i18n";
import type { NavTab } from "@/lib/nav";

interface DashboardHeaderProps {
  tabs: NavTab[];
  pathname: string;
  user: AuthUser | null;
  isAuthenticated: boolean;
  logout: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  openMobile: () => void;
  theme: string;
  toggleTheme: () => void;
  themeMounted: boolean;
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  setLanguage: (language: Language) => void;
  langMounted: boolean;
}

export function DashboardHeader({
  tabs,
  pathname,
  user,
  logout,
  t,
  openMobile,
  theme,
  toggleTheme,
  themeMounted,
  currentLanguage,
  languages,
  setLanguage,
  langMounted,
}: DashboardHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  const activeIdx = tabs.findIndex(
    (tab) => pathname === tab.href || pathname.startsWith(`${tab.href}/`),
  );
  const selectedIdx = activeIdx !== -1 ? activeIdx : 0;

  const handleTabSelect = (index: number) => {
    router.push(tabs[index].href);
  };

  const tabLabels = tabs.map((tab) => t(`navigation.tabs.${tab.key}`));

  const fullName = user ? `${user.lastName} ${user.firstName}` : "";

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b-2 px-2 shadow">
      <div className="flex gap-2">
        <Tooltip.Provider>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={openMobile}
              >
                <MenuIcon className="size-4" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              {`${t("common.open")} ${t("navigation.sidebar.dashboard")}`}
            </Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>

        <Link href="/" className="flex items-center gap-2">
          <Button size="icon" aria-label="Go to Home">
            <Logo className="size-4" />
          </Button>
          <Text as="h3" className="hidden font-bold sm:flex">
            {t("app.name")}
          </Text>
        </Link>
      </div>

      <div className="hidden flex-1 justify-center lg:flex lg:max-w-[70%]">
        <ResponsiveTabs
          tabs={tabs}
          labels={tabLabels}
          selectedIndex={selectedIdx}
          onSelect={handleTabSelect}
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex size-9 gap-2 sm:w-40 sm:justify-start"
          onClick={() => setSearchOpen(true)}
        >
          <SearchIcon className="size-4 shrink-0" />
          <span className="hidden sm:inline">
            {t("common.searchPlaceholder")}
          </span>
        </Button>

        <Command.Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <Command.Input placeholder={t("common.searchPlaceholder")} />
          <Command.List>
            <Command.Empty>{t("common.noResults")}</Command.Empty>
          </Command.List>
        </Command.Dialog>

        <LanguageSwitcher
          currentLanguage={currentLanguage}
          languages={languages}
          setLanguage={setLanguage}
          mounted={langMounted}
          t={t}
        />
        <ThemeToggle
          theme={theme}
          toggleTheme={toggleTheme}
          mounted={themeMounted}
          t={t}
        />

        {user && (
          <Menu>
            <Tooltip.Provider>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Menu.Trigger asChild>
                    <Button
                      size="icon"
                      className="flex h-9 gap-2"
                      aria-label="Open user menu"
                    >
                      <Avatar className="bg-background size-6">
                        {user.avatarUrl && (
                          <Avatar.Image src={user.avatarUrl} alt="Avatar" />
                        )}
                        <Avatar.Fallback>
                          <ProfileIcon />
                        </Avatar.Fallback>
                      </Avatar>
                      <span className="hidden truncate sm:flex">
                        {user.firstName}
                      </span>
                      <DropdownIcon className="hidden size-4 shrink-0 md:block" />
                    </Button>
                  </Menu.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Content>{fullName}</Tooltip.Content>
              </Tooltip>
            </Tooltip.Provider>

            <Menu.Content align="end" className="w-64 p-0">
              <div className="border-border border-b-2 p-4">
                <div className="flex items-center gap-3">
                  <div className="border-border flex size-12 items-center justify-center overflow-hidden rounded-full border-2">
                    <Avatar className="size-12">
                      {user.avatarUrl && (
                        <Avatar.Image src={user.avatarUrl} alt="Avatar" />
                      )}
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
                    <Text className="font-medium">
                      {user.coins.toLocaleString()}
                    </Text>
                  </div>
                  <Text className="text-muted-foreground">
                    Lv.{user.level} • {user.streak}🔥
                  </Text>
                </div>
              </div>

              <div className="py-1">
                <Menu.Item asChild>
                  <Link href="/profile" className="text-foreground gap-2">
                    <ProfileIcon className="size-4" />
                    <Text className="text-sm">
                      {t("navigation.sidebar.profile")}
                    </Text>
                  </Link>
                </Menu.Item>
                <Menu.Item asChild>
                  <Link href="/rewards" className="text-foreground gap-2">
                    <RedeemedIcon className="size-4" />
                    <Text className="text-sm">{t("rewards.title")}</Text>
                  </Link>
                </Menu.Item>
                <Menu.Item asChild>
                  <Link
                    href="/profile/settings"
                    className="text-foreground gap-2"
                  >
                    <SettingsIcon className="size-4" />
                    <Text className="text-sm">
                      {t("navigation.sidebar.settings")}
                    </Text>
                  </Link>
                </Menu.Item>
              </div>

              <div className="border-border border-t-2 py-1">
                <Menu.Item onSelect={logout} className="text-destructive gap-2">
                  <LogOutIcon className="size-4" />
                  <Text className="text-sm">{t("auth.logout")}</Text>
                </Menu.Item>
              </div>
            </Menu.Content>
          </Menu>
        )}
      </div>
    </header>
  );
}
