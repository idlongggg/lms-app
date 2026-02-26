"use client";

import { Calendar, Clock, Filter, Trophy, Users } from "lucide-react";

import { Badge, Button, Card, Select } from "@/components/ui";
import { useTranslation } from "@/lib/providers";

const upcomingMatches = [
  {
    id: 1,
    title: "JavaScript Championship",
    date: "2026-02-10",
    time: "19:00",
    participants: 32,
    maxParticipants: 64,
    prize: "500 xu",
    status: "registration",
    difficulty: "Trung bình",
  },
  {
    id: 2,
    title: "React Masters Cup",
    date: "2026-02-14",
    time: "20:00",
    participants: 48,
    maxParticipants: 64,
    prize: "1000 xu",
    status: "registration",
    difficulty: "Nâng cao",
  },
  {
    id: 3,
    title: "TypeScript Challenge",
    date: "2026-02-17",
    time: "18:30",
    participants: 16,
    maxParticipants: 32,
    prize: "300 xu",
    status: "registration",
    difficulty: "Cơ bản",
  },
  {
    id: 4,
    title: "CSS Battle Weekly",
    date: "2026-02-08",
    time: "21:00",
    participants: 28,
    maxParticipants: 32,
    prize: "200 xu",
    status: "starting_soon",
    difficulty: "Cơ bản",
  },
];

const myRegistered = [
  {
    id: 5,
    title: "Algorithm Arena",
    date: "2026-02-12",
    time: "19:30",
    status: "registered",
  },
];

export default function SchedulePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* My Registered */}
      {myRegistered.length > 0 && (
        <Card className="border-primary bg-primary/10 shadow-sm">
          <Card.Content className="p-4">
            <h2 className="mb-3 font-bold">Đã đăng ký</h2>
            <div className="space-y-2">
              {myRegistered.map((match) => (
                <div
                  key={match.id}
                  className="border-border bg-background flex items-center justify-between border-2 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="border-border bg-primary flex h-10 w-10 items-center justify-center border-2">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{match.title}</p>
                      <p className="text-muted-foreground text-sm">
                        {new Date(match.date).toLocaleDateString("vi-VN")} •{" "}
                        {match.time}
                      </p>
                    </div>
                  </div>
                  <Badge className="border-green-200 bg-green-100 text-green-700">
                    Đã đăng ký
                  </Badge>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <span className="text-sm font-medium">Lọc:</span>
        </div>
        <div className="w-40">
          <Select defaultValue="all">
            <Select.Trigger className="h-9">
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="all">Tất cả độ khó</Select.Item>
              <Select.Item value="basic">Cơ bản</Select.Item>
              <Select.Item value="medium">Trung bình</Select.Item>
              <Select.Item value="advanced">Nâng cao</Select.Item>
            </Select.Content>
          </Select>
        </div>
        <div className="w-40">
          <Select defaultValue="week">
            <Select.Trigger className="h-9">
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="week">Tuần này</Select.Item>
              <Select.Item value="month">Tháng này</Select.Item>
              <Select.Item value="all">Tất cả</Select.Item>
            </Select.Content>
          </Select>
        </div>
      </div>

      {/* Calendar View */}
      <div className="grid gap-4 lg:grid-cols-2">
        {upcomingMatches.map((match) => (
          <Card
            key={match.id}
            className="shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
          >
            <Card.Content className="p-0">
              {/* Header */}
              <div className="border-border bg-muted flex items-center justify-between border-b-2 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">
                    {new Date(match.date).toLocaleDateString("vi-VN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
                {match.status === "starting_soon" && (
                  <Badge className="animate-pulse border-orange-200 bg-orange-100 text-orange-700">
                    Sắp bắt đầu
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold">{match.title}</h3>
                    <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {match.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {match.participants}/{match.maxParticipants}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        {match.prize}
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={
                      match.difficulty === "Cơ bản"
                        ? "border-green-200 bg-green-100 text-green-700"
                        : match.difficulty === "Trung bình"
                          ? "border-yellow-200 bg-yellow-100 text-yellow-700"
                          : "border-red-200 bg-red-100 text-red-700"
                    }
                  >
                    {match.difficulty}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Số người đăng ký
                    </span>
                    <span className="font-medium">
                      {Math.round(
                        (match.participants / match.maxParticipants) * 100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="border-border bg-muted h-2 w-full border">
                    <div
                      className="bg-secondary h-full transition-all"
                      style={{
                        width: `${(match.participants / match.maxParticipants) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Action */}
                <Button className="mt-4 w-full">Đăng ký tham gia</Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}
