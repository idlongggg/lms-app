"use client";

import { Loader } from "@/components/ui";
import { useRequireAuth } from "@/lib/auth";

import { Header } from "./_layout/Header";
import { Main } from "./_layout/Main";
import { Sidebar } from "./_layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthorized, isLoading } = useRequireAuth();

  if (isLoading) {
    return (
      <div className="bg-background flex h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="bg-background overflohidden flex h-screen flex-col">
        <div className="mx-auto w-full max-w-7xl flex-1 overflow-hidden pt-6">
          <div className="flex h-full">
            <Sidebar />
            <Main>{children}</Main>
          </div>
        </div>
      </div>
    </>
  );
}
