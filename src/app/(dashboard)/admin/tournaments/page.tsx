"use client";

import {
  Calendar,
  Clock,
  Eye,
  Pause,
  Play,
  Plus,
  Search,
  Trophy,
  Users,
} from "lucide-react";

import { Badge, Button, Card, Input, Select } from "@/components/ui";
import { type Tournament, tournaments } from "@/data/tournaments";
import { useAuth } from "@/lib/auth";

export default function AdminTournamentsPage() {
  const { user } = useAuth();

  // Only tenant-admin can access this page
  if (!user || user.role.code !== "tenant-admin") {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">
          Bạn không có quyền truy cập trang này.
        </p>
      </div>
    );
  }

  const stats = {
    total: tournaments.length,
    active: tournaments.filter((t) => t.status === "IN_PROGRESS").length,
    scheduled: tournaments.filter((t) => t.status === "REGISTRATION").length,
    completed: tournaments.filter((t) => t.status === "COMPLETED").length,
  };

  const getStatusDisplay = (status: Tournament["status"]) => {
    switch (status) {
      case "IN_PROGRESS":
        return {
          label: "Đang diễn ra",
          className: "bg-green-500 text-white border-green-600",
        };
      case "REGISTRATION":
        return {
          label: "Đang đăng ký",
          className: "bg-blue-500 text-white border-blue-600",
        };
      case "COMPLETED":
        return {
          label: "Đã kết thúc",
          className: "bg-muted text-muted-foreground",
        };
      case "DRAFT":
        return {
          label: "Nháp",
          className: "bg-yellow-100 text-yellow-700 border-yellow-200",
        };
      case "CANCELLED":
        return {
          label: "Đã hủy",
          className: "bg-red-100 text-red-700 border-red-200",
        };
      default:
        return { label: status, className: "bg-muted" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Giải đấu</h1>
          <p className="text-muted-foreground">
            Quản lý tất cả các giải đấu trong tenant
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Tạo giải đấu
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Tổng giải đấu</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-purple-500">
                <Trophy className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card className="shadow-sm">
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Đang diễn ra</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-500">
                <Play className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card className="shadow-sm">
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Đang đăng ký</p>
                <p className="text-2xl font-bold">{stats.scheduled}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-500">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card className="shadow-sm">
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Đã kết thúc</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-gray-500">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative min-w-[200px] flex-1">
          <Input placeholder="Tìm kiếm giải đấu..." className="pl-9" />
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        </div>
        <Select defaultValue="all">
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="Trạng thái" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Tất cả trạng thái</Select.Item>
            <Select.Item value="active">Đang diễn ra</Select.Item>
            <Select.Item value="registration">Đang đăng ký</Select.Item>
            <Select.Item value="completed">Đã kết thúc</Select.Item>
          </Select.Content>
        </Select>
      </div>

      {/* Tournaments List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((tournament) => {
          const statusDisplay = getStatusDisplay(tournament.status);
          return (
            <Card
              key={tournament.id}
              className="shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <Card.Content className="p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="border-border bg-primary flex h-10 w-10 items-center justify-center border-2">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <Badge className={statusDisplay.className} variant="surface">
                    {statusDisplay.label}
                  </Badge>
                </div>

                <h3 className="mb-1 text-lg font-bold">{tournament.name}</h3>
                <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                  {tournament.description || "Không có mô tả"}
                </p>

                <div className="mb-4 space-y-2 text-sm">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(tournament.startsAt).toLocaleDateString(
                        "vi-VN",
                      )}
                    </span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Tối đa {tournament.maxParticipants} người</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      Phí:{" "}
                      {tournament.entryFee === 0
                        ? "Miễn phí"
                        : `${tournament.entryFee} xu`}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1" size="sm">
                    <Eye className="mr-1 h-4 w-4" />
                    Chi tiết
                  </Button>
                  {tournament.status === "IN_PROGRESS" ? (
                    <Button
                      className="border-orange-700 bg-orange-500 text-white hover:bg-orange-600"
                      size="sm"
                    >
                      <Pause className="mr-1 h-4 w-4" />
                      Tạm dừng
                    </Button>
                  ) : tournament.status === "REGISTRATION" ? (
                    <Button
                      className="border-green-700 bg-green-500 text-white hover:bg-green-600"
                      size="sm"
                    >
                      <Play className="mr-1 h-4 w-4" />
                      Bắt đầu
                    </Button>
                  ) : null}
                </div>
              </Card.Content>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
