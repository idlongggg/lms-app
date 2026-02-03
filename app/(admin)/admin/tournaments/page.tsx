'use client';

import { Trophy, Search, Plus, Calendar, Users, Clock, MoreVertical, Play, Pause, Eye } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { tournaments, type Tournament } from "@/lib/mock/tournaments";

export default function AdminTournamentsPage() {
  const { user } = useAuth();

  // Only tenant-admin can access this page
  if (!user || user.role !== 'tenant-admin') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  const stats = {
    total: tournaments.length,
    active: tournaments.filter(t => t.status === 'IN_PROGRESS').length,
    scheduled: tournaments.filter(t => t.status === 'REGISTRATION').length,
    completed: tournaments.filter(t => t.status === 'COMPLETED').length,
  };

  const getStatusDisplay = (status: Tournament['status']) => {
    switch (status) {
      case 'IN_PROGRESS': return { label: 'Đang diễn ra', class: 'bg-green-500 text-white' };
      case 'REGISTRATION': return { label: 'Đang đăng ký', class: 'bg-blue-500 text-white' };
      case 'COMPLETED': return { label: 'Đã kết thúc', class: 'bg-muted' };
      case 'DRAFT': return { label: 'Nháp', class: 'bg-yellow-100 text-yellow-700' };
      case 'CANCELLED': return { label: 'Đã hủy', class: 'bg-red-100 text-red-700' };
      default: return { label: status, class: 'bg-muted' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl">Quản lý Giải đấu</h1>
          <p className="text-muted-foreground">
            Quản lý tất cả các giải đấu trong tenant
          </p>
        </div>
        <button className="inline-flex items-center gap-2 border-2 border-border bg-primary px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
          <Plus className="h-4 w-4" />
          Tạo giải đấu
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng giải đấu</p>
              <p className="font-bold text-2xl">{stats.total}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-purple-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đang diễn ra</p>
              <p className="font-bold text-2xl">{stats.active}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-green-500">
              <Play className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đang đăng ký</p>
              <p className="font-bold text-2xl">{stats.scheduled}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-blue-500">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đã kết thúc</p>
              <p className="font-bold text-2xl">{stats.completed}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-gray-500">
              <Clock className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-1 items-center gap-2 border-2 border-border bg-input px-3 py-2 shadow-xs">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm giải đấu..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <select className="border-2 border-border bg-input px-4 py-2 shadow-xs">
          <option>Trạng thái</option>
          <option>Đang diễn ra</option>
          <option>Đang đăng ký</option>
          <option>Đã kết thúc</option>
        </select>
      </div>

      {/* Tournaments List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((tournament) => {
          const statusDisplay = getStatusDisplay(tournament.status);
          return (
            <div key={tournament.id} className="border-2 border-border bg-card shadow-sm">
              <div className="p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-primary">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <span className={`border border-border px-2 py-0.5 text-xs font-medium ${statusDisplay.class}`}>
                    {statusDisplay.label}
                  </span>
                </div>

                <h3 className="mb-1 font-bold text-lg">{tournament.name}</h3>
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                  {tournament.description || 'Không có mô tả'}
                </p>

                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(tournament.startsAt).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Tối đa {tournament.maxParticipants} người</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Phí: {tournament.entryFee === 0 ? 'Miễn phí' : `${tournament.entryFee} xu`}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 border-2 border-border bg-muted px-3 py-1.5 text-sm font-medium transition-all hover:bg-muted/80">
                    <Eye className="mr-1 inline h-4 w-4" />
                    Chi tiết
                  </button>
                  {tournament.status === 'IN_PROGRESS' ? (
                    <button className="border-2 border-border bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-orange-600">
                      <Pause className="mr-1 inline h-4 w-4" />
                      Tạm dừng
                    </button>
                  ) : tournament.status === 'REGISTRATION' ? (
                    <button className="border-2 border-border bg-green-500 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-green-600">
                      <Play className="mr-1 inline h-4 w-4" />
                      Bắt đầu
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
