"use client";

import { ArrowRight, Bell, Calendar } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/lib/auth";
import {
  getAnnouncementCards,
  getEventCards,
  getNewsCards,
} from "@/lib/mock/news";
import { useTranslation } from "@/lib/providers";
import { Button, Card, Badge } from "@/components/retroui";

export default function NewsPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) return null;

  const newsItems = getNewsCards().slice(0, 6);
  const announcements = getAnnouncementCards(user.id).slice(0, 5);
  const upcomingEvents = getEventCards(user.id).slice(0, 3);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "EVENT":
        return "bg-purple-500 border-purple-500 text-white";
      case "FEATURE":
        return "bg-blue-500 border-blue-500 text-white";
      case "PROMOTION":
        return "bg-green-500 border-green-500 text-white";
      case "COURSE":
        return "bg-orange-500 border-orange-500 text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Main News */}
      <div className="space-y-6 lg:col-span-2">
        <h2 className="text-xl font-bold">Tin mới nhất</h2>
        <div className="space-y-4">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className="block"
            >
                <Card className="flex flex-col sm:flex-row gap-4 p-4 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="border-border bg-muted flex h-20 w-20 shrink-0 items-center justify-center border-2 text-3xl">
                        {item.thumbnail ? "📰" : "📰"}
                    </div>
                    <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                        <Badge variant="outline" className={`${getCategoryColor(item.category)} border`}>
                            {item.categoryLabel}
                        </Badge>
                        <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.publishedAt).toLocaleDateString("vi-VN")}
                        </span>
                        </div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                        {item.excerpt}
                        </p>
                    </div>
                    <div className="self-center hidden sm:block">
                        <ArrowRight className="h-5 w-5" />
                    </div>
                </Card>
            </Link>
          ))}
        </div>
        <Link href="/news/all" className="block w-full">
            <Button variant="outline" className="w-full h-12">
            Xem thêm tin tức
            </Button>
        </Link>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Announcements */}
        <Card className="shadow-sm">
            <Card.Content className="p-0">
                <div className="border-border bg-muted flex items-center gap-2 border-b-2 px-4 py-3">
                    <Bell className="h-4 w-4" />
                    <h2 className="font-bold">Thông báo</h2>
                </div>
                <div className="divide-border divide-y">
                    {announcements.map((item) => {
                    const typeStyles = {
                        WARNING: "border-l-yellow-500 bg-yellow-500/5",
                        SUCCESS: "border-l-green-500 bg-green-500/5",
                        INFO: "border-l-blue-500 bg-blue-500/5",
                    };
                    return (
                        <div
                        key={item.id}
                        className={`border-l-4 px-4 py-3 ${typeStyles[item.type] || typeStyles.INFO}`}
                        >
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-muted-foreground mt-1 text-xs">
                            {new Date(item.startsAt).toLocaleDateString("vi-VN")}
                        </p>
                        </div>
                    );
                    })}
                </div>
                <Link
                    href="/news/announcements"
                    className="border-border text-muted-foreground hover:text-foreground block border-t-2 px-4 py-3 text-center text-sm"
                >
                    Xem tất cả thông báo →
                </Link>
            </Card.Content>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-sm">
            <Card.Content className="p-0">
                <div className="border-border bg-muted flex items-center gap-2 border-b-2 px-4 py-3">
                    <Calendar className="h-4 w-4" />
                    <h2 className="font-bold">Sự kiện sắp tới</h2>
                </div>
                <div className="divide-border divide-y">
                    {upcomingEvents.map((event) => {
                    const eventDate = new Date(event.startsAt);
                    const day = eventDate.getDate();
                    const month = eventDate.toLocaleDateString("vi-VN", {
                        month: "short",
                    });

                    return (
                        <div key={event.id} className="flex gap-3 p-4">
                        <div className="border-border bg-primary flex h-12 w-12 shrink-0 flex-col items-center justify-center border-2">
                            <span className="text-lg leading-none font-bold">
                            {day}
                            </span>
                            <span className="text-xs">{month}</span>
                        </div>
                        <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-muted-foreground text-sm">
                            {event.location || "Online"}
                            </p>
                        </div>
                        </div>
                    );
                    })}
                </div>
                <Link
                    href="/news/events"
                    className="border-border text-muted-foreground hover:text-foreground block border-t-2 px-4 py-3 text-center text-sm"
                >
                    Xem tất cả sự kiện →
                </Link>
            </Card.Content>
        </Card>
      </div>
    </div>
  );
}
