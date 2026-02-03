"use client";

import { useEffect } from "react";
import { Header, Sidebar } from "@/components/layout";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { adminNavigation } from "@/lib/navigation";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  // Force dark mode for admin
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header variant="admin" showSearch showUserMenu showMobileToggle />
      <Sidebar navigation={adminNavigation} variant="expanded" />
      <main className="min-h-[calc(100vh-4rem)] pt-16 md:pl-64">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SidebarProvider>
  );
}
