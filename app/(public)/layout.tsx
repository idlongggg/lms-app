"use client";

import Link from "next/link";

import { LanguageSwitcher, Logo, ThemeToggle } from "@/components/layout";
import { type Language, type LanguageOption } from "@/lib/i18n";
import { useLanguage, useTheme, useTranslation } from "@/lib/providers";

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
  t: (key: string) => string;
}

function HeaderRight({
  currentLanguage,
  languages,
  setLanguage,
  langMounted,
  theme,
  toggleTheme,
  themeMounted,
  t,
}: HeaderRightProps) {
  return (
    <>
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
      <AuthButtons />
    </>
  );
}

interface HeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

function PublicHeader({ left, right }: HeaderProps) {
  return (
    <header className="sticky h-14 border-b-2 shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-2">
        {left}
        {right}
      </div>
    </header>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();
  const {
    currentLanguage,
    languages,
    setLanguage,
    mounted: langMounted,
  } = useLanguage();

  return (
    <>
      <PublicHeader
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
            t={t}
          />
        }
      />
      {children}
      <Footer />
    </>
  );
}
