"use client";

import { Header, Sidebar } from "@/components/layout";
import { SidebarProvider, useSidebar } from "@/hooks/use-sidebar";
import { dashboardNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <Header
        variant="fixed"
        showSearch
        showUserMenu
        showMobileToggle
      />
      <div className="mx-auto max-w-7xl">
        <div className="relative flex pt-16">
          <Sidebar navigation={dashboardNavigation} variant="collapsible" />
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
