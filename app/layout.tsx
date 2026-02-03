import { AuthProvider } from '@/lib/auth';
import { Baloo_2 } from 'next/font/google';
import './globals.css';

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-body',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${baloo2.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
