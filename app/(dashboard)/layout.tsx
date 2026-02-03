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
      <Sidebar navigation={dashboardNavigation} variant="collapsible" />
      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] pt-16 transition-all duration-300",
          isCollapsed ? "md:pl-16" : "md:pl-64"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
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
