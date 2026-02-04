"use client";

import { useTranslation } from "@/lib/providers";

export default function MyAchievementsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("navigation.sidebar.myAchievements")}</h1>
        <p className="text-muted-foreground">{t("navigation.sidebar.myAchievements")} content coming soon.</p>
      </div>
    </div>
  );
}
