"use client";

import {
  Calendar,
  ChevronRight,
  Clock,
  Gift,
  MapPin,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import { useTranslation } from "@/lib/providers";

import { PageLayout } from "../../_components/page-layout";

const events = [
  {
    id: 1,
    title: "Code Marathon 2026",
    description:
      "Cuộc thi lập trình marathon kéo dài 24 giờ với nhiều thử thách hấp dẫn. Tham gia để giành giải thưởng lớn!",
    type: "competition",
    startDate: "2026-02-15T09:00:00",
    endDate: "2026-02-16T09:00:00",
    location: "Online",
    participants: 245,
    maxParticipants: 500,
    rewards: "10,000 xu + Huy hiệu độc quyền",
    status: "upcoming",
    image: "🏃",
  },
  {
    id: 2,
    title: "Workshop: React Server Components",
    description:
      "Tìm hiểu về React Server Components và cách áp dụng vào dự án thực tế cùng chuyên gia.",
    type: "workshop",
    startDate: "2026-02-12T19:00:00",
    endDate: "2026-02-12T21:00:00",
    location: "Google Meet",
    participants: 89,
    maxParticipants: 100,
    rewards: "200 xu + Certificate",
    status: "upcoming",
    image: "📚",
  },
  {
    id: 3,
    title: "Valentine's Day Challenge",
    description:
      "Hoàn thành các bài quiz trong ngày Valentine để nhận quà đặc biệt!",
    type: "event",
    startDate: "2026-02-14T00:00:00",
    endDate: "2026-02-14T23:59:00",
    location: "Platform",
    participants: null,
    maxParticipants: null,
    rewards: "Double XP + Avatar Valentine",
    status: "upcoming",
    image: "💝",
  },
  {
    id: 4,
    title: "TypeScript Deep Dive",
    description:
      "Khám phá những tính năng nâng cao của TypeScript như Generics, Utility Types, và Pattern Matching.",
    type: "workshop",
    startDate: "2026-02-08T10:00:00",
    endDate: "2026-02-08T12:00:00",
    location: "Zoom",
    participants: 156,
    maxParticipants: 150,
    rewards: "150 xu",
    status: "full",
    image: "📘",
  },
  {
    id: 5,
    title: "JavaScript Quiz Championship Q1",
    description:
      "Giải vô địch Quiz JavaScript quý 1 năm 2026. Top 3 sẽ nhận thưởng đặc biệt!",
    type: "competition",
    startDate: "2026-01-25T14:00:00",
    endDate: "2026-01-25T18:00:00",
    location: "Online",
    participants: 320,
    maxParticipants: 300,
    rewards: "5,000 xu cho Top 3",
    status: "ended",
    image: "🏆",
  },
];

const typeConfig: Record<
  string,
  { label: string; color: string; bgColor: string; icon: typeof Trophy }
> = {
  competition: {
    label: "Thi đấu",
    color: "text-red-700",
    bgColor: "bg-red-100",
    icon: Trophy,
  },
  workshop: {
    label: "Workshop",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    icon: Star,
  },
  event: {
    label: "Sự kiện",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
    icon: Zap,
  },
};

const statusConfig: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  upcoming: {
    label: "Sắp diễn ra",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
  full: {
    label: "Đã đủ người",
    color: "text-orange-700",
    bgColor: "bg-orange-100",
  },
  ended: {
    label: "Đã kết thúc",
    color: "text-gray-500",
    bgColor: "bg-gray-100",
  },
};

export default function EventsPage() {
  const { t } = useTranslation();
  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter(
    (e) => e.status === "ended" || e.status === "full",
  );

  return (
    <PageLayout
      title={t("news.events.title")}
      description={t("news.events.description")}
      actions={
        <select className="border-border bg-background border-2 px-4 py-2 font-medium">
          <option>Tất cả loại</option>
          <option>Thi đấu</option>
          <option>Workshop</option>
          <option>Sự kiện</option>
        </select>
      }
    >
      <div className="space-y-8">
        {/* Featured Event */}
        {upcomingEvents[0] && (
          <div className="border-primary bg-primary/10 border-2 p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="border-border bg-primary flex h-32 w-32 shrink-0 items-center justify-center border-2 text-6xl">
                {upcomingEvents[0].image}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`border-border border px-2 py-0.5 text-xs font-medium ${typeConfig[upcomingEvents[0].type].bgColor} ${typeConfig[upcomingEvents[0].type].color}`}
                  >
                    {typeConfig[upcomingEvents[0].type].label}
                  </span>
                  <span className="border-border border bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    Nổi bật
                  </span>
                </div>
                <h2 className="mt-2 text-2xl font-bold">
                  {upcomingEvents[0].title}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {upcomingEvents[0].description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(upcomingEvents[0].startDate).toLocaleDateString(
                      "vi-VN",
                      {
                        day: "numeric",
                        month: "long",
                      },
                    )}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(upcomingEvents[0].startDate).toLocaleTimeString(
                      "vi-VN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {upcomingEvents[0].location}
                  </span>
                  {upcomingEvents[0].participants !== null && (
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {upcomingEvents[0].participants}/
                      {upcomingEvents[0].maxParticipants}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Gift className="h-4 w-4" />
                    {upcomingEvents[0].rewards}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <button className="border-border bg-primary border-2 px-6 py-3 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
                  Đăng ký ngay
                </button>
                <button className="border-border bg-background border px-6 py-2 text-sm">
                  Thêm vào lịch
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div className="space-y-4">
          <h2 className="font-bold">Sắp diễn ra</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingEvents.slice(1).map((event) => {
              const type = typeConfig[event.type];
              const status = statusConfig[event.status];
              return (
                <div
                  key={event.id}
                  className="border-border bg-background border-2 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex gap-4 p-4">
                    <div className="border-border bg-muted flex h-16 w-16 shrink-0 items-center justify-center border-2 text-3xl">
                      {event.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`border-border border px-2 py-0.5 text-xs font-medium ${type.bgColor} ${type.color}`}
                        >
                          {type.label}
                        </span>
                        <span
                          className={`border-border border px-2 py-0.5 text-xs font-medium ${status.bgColor} ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </div>
                      <h3 className="mt-1 font-bold">{event.title}</h3>
                      <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-3 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(event.startDate).toLocaleDateString(
                            "vi-VN",
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(event.startDate).toLocaleTimeString(
                            "vi-VN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground h-5 w-5 shrink-0 self-center" />
                  </div>
                  <div className="border-border bg-muted flex items-center justify-between border-t px-4 py-2 text-sm">
                    <span className="flex items-center gap-1">
                      <Gift className="h-4 w-4" />
                      {event.rewards}
                    </span>
                    <button className="text-secondary font-medium hover:underline">
                      Chi tiết
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Past Events */}
        <div className="space-y-4">
          <h2 className="font-bold">Đã kết thúc</h2>
          <div className="space-y-2">
            {pastEvents.map((event) => {
              const status = statusConfig[event.status];
              return (
                <div
                  key={event.id}
                  className="border-border bg-background flex items-center gap-4 border-2 p-3 opacity-70"
                >
                  <div className="border-border bg-muted flex h-10 w-10 shrink-0 items-center justify-center border text-xl">
                    {event.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{event.title}</h3>
                      <span
                        className={`px-1.5 py-0.5 text-xs ${status.bgColor} ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {new Date(event.startDate).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground text-sm">
                    Xem kết quả
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
