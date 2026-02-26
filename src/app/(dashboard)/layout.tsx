"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

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
  Loader,
  Menu,
  Text,
  Tooltip,
} from "@/components/ui";
import { useScrollPosition } from "@/hooks";
import type { AuthUser } from "@/lib/auth";
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
import type { Language, LanguageOption } from "@/lib/i18n";
import type { NavGroup, NavTab } from "@/lib/nav";
import { filterTabs, getActiveNavItemKey, getSidebarForPath } from "@/lib/nav";
import { NAV } from "@/lib/nav/dashboard";
import {
  useLanguage,
  useSidebar,
  useTheme,
  useTranslation,
} from "@/lib/providers";

// ─── DashboardHeader ────────────────────────────────────────────────────────

function DashboardHeader({
  tabs,
  pathname,
  user,
  isAuthenticated,
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
}: {
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
}) {
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
      <div className="hidden flex-1 justify-center lg:flex lg:max-w-[70%]">
        <ResponsiveTabs
          tabs={tabs}
          labels={tabLabels}
          selectedIndex={selectedIdx}
          onSelect={handleTabSelect}
        />
      </div>

      {/* Right Header */}
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

// ─── DashboardSidebar ───────────────────────────────────────────────────────

function DashboardSidebar({
  navigation,
  pathname,
  t,
  isCollapsed,
  isMobileOpen,
  toggle,
  closeMobile,
}: {
  navigation: NavGroup[];
  pathname: string;
  t: (key: string) => string;
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggle: () => void;
  closeMobile: () => void;
}) {
  const sidebarRef = useRef<HTMLElement>(null);
  useScrollPosition(sidebarRef, "sidebar");

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-background fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r-2 transition-all duration-300 md:relative md:z-0 md:h-full md:shrink-0 ${
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
          className="bg-background absolute top-5 -right-3 size-6 p-0"
          onClick={toggle}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <ExpandIcon className="size-4" />
          ) : (
            <CollapseIcon className="size-4" />
          )}
        </Button>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {navigation.map((group, idx) => (
            <div key={idx} className="mb-4">
              {group.key && !isCollapsed && (
                <span className="mb-2 text-xs font-bold tracking-wider uppercase">
                  {t(`navigation.sidebar.${group.key}`)}
                </span>
              )}
              <div className="flex flex-col space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const title = t(`navigation.sidebar.${item.key}`);
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      title={isCollapsed ? title : undefined}
                      className="w-full"
                    >
                      <button
                        role="tab"
                        aria-selected={isActive}
                        className={`flex w-full items-center justify-start gap-3 px-4 py-1 focus:outline-hidden ${
                          isCollapsed ? "justify-center px-2" : "px-3"
                        } ${
                          isActive
                            ? "border-border bg-primary text-primary-foreground border-2 font-semibold"
                            : "border-2 border-transparent"
                        }`}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {!isCollapsed && <span>{title}</span>}
                        {!isCollapsed && item.badge && (
                          <Badge className="ml-auto">{item.badge}</Badge>
                        )}
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

// ─── DashboardPageHeader ────────────────────────────────────────────────────

function DashboardPageHeader({
  activeNavItemKey,
  t,
}: {
  activeNavItemKey?: string;
  t: (key: string, vars?: Record<string, string | number>) => string;
}) {
  return (
    <div className="border-b-2 px-6 py-4">
      <h1 className="text-2xl font-bold tracking-tight">
        {t(
          activeNavItemKey
            ? `navigation.sidebar.${activeNavItemKey}`
            : "dashboard.title",
        )}
      </h1>
      <p className="text-muted-foreground">
        {t(
          activeNavItemKey
            ? `dashboard.${activeNavItemKey}.description`
            : "dashboard.description",
          {
            defaultValue: t(`navigation.sidebar.${activeNavItemKey}`),
          },
        )}
      </p>
    </div>
  );
}

// ─── DashboardLayout ────────────────────────────────────────────────────────

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Authentication
  const { isAuthorized, isLoading } = useRequireAuth();
  const { user, logout, isAuthenticated, hasPermission } = useAuth();

  // Providers
  const { t } = useTranslation();
  const {
    setThemeColor,
    theme,
    toggleTheme,
    mounted: themeMounted,
  } = useTheme();
  const { isCollapsed, isMobileOpen, toggle, openMobile, closeMobile } =
    useSidebar();
  const {
    currentLanguage,
    languages,
    setLanguage,
    mounted: langMounted,
  } = useLanguage();

  // Compute filtered tabs once, memoized
  const tabs = useMemo(() => filterTabs(NAV, hasPermission), [hasPermission]);

  // Derive data for child components
  const navigation = useMemo(
    () => getSidebarForPath(tabs, pathname),
    [tabs, pathname],
  );

  const activeNavItemKey = useMemo(
    () => getActiveNavItemKey(tabs, pathname),
    [tabs, pathname],
  );

  // Refs for scroll positioning
  const mainRef = useRef<HTMLElement>(null);
  useScrollPosition(mainRef, "content");

  // Sync theme color with active tab configuration
  useEffect(() => {
    if (!tabs || tabs.length === 0) return;

    const matchIndex = tabs.findIndex(
      (tab) => pathname === tab.href || pathname.startsWith(`${tab.href}/`),
    );
    const activeIndex = matchIndex !== -1 ? matchIndex : 0;
    const activeTab = tabs[activeIndex];

    if (activeTab?.color) {
      setThemeColor(activeTab.color);
    }
  }, [pathname, tabs, setThemeColor]);

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

  return (
    <div className="mx-auto flex h-screen max-w-7xl flex-col overflow-hidden">
      <DashboardHeader
        tabs={tabs}
        pathname={pathname}
        user={user}
        isAuthenticated={isAuthenticated}
        logout={logout}
        t={t}
        openMobile={openMobile}
        theme={theme}
        toggleTheme={toggleTheme}
        themeMounted={themeMounted}
        currentLanguage={currentLanguage}
        languages={languages}
        setLanguage={setLanguage}
        langMounted={langMounted}
      />
      <div className="relative flex flex-1 overflow-hidden pt-4">
        <DashboardSidebar
          navigation={navigation}
          pathname={pathname}
          t={t}
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          toggle={toggle}
          closeMobile={closeMobile}
        />
        <main
          ref={mainRef}
          className="flex flex-1 flex-col overflow-hidden bg-white"
        >
          <DashboardPageHeader activeNavItemKey={activeNavItemKey} t={t} />
          <div className="flex-1 overflow-y-auto p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
