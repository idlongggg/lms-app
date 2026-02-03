"use client";

import { useEffect, useRef } from "react";
import { Header, Sidebar } from "@/components/layout";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { adminNavigation } from "@/lib/navigation";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);

  useScrollPosition(mainRef, "content");

  // Force dark mode for admin
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <div className="h-screen bg-background">
      <Header variant="admin" showSearch showUserMenu showMobileToggle />
      <div className="mx-auto h-[calc(100vh-4rem)] max-w-7xl">
        <div className="relative flex h-full overflow-hidden pt-16">
          <Sidebar navigation={adminNavigation} variant="expanded" />
          <main ref={mainRef} className="h-full flex-1 overflow-y-auto">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
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
