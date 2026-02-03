import { Header, Footer } from '@/components/layout';

const publicNavItems = [
  { title: 'Tính năng', href: '#features' },
  { title: 'Giải đấu', href: '#tournaments' },
  { title: 'Về chúng tôi', href: '#about' },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="transparent" simpleNavItems={publicNavItems} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
