"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { Header, Sidebar, DashboardNav } from "@/components/layout";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { getSidebarForPath } from "@/lib/navigation";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sidebarNavigation = getSidebarForPath(pathname);
  const mainRef = useRef<HTMLElement>(null);

  useScrollPosition(mainRef, "content");

  return (
    <div className="h-screen bg-background">
      <Header
        variant="fixed"
        showSearch
        showUserMenu
        showMobileToggle
      >
        <DashboardNav />
      </Header>
      <div className="mx-auto h-[calc(100vh-4rem)] max-w-7xl">
        <div className="relative flex h-full overflow-hidden pt-16">
          <Sidebar navigation={sidebarNavigation} variant="collapsible" />
          <main ref={mainRef} className="h-full flex-1 overflow-y-auto">
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}
