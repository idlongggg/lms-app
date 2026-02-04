"use client";

import { useTranslation } from "@/lib/providers";

export default function DiscussionsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="border-border bg-card rounded-none border-2 p-6">
        <p className="text-muted-foreground">
          Tính năng đang được phát triển...
        </p>
      </div>
    </div>
  );
}
