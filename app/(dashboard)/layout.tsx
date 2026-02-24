"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LanguageSwitcher, Logo, ThemeToggle } from "@/components/layout";
import {
  Avatar,
  Badge,
  Button,
  Command,
  Loader,
  Menu,
  Tabs,
  TabsTrigger,
  TabsTriggerList,
  Text,
  Tooltip,
} from "@/components/ui";
import { type AuthUser } from "@/lib/auth";
import { useScrollPosition } from "@/hooks";
import { useAuth, useRequireAuth } from "@/lib/auth";
import {
  CloseIcon,
  CoinsIcon,
  CollapseIcon,
  DropdownIcon,
  ExpandIcon,
  LogOutIcon,
  MenuIcon,
  ProfileIcon,
  RedeemedIcon,
  SearchIcon,
  SettingsIcon,
} from "@/lib/constants/icons";
import {
  filterTabs,
  getActiveNavItemKey,
  getActiveTabKey,
  getSidebarForPath,
} from "@/lib/nav";
import {
  useLanguage,
  useSidebar,
  useTheme,
  useTranslation,
} from "@/lib/providers";

// Navigation configuration import
import { NAV } from "./nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Authentication and Translation hooks
  const { isAuthorized, isLoading } = useRequireAuth();
  const { hasPermission, user, logout, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  // Layout Providers hooks
  const { isCollapsed, isMobileOpen, toggle, closeMobile, openMobile } =
    useSidebar();
  const {
    theme,
    toggleTheme,
    setThemeColor,
    mounted: themeMounted,
  } = useTheme();
  const {
    currentLanguage,
    languages,
    setLanguage,
    mounted: langMounted,
  } = useLanguage();

  // Local state for search dialog
  const [searchOpen, setSearchOpen] = useState(false);

  // Refs for scroll positioning
  const sidebarRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useScrollPosition(sidebarRef, "sidebar");
  useScrollPosition(mainRef, "content");

  // Sync theme color with active tab configuration
  useEffect(() => {
    const tabs = filterTabs(NAV, hasPermission);
    if (!tabs || tabs.length === 0) return;

    // Check if pathname matches a tab or sub-route
    const matchIndex = tabs.findIndex(
      (tab) => pathname === tab.href || pathname.startsWith(`${tab.href}/`),
    );
    const activeIndex = matchIndex !== -1 ? matchIndex : 0;
    const activeTab = tabs[activeIndex];

    if (activeTab?.color) {
      setThemeColor(activeTab.color);
    }
  }, [pathname, hasPermission, setThemeColor]);

  if (isLoading) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  // Navigation Logic
  const tabs = filterTabs(NAV, hasPermission);
  const navigation = getSidebarForPath(tabs, pathname);
  const activeTabKey = getActiveTabKey(tabs, pathname);
  const activeNavItemKey = getActiveNavItemKey(tabs, pathname);

  const activeIndex = tabs.findIndex(
    (tab) => pathname === tab.href || pathname.startsWith(`${tab.href}/`),
  );
  const selectedIndex = activeIndex !== -1 ? activeIndex : 0;

  // Page Header Logic
  const titleKey = activeNavItemKey
    ? `navigation.sidebar.${activeNavItemKey}`
    : `navigation.tabs.${activeTabKey}`;

  const descriptionKey = activeNavItemKey
    ? `dashboard.${activeNavItemKey}.description`
    : `dashboard.${activeTabKey}.description`;

  const defaultDescription = activeNavItemKey
    ? t(`navigation.sidebar.${activeNavItemKey}`)
    : t(`navigation.sidebar.${activeTabKey}`);

  // Determine full name for display
  const fullName = user ? `${user.lastName} ${user.firstName}` : "";

  return (
    <div className="mx-auto grid h-screen max-w-7xl grid-cols-12 grid-rows-[auto_1fr]">
      {/* Header */}
      <header className="sticky col-span-12 flex h-14 items-center justify-between gap-2 border-b-2 px-2 shadow">
        {/* Left Header */}
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

        {/* Center Header */}
        <div className="flex flex-2 justify-center">
          <Tabs selectedIndex={selectedIndex} className="hidden sm:flex">
            <TabsTriggerList>
              {tabs.map((tab) => (
                <Link href={tab.href} key={tab.key}>
                  <TabsTrigger
                    className={`flex flex-1 items-center gap-2 ${tab.key === activeTabKey ? "bg-muted shadow-md" : "hover:shadow-md"}`}
                  >
                    <tab.icon className="size-4" />
                    <span>{t(`navigation.tabs.${tab.key}`)}</span>
                  </TabsTrigger>
                </Link>
              ))}
            </TabsTriggerList>
          </Tabs>
        </div>

        {/* Right Header */}
        <div className="flex flex-1 gap-2">
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

          {isAuthenticated && user && (
            // User Menu with Profile, Settings, and Logout
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
                  <Menu.Item
                    onSelect={logout}
                    className="text-destructive gap-2"
                  >
                    <LogOutIcon className="size-4" />
                    <Text className="text-sm">{t("auth.logout")}</Text>
                  </Menu.Item>
                </div>
              </Menu.Content>
            </Menu>
          )}
        </div>
      </header>

      {/* Sidebar */}
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`border-border bg-background fixed top-0 left-0 z-50 col-span-1 flex hidden h-full flex-col border-r-2 transition-all duration-300 md:sticky md:top-16 md:block md:h-[calc(100vh-4rem)] md:shrink-0 ${
          isCollapsed ? "w-16" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        ref={sidebarRef}
      >
        {/* Mobile Header */}
        <div className="border-border flex h-16 items-center justify-between border-b-2 px-4 md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={closeMobile}
            aria-label="Close menu"
          >
            <CloseIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Toggle Button */}
        <Button
          variant="outline"
          className="bg-background text-foreground absolute top-6 -right-3 z-10 hidden h-6 w-6 items-center justify-center p-0 md:flex"
          onClick={toggle}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ExpandIcon className="h-4 w-4" />
          ) : (
            <CollapseIcon className="h-4 w-4" />
          )}
        </Button>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto p-2">
          {navigation.map((group, groupIndex) => {
            const activeItemIndex = group.items.findIndex(
              (item) => pathname === item.href,
            );

            return (
              <div key={groupIndex} className="mb-4">
                {group.key && !isCollapsed && (
                  <Text
                    as="h6"
                    className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase"
                  >
                    {t(`navigation.sidebar.${group.key}`)}
                  </Text>
                )}
                <Tabs selectedIndex={activeItemIndex}>
                  <TabsTriggerList className="flex-col space-x-0 space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const title = t(`navigation.sidebar.${item.key}`);

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMobile}
                          title={isCollapsed ? title : undefined}
                          className="w-full"
                        >
                          <TabsTrigger
                            className={`flex w-full items-center justify-start gap-3 ${
                              isCollapsed ? "justify-center px-2" : "px-3"
                            } ${pathname === item.href && "bg-muted shadow-md"}`}
                          >
                            <Icon className="h-5 w-5 shrink-0" />
                            {!isCollapsed && <span>{title}</span>}
                            {!isCollapsed && item.badge && (
                              <Badge className="ml-auto">{item.badge}</Badge>
                            )}
                          </TabsTrigger>
                        </Link>
                      );
                    })}
                  </TabsTriggerList>
                </Tabs>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        ref={mainRef}
        className="col-span-6 flex w-full flex-1 flex-col overflow-hidden overflow-y-auto bg-white p-8 md:col-span-5"
      >
        {/* Page Header */}
        <div className="border-border shrink-0 border-b-2 px-6 py-3">
          <h1 className="text-2xl font-bold tracking-tight">{t(titleKey)}</h1>
          <p className="text-muted-foreground">
            {t(descriptionKey, {
              defaultValue: defaultDescription,
            })}
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6">{children}</div>
      </main>
    </div>
  );
}
