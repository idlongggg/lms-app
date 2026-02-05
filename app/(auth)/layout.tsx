"use client";

import Link from "next/link";

import {
  Header,
  LanguageSwitcher,
  Logo,
  ThemeToggle,
} from "@/components/layout";
import { useLanguage, useTheme, useTranslation } from "@/lib/providers";

export default function AuthLayout({
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
    <div className="bg-background flex min-h-screen flex-col">
      <Header
        left={<Logo />}
        right={
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
          </>
        }
      />

      {/* Centered content */}
      <main className="flex flex-1 flex-col items-center p-6 pt-16 md:pt-24">
        <div className="w-full max-w-md space-y-6">{children}</div>

        {/* Back to home link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            ← {t("common.backToHome")}
          </Link>
        </div>
      </main>
    </div>
  );
}
