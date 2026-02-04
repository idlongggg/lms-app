"use client";

import { useTranslation } from "@/lib/providers";

export default function CommunityPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
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
    </div>
  );
}
