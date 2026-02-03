'use client';

import Link from 'next/link';

import { Header, LanguageSwitcher, Logo, ThemeToggle } from '@/components/shared';
import { useTranslation } from '@/lib/providers';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Header
        left={<Logo />}
        right={
          <>
            <LanguageSwitcher />
            <ThemeToggle />
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
            ← {t('common.backToHome')}
          </Link>
        </div>
      </main>
    </div>
  );
}
