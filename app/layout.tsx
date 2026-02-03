import './globals.css';

import { Baloo_2 } from 'next/font/google';

import { AuthProvider } from '@/lib/auth';
import { AppProviders } from '@/lib/providers';

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${baloo2.variable} font-sans antialiased`}>
        <AppProviders>
          <AuthProvider>{children}</AuthProvider>
        </AppProviders>
      </body>
    </html>
  );
}
