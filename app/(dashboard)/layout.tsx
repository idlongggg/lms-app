"use client";

import { usePathname } from "next/navigation";
import { Header, Sidebar, DashboardNav } from "@/components/layout";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { getSidebarForPath } from "@/lib/navigation";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const sidebarNavigation = getSidebarForPath(pathname);

  return (
    <div className="min-h-screen bg-background">
      <Header
        variant="fixed"
        showSearch
        showUserMenu
        showMobileToggle
      >
        <DashboardNav />
      </Header>
      <div className="mx-auto max-w-7xl">
        <div className="relative flex pt-16">
          <Sidebar navigation={sidebarNavigation} variant="collapsible" />
          <main className="min-h-[calc(100vh-4rem)] flex-1">
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
