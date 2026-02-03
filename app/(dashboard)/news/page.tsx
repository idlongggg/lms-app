import { Calendar, Bell, ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "Giải đấu mùa xuân 2026 sắp bắt đầu!",
    excerpt:
      "Chuẩn bị cho giải đấu lớn nhất năm với tổng giải thưởng lên đến 100 triệu đồng.",
    date: "2026-02-03",
    category: "Sự kiện",
    image: "🏆",
  },
  {
    id: 2,
    title: "Cập nhật tính năng mới: Chế độ học nhóm",
    excerpt:
      "Học cùng bạn bè với tính năng phòng học nhóm hoàn toàn mới, hỗ trợ lên đến 10 người.",
    date: "2026-02-01",
    category: "Tính năng",
    image: "👥",
  },
  {
    id: 3,
    title: "Khóa học AI cơ bản đã có mặt",
    excerpt:
      "Khám phá thế giới trí tuệ nhân tạo với khóa học hoàn toàn miễn phí dành cho người mới bắt đầu.",
    date: "2026-01-28",
    category: "Khóa học",
    image: "🤖",
  },
  {
    id: 4,
    title: "Chương trình giới thiệu bạn bè - Nhận 100 xu",
    excerpt:
      "Mời bạn bè tham gia LMS và nhận ngay 100 xu cho mỗi người đăng ký thành công.",
    date: "2026-01-25",
    category: "Khuyến mãi",
    image: "🎁",
  },
];

const announcements = [
  {
    id: 1,
    title: "Bảo trì hệ thống ngày 05/02",
    time: "2 giờ trước",
    type: "warning",
  },
  {
    id: 2,
    title: "Bạn đã nhận được 50 xu từ thách đấu",
    time: "5 giờ trước",
    type: "success",
  },
  {
    id: 3,
    title: "Khóa học JavaScript đã được cập nhật",
    time: "1 ngày trước",
    type: "info",
  },
];

export default function NewsPage() {
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
              <article
                key={item.id}
                className="flex gap-4 border-2 border-border bg-background p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center border-2 border-border bg-muted text-3xl">
                  {item.image}
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="border border-border bg-primary px-2 py-0.5 text-xs font-medium">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.date).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
                <button className="self-center">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </article>
            ))}
          </div>
          <button className="w-full border-2 border-border bg-background py-3 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
            Xem thêm tin tức
          </button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Announcements */}
          <div className="border-2 border-border bg-background shadow-sm">
            <div className="flex items-center gap-2 border-b-2 border-border bg-muted px-4 py-3">
              <Bell className="h-4 w-4" />
              <h2 className="font-bold">Thông báo</h2>
            </div>
            <div className="divide-y-2 divide-border">
              {announcements.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        item.type === "warning"
                          ? "bg-yellow-500"
                          : item.type === "success"
                            ? "bg-green-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-border p-3">
              <button className="w-full text-center text-sm font-medium text-muted-foreground hover:text-foreground">
                Xem tất cả thông báo
              </button>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="border-2 border-border bg-background shadow-sm">
            <div className="flex items-center gap-2 border-b-2 border-border bg-muted px-4 py-3">
              <Calendar className="h-4 w-4" />
              <h2 className="font-bold">Sự kiện sắp tới</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center border-2 border-border bg-primary">
                  <span className="text-lg font-bold leading-none">10</span>
                  <span className="text-xs">Th2</span>
                </div>
                <div>
                  <p className="font-medium">Giải đấu mùa xuân</p>
                  <p className="text-sm text-muted-foreground">Vòng loại</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center border-2 border-border bg-secondary text-white">
                  <span className="text-lg font-bold leading-none">14</span>
                  <span className="text-xs">Th2</span>
                </div>
                <div>
                  <p className="font-medium">Workshop: React 19</p>
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
