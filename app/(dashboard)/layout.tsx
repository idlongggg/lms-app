'use client';

import { AppShell } from '@/components/layout';
import { useRequireAuth } from '@/lib/auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthorized, isLoading } = useRequireAuth();

  if (isLoading) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect via useRequireAuth
  }

  return <AppShell variant="dashboard">{children}</AppShell>;
}
