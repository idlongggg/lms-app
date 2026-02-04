"use client";

import { useTranslation } from "@/lib/providers";

import { PageLayout } from "../../_components/page-layout";

export default function DiscussionsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t("community.discussions.title")}
      description={t("community.discussions.description")}
    >
      <div className="border-border bg-card rounded-none border-2 p-6">
        <p className="text-muted-foreground">
          Tính năng đang được phát triển...
        </p>
      </div>
    </PageLayout>
  );
}
