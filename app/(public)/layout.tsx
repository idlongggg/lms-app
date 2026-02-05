"use client";

import Link from "next/link";

import {
  Header,
  LanguageSwitcher,
  Logo,
  ThemeToggle,
} from "@/components/layout";
import { Button } from "@/components/ui";
import { type Language, type LanguageOption } from "@/lib/i18n";
import { useLanguage, useTheme } from "@/lib/providers";

import { Footer } from "./_components";

function AuthButtons() {
  return (
    <nav className="flex items-center gap-2" aria-label="Authentication">
      <Link
        href="/auth/login"
        className="hover:bg-muted hidden px-4 py-2 font-medium transition-colors sm:block"
      >
        Đăng nhập
      </Link>
      <Link
        href="/auth/register"
        className="border-border bg-primary flex h-9 items-center border-2 px-4 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
      >
        Đăng ký
      </Link>
    </nav>
  );
}

interface HeaderRightProps {
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  setLanguage: (code: Language) => void;
  langMounted: boolean;
  theme: string | undefined;
  toggleTheme: () => void;
  themeMounted: boolean;
}

function HeaderRight({
  currentLanguage,
  languages,
  setLanguage,
  langMounted,
  theme,
  toggleTheme,
  themeMounted,
}: HeaderRightProps) {
  return (
    <>
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        languages={languages}
        setLanguage={setLanguage}
        mounted={langMounted}
      />
      <ThemeToggle
        theme={theme}
        toggleTheme={toggleTheme}
        mounted={themeMounted}
      />
      <AuthButtons />
    </>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();
  const {
    currentLanguage,
    languages,
    setLanguage,
    mounted: langMounted,
  } = useLanguage();

  return (
    <>
      <Header
        left={<Logo />}
        right={
          <HeaderRight
            currentLanguage={currentLanguage}
            languages={languages}
            setLanguage={setLanguage}
            langMounted={langMounted}
            theme={theme}
            toggleTheme={toggleTheme}
            themeMounted={themeMounted}
          />
        }
      />
      {children}
      <Footer />
    </>
  );
}
