'use client';

import Link from 'next/link';

import { Header, Logo, ThemeToggle } from '@/components/common';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Header left={<Logo />} right={<ThemeToggle />} />

      {/* Centered content */}
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">{children}</div>

        {/* Back to home link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </main>
    </div>
  );
}
