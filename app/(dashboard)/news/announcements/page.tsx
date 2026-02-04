"use client";

import {
  AlertCircle,
  Bell,
  CheckCircle,
  ChevronRight,
  Clock,
  Info,
  Megaphone,
  Pin,
} from "lucide-react";

import { useTranslation } from "@/lib/providers";


const announcements = [
  {
    id: 1,
    title: "Bảo trì hệ thống ngày 10/02/2026",
    content:
      "Hệ thống sẽ tạm ngưng hoạt động từ 00:00 đến 04:00 ngày 10/02/2026 để nâng cấp server. Xin lỗi vì sự bất tiện này.",
    type: "warning",
    isPinned: true,
    createdAt: "2026-02-05T10:00:00",
    author: "Admin",
  },
  {
    id: 2,
    title: "Ra mắt tính năng thách đấu nhóm",
    content:
      "Chúng tôi vui mừng thông báo tính năng thách đấu nhóm đã chính thức ra mắt! Hãy lập đội và tham gia ngay.",
    type: "info",
    isPinned: true,
    createdAt: "2026-02-03T14:30:00",
    author: "Product Team",
  },
  {
    id: 3,
    title: "Cập nhật chính sách điểm thưởng",
    content:
      "Từ ngày 01/03/2026, chính sách tích điểm sẽ được điều chỉnh. Chi tiết xem tại trang Quy định.",
    type: "info",
    isPinned: false,
    createdAt: "2026-02-01T09:00:00",
    author: "Admin",
  },
  {
    id: 4,
    title: "Hoàn tất nâng cấp hệ thống đăng nhập",
    content:
      "Hệ thống đăng nhập đã được nâng cấp thành công. Giờ đây bạn có thể đăng nhập bằng Google, GitHub và Discord.",
    type: "success",
    isPinned: false,
    createdAt: "2026-01-28T16:00:00",
    author: "Tech Team",
  },
  {
    id: 5,
    title: "Thông báo nghỉ Tết Nguyên Đán 2026",
    content:
      "Nhân dịp Tết Nguyên Đán, đội ngũ hỗ trợ sẽ nghỉ từ 28/01 đến 05/02/2026. Chúc mọi người năm mới an khang thịnh vượng!",
    type: "info",
    isPinned: false,
    createdAt: "2026-01-25T10:00:00",
    author: "Admin",
  },
];

const typeConfig: Record<
  string,
  { icon: typeof AlertCircle; color: string; bgColor: string }
> = {
  warning: {
    icon: AlertCircle,
    color: "text-orange-700",
    bgColor: "bg-orange-100 border-orange-300",
  },
  info: {
    icon: Info,
    color: "text-blue-700",
    bgColor: "bg-blue-100 border-blue-300",
  },
  success: {
    icon: CheckCircle,
    color: "text-green-700",
    bgColor: "bg-green-100 border-green-300",
  },
};

export default function AnnouncementsPage() {
  const { t } = useTranslation();
  const pinnedAnnouncements = announcements.filter((a) => a.isPinned);
  const otherAnnouncements = announcements.filter((a) => !a.isPinned);

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button className="border-border bg-background flex items-center gap-2 border-2 px-4 py-2 text-sm font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
          <Bell className="h-4 w-4" />
          Đánh dấu đã đọc tất cả
        </button>
      </div>
        {/* Pinned Announcements */}
        {pinnedAnnouncements.length > 0 && (
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 font-bold">
              <Pin className="h-4 w-4" />
              Ghim
            </h2>
            <div className="space-y-4">
              {pinnedAnnouncements.map((announcement) => {
                const config = typeConfig[announcement.type];
                const Icon = config.icon;
                return (
                  <div
                    key={announcement.id}
                    className={`border-2 ${config.bgColor} p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`border-border flex h-10 w-10 shrink-0 items-center justify-center border-2 bg-white ${config.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold">{announcement.title}</h3>
                          <span className="border-border bg-primary border px-2 py-0.5 text-xs font-medium">
                            Ghim
                          </span>
                        </div>
                        <p className="mt-2 text-sm">{announcement.content}</p>
                        <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {new Date(
                              announcement.createdAt,
                            ).toLocaleDateString("vi-VN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          <span>Bởi {announcement.author}</span>
                        </div>
                      </div>
                      <ChevronRight className="text-muted-foreground hidden h-5 w-5 shrink-0 sm:block" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Other Announcements */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 font-bold">
            <Megaphone className="h-4 w-4" />
            Tất cả thông báo
          </h2>
          <div className="space-y-4">
            {otherAnnouncements.map((announcement) => {
              const config = typeConfig[announcement.type];
              const Icon = config.icon;
              return (
                <div
                  key={announcement.id}
                  className="border-border bg-background border-2 p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`border-border flex h-10 w-10 shrink-0 items-center justify-center border-2 ${config.bgColor.split(" ")[0]} ${config.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{announcement.title}</h3>
                      <p className="text-muted-foreground mt-2 text-sm">
                        {announcement.content}
                      </p>
                      <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(announcement.createdAt).toLocaleDateString(
                            "vi-VN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span>Bởi {announcement.author}</span>
                      </div>
                    </div>
                    <ChevronRight className="text-muted-foreground hidden h-5 w-5 shrink-0 sm:block" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="border-border bg-background border-2 px-6 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
            Xem thêm thông báo cũ
          </button>
        </div>
    </div>
  );
}
