"use client";

import { Loader } from "@/components/retroui";
import { useRequireAuth } from "@/lib/auth";

export default function AdminSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthorized, isLoading } = useRequireAuth([
    "root-admin",
    "tenant-admin",
  ]);

  if (isLoading) {
    return (
      <div className="bg-background flex h-full items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
