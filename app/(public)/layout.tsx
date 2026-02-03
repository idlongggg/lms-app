import Link from 'next/link';
import { Header, Footer, Logo, ThemeToggle } from '@/components/common';

const publicNavItems = [
  { title: 'Tính năng', href: '#features' },
  { title: 'Giải đấu', href: '#tournaments' },
  { title: 'Về chúng tôi', href: '#about' },
];

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

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        className="absolute bg-transparent"
        left={<Logo />}
        center={
          <nav className="flex items-center gap-6">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:bg-muted px-4 py-2 font-medium transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        }
        right={
          <>
            <ThemeToggle />
            <AuthButtons />
          </>
        }
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
