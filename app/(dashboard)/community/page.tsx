"use client";

import { useTranslation } from "@/lib/providers";

import { PageLayout } from "../_components/page-layout";

export default function CommunityPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t("community.title")}
      description={t("community.description")}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border-border bg-card rounded-none border-2 p-6">
          <h3 className="mb-2 text-lg font-semibold">
            {t("community.questions.title")}
          </h3>
          <p className="text-muted-foreground text-sm">
            {t("community.questions.description")}
          </p>
        </div>
        <div className="border-border bg-card rounded-none border-2 p-6">
          <h3 className="mb-2 text-lg font-semibold">
            {t("community.discussions.title")}
          </h3>
          <p className="text-muted-foreground text-sm">
            {t("community.discussions.description")}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
