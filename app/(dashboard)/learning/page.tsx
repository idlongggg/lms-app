"use client";

import { BookOpen, CheckCircle, Clock, Play, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button, Card, Progress } from "@/components/retroui";
import { Can, useAuth } from "@/lib/auth";
import { PERMISSIONS } from "@/lib/auth/types";
import { getSubjectsWithProgress } from "@/lib/mock/courses";
import { useTranslation } from "@/lib/providers";

import {
  TeacherClassesSection,
  TeacherQuestionsSection,
} from "../_components";

type FilterType = "all" | "in-progress" | "completed" | "not-started";

export default function MyLearningPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>("all");

  if (!user) return null;

  const subjectsWithProgress = getSubjectsWithProgress(user.id);

  const filteredSubjects = subjectsWithProgress.filter((subject) => {
    const progress = subject.completedLessons / subject.totalLessons;
    switch (filter) {
      case "in-progress":
        return progress > 0 && progress < 1;
      case "completed":
        return progress === 1;
      case "not-started":
        return progress === 0;
      default:
        return true;
    }
  });

  const filters: { label: string; value: FilterType }[] = [
    { label: t("learning.filters.all"), value: "all" },
    { label: t("learning.filters.inProgress"), value: "in-progress" },
    { label: t("learning.filters.completed"), value: "completed" },
    { label: t("learning.filters.notStarted"), value: "not-started" },
  ];

  return (
    <div className="space-y-6">
        {/* Stats Summary */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary h-5 w-5" />
              <span className="text-muted-foreground text-sm">
                {t("learning.totalSubjects")}
              </span>
            </div>
            <p className="mt-1 text-2xl font-bold">
              {subjectsWithProgress.length}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <span className="text-muted-foreground text-sm">
                {t("learning.inProgress")}
              </span>
            </div>
            <p className="mt-1 text-2xl font-bold">
              {
                subjectsWithProgress.filter(
                  (s) =>
                    s.completedLessons > 0 &&
                    s.completedLessons < s.totalLessons,
                ).length
              }
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-muted-foreground text-sm">
                {t("learning.completed")}
              </span>
            </div>
            <p className="mt-1 text-2xl font-bold">
              {
                subjectsWithProgress.filter(
                  (s) => s.completedLessons === s.totalLessons,
                ).length
              }
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-muted-foreground text-sm">
                {t("learning.totalLessons")}
              </span>
            </div>
            <p className="mt-1 text-2xl font-bold">
              {subjectsWithProgress.reduce(
                (sum, s) => sum + s.completedLessons,
                0,
              )}
              /
              {subjectsWithProgress.reduce((sum, s) => sum + s.totalLessons, 0)}
            </p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Subject List */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSubjects.map((subject) => {
            const progress = Math.round(
              (subject.completedLessons / subject.totalLessons) * 100,
            );
            const isCompleted = progress === 100;
            const isNotStarted = progress === 0;

            return (
              <Card
                key={subject.id}
                className="overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1"
              >
                <div
                  className={`border-border border-b-2 p-4 ${
                    isCompleted
                      ? "bg-green-500"
                      : isNotStarted
                        ? "bg-muted"
                        : "bg-primary"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{subject.name}</h3>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <BookOpen className="h-5 w-5" />
                    )}
                  </div>
                  <p className="mt-1 text-sm opacity-80">
                    {t("learning.grade")} {subject.grade}
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-muted-foreground text-sm">
                    {subject.completedLessons}/{subject.totalLessons}{" "}
                    {t("learning.lessons")} ({progress}%)
                  </p>
                  <Progress
                    value={progress}
                    className={`mt-2 ${isCompleted ? "[&>div]:bg-green-500" : ""}`}
                  />
                  <div className="mt-4">
                    <Button asChild variant="secondary" className="w-full">
                      <Link href={`/learning/courses/${subject.id}`}>
                        <Play className="mr-2 h-4 w-4" />
                        {isNotStarted
                          ? t("learning.start")
                          : isCompleted
                            ? t("learning.review")
                            : t("learning.continue")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="border-border text-muted-foreground border-2 border-dashed p-8 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p>{t("learning.noSubjects")}</p>
          </div>
        )}

        {/* Teacher Sections - visible only with QUESTION_CREATE permission */}
        <Can permission={PERMISSIONS.QUESTION_CREATE}>
          <div className="border-border border-t-2 pt-6">
            <TeacherQuestionsSection />
          </div>
        </Can>

        {/* Teacher Classes Section - visible only with PROGRESS_READ permission */}
        <Can permission={PERMISSIONS.PROGRESS_READ}>
          <div className="border-border border-t-2 pt-6">
            <TeacherClassesSection />
          </div>
        </Can>
    </div>
  );
}
