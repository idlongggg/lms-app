"use client";

import {
  Calendar,
  CheckCircle,
  Clock,
  Play,
  Search,
  Swords,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Badge, Button, Card, Input, Progress } from "@/components/retroui";
import { mockJoinableTournaments } from "@/lib/mock/classes";
import { useTranslation } from "@/lib/providers";

type FilterType = "all" | "available" | "joined";

export function JoinTournamentSection() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tournaments = mockJoinableTournaments;

  const filteredTournaments = tournaments.filter((tournament) => {
    if (filter === "available" && tournament.isJoined) return false;
    if (filter === "joined" && !tournament.isJoined) return false;
    if (
      searchQuery &&
      !tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const stats = {
    available: tournaments.filter((t) => !t.isJoined).length,
    joined: tournaments.filter((t) => t.isJoined).length,
    active: tournaments.filter((t) => t.status === "ACTIVE").length,
  };

  const filters: { label: string; value: FilterType }[] = [
    { label: t("tournament.filters.all"), value: "all" },
    { label: t("tournament.filters.available"), value: "available" },
    { label: t("tournament.filters.joined"), value: "joined" },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold">{t("tournament.join.title")}</h2>
        <p className="text-muted-foreground">
          {t("tournament.join.description")}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">
                {t("tournament.available")}
              </p>
              <p className="text-2xl font-bold text-blue-500">
                {stats.available}
              </p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">
                {t("tournament.joined")}
              </p>
              <p className="text-2xl font-bold text-green-500">
                {stats.joined}
              </p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-500">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">
                {t("tournament.active")}
              </p>
              <p className="text-2xl font-bold text-orange-500">
                {stats.active}
              </p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-orange-500">
              <Play className="h-5 w-5 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-1 items-center gap-2">
          <Search className="text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder={t("tournament.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tournament Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTournaments.map((tournament) => (
          <Card
            key={tournament.id}
            className={`transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 ${
              tournament.isJoined ? "border-green-500" : ""
            }`}
          >
            <div className="p-4">
              {/* Header */}
              <div className="mb-3 flex items-start justify-between">
                <div
                  className={`border-border flex h-12 w-12 items-center justify-center border-2 ${
                    tournament.type === "RANKED"
                      ? "bg-purple-500"
                      : tournament.type === "PRACTICE"
                        ? "bg-green-500"
                        : "bg-blue-500"
                  }`}
                >
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge
                    variant={
                      tournament.type === "RANKED"
                        ? "surface"
                        : tournament.type === "PRACTICE"
                          ? "solid"
                          : "outline"
                    }
                  >
                    {tournament.type === "RANKED"
                      ? t("tournament.type.ranked")
                      : tournament.type === "PRACTICE"
                        ? t("tournament.type.practice")
                        : t("tournament.type.class")}
                  </Badge>
                  {tournament.isJoined && (
                    <span className="flex items-center gap-1 text-xs text-green-500">
                      <CheckCircle className="h-3 w-3" />
                      {t("tournament.joined")}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <h3 className="mb-1 text-lg font-bold">{tournament.name}</h3>
              <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                {tournament.description}
              </p>

              {/* Info */}
              <div className="mb-4 space-y-2 text-sm">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {tournament.status === "ACTIVE"
                      ? t("tournament.active")
                      : new Date(tournament.startTime).toLocaleString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                  </span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {t("tournament.duration", {
                      minutes: tournament.duration,
                    })}{" "}
                    •{" "}
                    {t("tournament.questions", {
                      count: tournament.questionCount,
                    })}
                  </span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    {tournament.currentParticipants}/
                    {tournament.maxParticipants} {t("tournament.participants")}
                  </span>
                </div>
              </div>

              {/* Progress bar for participants */}
              <div className="mb-4">
                <Progress
                  value={
                    (tournament.currentParticipants /
                      tournament.maxParticipants) *
                    100
                  }
                  className={
                    tournament.currentParticipants /
                      tournament.maxParticipants >
                    0.8
                      ? "[&>div]:bg-red-500"
                      : "[&>div]:bg-green-500"
                  }
                />
              </div>

              {/* Actions */}
              {tournament.isJoined ? (
                <div className="flex gap-2">
                  {tournament.status === "ACTIVE" ? (
                    <Button className="flex-1 bg-green-500 hover:bg-green-600">
                      <Swords className="mr-2 h-4 w-4" />
                      {t("tournament.enterBattle")}
                    </Button>
                  ) : (
                    <Button variant="outline" className="flex-1">
                      {t("tournament.viewDetails")}
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  className="w-full"
                  disabled={
                    tournament.currentParticipants >= tournament.maxParticipants
                  }
                >
                  {tournament.currentParticipants >=
                  tournament.maxParticipants ? (
                    t("tournament.full")
                  ) : (
                    <>
                      <Trophy className="mr-2 h-4 w-4" />
                      {t("tournament.registerNow")}
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTournaments.length === 0 && (
        <div className="border-border bg-muted/50 border-2 border-dashed p-12 text-center">
          <Trophy className="text-muted-foreground mx-auto h-12 w-12" />
          <h3 className="mt-4 text-lg font-bold">{t("tournament.notFound")}</h3>
        </div>
      )}
    </div>
  );
}
