import Link from "next/link";

import {
  Header,
  LanguageSwitcher,
  Logo,
  ThemeToggle,
} from "@/components/shared";

import { Footer } from "./_components";

function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
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
    </div>
  );
}

function HeaderRight() {
  return (
    <>
      <LanguageSwitcher />
      <ThemeToggle />
      <AuthButtons />
    </>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header left={<Logo />} right={<HeaderRight />} />
      {children}
      <Footer />
    </>
  );
}
