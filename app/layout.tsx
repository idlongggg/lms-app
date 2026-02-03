import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const baloo2 = Baloo_2({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LMS - Learning Management System",
  description: "Hệ thống quản lý học tập với phong cách NeoBrutalism",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${baloo2.variable} font-sans antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
