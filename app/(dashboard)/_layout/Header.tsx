"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Header as LayoutHeader,
  LanguageSwitcher,
  Logo,
  MobileMenuButton,
  Search,
  ThemeToggle,
  UserMenu,
} from "@/components/layout";
import { HeaderTabs } from "@/components/layout/HeaderTabs";
import { Button, Text } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { filterTabs } from "@/lib/nav";
import {
  useLanguage,
  useSidebar,
  useTheme,
  useTranslation,
} from "@/lib/providers";

import { NAV } from "../nav";

export function Header() {
  const pathname = usePathname();
  const { hasPermission, user, logout, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const { openMobile } = useSidebar();
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

  const tabs = filterTabs(NAV, hasPermission);
  const showTabs = tabs.length > 0;

  return (
    <LayoutHeader
      left={
        <div className="flex gap-2">
          <MobileMenuButton onClick={openMobile} t={t} />
          <Link href="/" className="flex items-center gap-2">
            <Button size="icon" className="size-9">
              <Logo />
            </Button>
            <Text as="h3" className="font-bold">
              {t("app.name")}
            </Text>
          </Link>
        </div>
      }
      center={
        showTabs && (
          <HeaderTabs
            tabs={tabs}
            pathname={pathname}
            t={t}
            setThemeColor={setThemeColor}
          />
        )
      }
      right={
        <div className="flex gap-2">
          <Search t={t} />
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
          <UserMenu
            user={user}
            logout={logout}
            isAuthenticated={isAuthenticated}
            t={t}
          />
        </div>
      }
    />
  );
}
