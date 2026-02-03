'use client';

import { Calendar, Bell, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { getNewsCards, getAnnouncementCards, getEventCards } from "@/lib/mock/news";
import Link from "next/link";

export default function NewsPage() {
  const { user } = useAuth();
  
  if (!user) return null;

  const newsItems = getNewsCards().slice(0, 6);
  const announcements = getAnnouncementCards(user.id).slice(0, 5);
  const upcomingEvents = getEventCards(user.id).slice(0, 3);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'EVENT': return 'bg-purple-500';
      case 'FEATURE': return 'bg-blue-500';
      case 'PROMOTION': return 'bg-green-500';
      case 'COURSE': return 'bg-orange-500';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Tin tức</h1>
        <p className="text-muted-foreground">
          Cập nhật mới nhất từ LMS
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main News */}
        <div className="space-y-6 lg:col-span-2">
          <h2 className="text-xl font-bold">Tin mới nhất</h2>
          <div className="space-y-4">
            {newsItems.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="flex gap-4 border-2 border-border bg-background p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center border-2 border-border bg-muted text-3xl">
                  {item.thumbnail ? '📰' : '📰'}
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`border border-border px-2 py-0.5 text-xs font-medium text-white ${getCategoryColor(item.category)}`}>
                      {item.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.publishedAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
                <div className="self-center">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/news/all"
            className="block w-full border-2 border-border bg-background py-3 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm text-center"
          >
            Xem thêm tin tức
          </Link>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Announcements */}
          <div className="border-2 border-border bg-background shadow-sm">
            <div className="flex items-center gap-2 border-b-2 border-border bg-muted px-4 py-3">
              <Bell className="h-4 w-4" />
              <h2 className="font-bold">Thông báo</h2>
            </div>
            <div className="divide-y divide-border">
              {announcements.map((item) => {
                const typeStyles = {
                  WARNING: 'border-l-yellow-500 bg-yellow-500/5',
                  SUCCESS: 'border-l-green-500 bg-green-500/5',
                  INFO: 'border-l-blue-500 bg-blue-500/5',
                };
                return (
                  <div
                    key={item.id}
                    className={`border-l-4 px-4 py-3 ${typeStyles[item.type] || typeStyles.INFO}`}
                  >
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(item.startsAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                );
              })}
            </div>
            <Link
              href="/news/announcements"
              className="block border-t-2 border-border px-4 py-3 text-center text-sm text-muted-foreground hover:text-foreground"
            >
              Xem tất cả thông báo →
            </Link>
          </div>

          {/* Upcoming Events */}
          <div className="border-2 border-border bg-background shadow-sm">
            <div className="flex items-center gap-2 border-b-2 border-border bg-muted px-4 py-3">
              <Calendar className="h-4 w-4" />
              <h2 className="font-bold">Sự kiện sắp tới</h2>
            </div>
            <div className="divide-y divide-border">
              {upcomingEvents.map((event) => {
                const eventDate = new Date(event.startsAt);
                const day = eventDate.getDate();
                const month = eventDate.toLocaleDateString('vi-VN', { month: 'short' });
                
                return (
                  <div key={event.id} className="flex gap-3 p-4">
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center border-2 border-border bg-primary">
                      <span className="text-lg font-bold leading-none">{day}</span>
                      <span className="text-xs">{month}</span>
                    </div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.location || 'Online'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              href="/news/events"
              className="block border-t-2 border-border px-4 py-3 text-center text-sm text-muted-foreground hover:text-foreground"
            >
              Xem tất cả sự kiện →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
