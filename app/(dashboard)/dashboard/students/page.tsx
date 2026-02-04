"use client";

import { useTranslation } from "@/lib/providers";

export default function StudentsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {t("navigation.sidebar.allStudents")}
        </h1>
        <p className="text-muted-foreground">
          {t("navigation.sidebar.allStudents")} content coming soon.
        </p>
      </div>
    </div>
  );
}
