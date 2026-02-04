"use client";

import { Calendar, CheckCircle, Clock, Eye, Gift, Package } from "lucide-react";

import { useTranslation } from "@/lib/providers";



const redeemedItems = [
  {
    id: 1,
    name: "Khóa học React Pro",
    description: "Trọn bộ khóa học React từ cơ bản đến nâng cao",
    cost: 500,
    redeemedAt: "2026-02-02T10:15:00",
    status: "active",
    image: "📚",
    expiresAt: null,
  },
  {
    id: 2,
    name: "Avatar Premium - Cyberpunk",
    description: "Avatar độc quyền phong cách Cyberpunk",
    cost: 150,
    redeemedAt: "2026-01-30T16:20:00",
    status: "applied",
    image: "🤖",
    expiresAt: null,
  },
  {
    id: 3,
    name: "Thẻ Double XP 7 ngày",
    description: "Nhận gấp đôi XP trong 7 ngày",
    cost: 200,
    redeemedAt: "2026-01-25T09:00:00",
    status: "expired",
    image: "⚡",
    expiresAt: "2026-02-01T09:00:00",
  },
  {
    id: 4,
    name: "Badge VIP",
    description: "Huy hiệu VIP hiển thị bên cạnh tên",
    cost: 300,
    redeemedAt: "2026-01-20T14:30:00",
    status: "active",
    image: "⭐",
    expiresAt: "2026-04-20T14:30:00",
  },
  {
    id: 5,
    name: "Khung hình đại diện",
    description: "Khung hình neon độc đáo",
    cost: 100,
    redeemedAt: "2026-01-15T11:45:00",
    status: "applied",
    image: "🖼️",
    expiresAt: null,
  },
];

const statusConfig: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  active: {
    label: "Đang hoạt động",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
  applied: {
    label: "Đang áp dụng",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  expired: {
    label: "Hết hạn",
    color: "text-gray-500",
    bgColor: "bg-gray-100",
  },
  pending: {
    label: "Đang xử lý",
    color: "text-orange-700",
    bgColor: "bg-orange-100",
  },
};

export default function RedeemedPage() {
  const { t } = useTranslation();
  const totalSpent = redeemedItems.reduce((sum, item) => sum + item.cost, 0);
  const activeItems = redeemedItems.filter(
    (item) => item.status === "active" || item.status === "applied",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button className="border-border bg-primary border-2 px-4 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
          <Gift className="mr-2 inline h-4 w-4" />
          Đổi thêm quà
        </button>
      </div>
      <div className="space-y-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border-border bg-background border-2 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="border-border bg-primary flex h-10 w-10 items-center justify-center border-2">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Tổng đã đổi</p>
                <p className="text-xl font-bold">
                  {redeemedItems.length} vật phẩm
                </p>
              </div>
            </div>
          </div>
          <div className="border-border bg-background border-2 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="border-border bg-secondary flex h-10 w-10 items-center justify-center border-2 text-white">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Đang hoạt động</p>
                <p className="text-xl font-bold">{activeItems} vật phẩm</p>
              </div>
            </div>
          </div>
          <div className="border-border bg-background border-2 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="border-border bg-accent flex h-10 w-10 items-center justify-center border-2 text-white">
                💰
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Tổng xu đã dùng</p>
                <p className="text-xl font-bold">
                  {totalSpent.toLocaleString()} xu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium">Lọc theo trạng thái:</span>
          <div className="flex gap-2">
            <button className="border-border bg-muted border-2 px-3 py-1.5 text-sm font-medium">
              Tất cả
            </button>
            <button className="border-border bg-background border px-3 py-1.5 text-sm">
              Đang hoạt động
            </button>
            <button className="border-border bg-background border px-3 py-1.5 text-sm">
              Đang áp dụng
            </button>
            <button className="border-border bg-background border px-3 py-1.5 text-sm">
              Hết hạn
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {redeemedItems.map((item) => {
            const status = statusConfig[item.status];
            return (
              <div
                key={item.id}
                className={`border-border bg-background border-2 shadow-sm transition-all ${
                  item.status === "expired"
                    ? "opacity-60"
                    : "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  {/* Icon */}
                  <div className="border-border bg-muted flex h-16 w-16 shrink-0 items-center justify-center border-2 text-3xl">
                    {item.image}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <span
                        className={`border-border border px-2 py-0.5 text-xs font-medium ${status.bgColor} ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {item.description}
                    </p>
                    <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Đổi ngày:{" "}
                        {new Date(item.redeemedAt).toLocaleDateString("vi-VN")}
                      </span>
                      <span className="flex items-center gap-1">
                        💰 {item.cost} xu
                      </span>
                      {item.expiresAt && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {item.status === "expired"
                            ? "Hết hạn"
                            : "Hết hạn"}:{" "}
                          {new Date(item.expiresAt).toLocaleDateString("vi-VN")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 gap-2">
                    {item.status === "active" && (
                      <button className="border-border bg-primary border-2 px-4 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
                        Sử dụng
                      </button>
                    )}
                    <button className="border-border bg-background hover:bg-muted border px-4 py-2 text-sm transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State (hidden, for reference) */}
        {redeemedItems.length === 0 && (
          <div className="border-border border-2 border-dashed p-12 text-center">
            <Gift className="text-muted-foreground mx-auto h-12 w-12" />
            <h3 className="mt-4 font-bold">Chưa có vật phẩm nào</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Hãy đổi xu để nhận những phần quà hấp dẫn!
            </p>
            <button className="border-border bg-primary mt-4 border-2 px-6 py-2 font-medium shadow-xs">
              Đổi quà ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
