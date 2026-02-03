'use client';

import { Trophy, Search, Calendar, Users, Clock, Eye, Edit, Trash2, Play, Pause, BarChart3, Plus } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { mockTeacherTournaments, getTournamentsByTeacher } from "@/lib/mock/classes";
import Link from "next/link";

export default function TeacherTournamentManagePage() {
  const { user } = useAuth();

  if (!user || user.role !== 'teacher') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  const tournaments = mockTeacherTournaments;
  
  const stats = {
    total: tournaments.length,
    active: tournaments.filter(t => t.status === 'ACTIVE').length,
    scheduled: tournaments.filter(t => t.status === 'SCHEDULED').length,
    completed: tournaments.filter(t => t.status === 'COMPLETED').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl">Giải đấu của tôi</h1>
          <p className="text-muted-foreground">
            Quản lý các giải đấu bạn đã tạo
          </p>
        </div>
        <Link
          href="/tournament/create"
          className="inline-flex items-center gap-2 border-2 border-border bg-primary px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
        >
          <Plus className="h-4 w-4" />
          Tạo giải đấu
        </Link>
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
              <p className="font-bold text-2xl text-green-500">{stats.active}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-green-500">
              <Play className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sắp diễn ra</p>
              <p className="font-bold text-2xl text-blue-500">{stats.scheduled}</p>
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
          <option>Tất cả loại</option>
          <option>Xếp hạng</option>
          <option>Luyện tập</option>
          <option>Riêng lớp</option>
        </select>
        <select className="border-2 border-border bg-input px-4 py-2 shadow-xs">
          <option>Trạng thái</option>
          <option>Đang diễn ra</option>
          <option>Sắp diễn ra</option>
          <option>Đã kết thúc</option>
        </select>
      </div>

      {/* Tournaments Table */}
      <div className="border-2 border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border bg-muted">
                <th className="px-4 py-3 text-left text-sm font-bold">Giải đấu</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Loại</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Thời gian</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Người tham gia</th>
                <th className="px-4 py-3 text-left text-sm font-bold">Trạng thái</th>
                <th className="px-4 py-3 text-right text-sm font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-border">
              {tournaments.map((tournament) => (
                <tr key={tournament.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-primary">
                        <Trophy className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{tournament.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {tournament.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`border border-border px-2 py-0.5 text-xs ${
                      tournament.type === 'RANKED' ? 'bg-purple-100 text-purple-700' :
                      tournament.type === 'PRACTICE' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {tournament.type === 'RANKED' ? 'Xếp hạng' :
                       tournament.type === 'PRACTICE' ? 'Luyện tập' : 'Riêng lớp'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <p>{new Date(tournament.startTime).toLocaleDateString('vi-VN')}</p>
                      <p className="text-xs text-muted-foreground">
                        {tournament.duration} phút • {tournament.questionCount} câu
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{tournament.currentParticipants}/{tournament.maxParticipants}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-sm ${
                      tournament.status === 'ACTIVE' ? 'text-green-500' :
                      tournament.status === 'SCHEDULED' ? 'text-blue-500' :
                      tournament.status === 'COMPLETED' ? 'text-gray-500' :
                      'text-red-500'
                    }`}>
                      <span className={`h-2 w-2 rounded-full ${
                        tournament.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' :
                        tournament.status === 'SCHEDULED' ? 'bg-blue-500' :
                        tournament.status === 'COMPLETED' ? 'bg-gray-500' :
                        'bg-red-500'
                      }`} />
                      {tournament.status === 'ACTIVE' ? 'Đang diễn ra' :
                       tournament.status === 'SCHEDULED' ? 'Sắp diễn ra' :
                       tournament.status === 'COMPLETED' ? 'Đã kết thúc' :
                       tournament.status === 'DRAFT' ? 'Nháp' : 'Đã hủy'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="border-2 border-border p-1.5 transition-all hover:bg-muted" title="Xem chi tiết">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="border-2 border-border p-1.5 transition-all hover:bg-muted" title="Thống kê">
                        <BarChart3 className="h-4 w-4" />
                      </button>
                      {tournament.status === 'SCHEDULED' && (
                        <>
                          <button className="border-2 border-border p-1.5 transition-all hover:bg-muted" title="Sửa">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="border-2 border-border p-1.5 transition-all hover:bg-green-100" title="Bắt đầu">
                            <Play className="h-4 w-4 text-green-500" />
                          </button>
                        </>
                      )}
                      {tournament.status === 'ACTIVE' && (
                        <button className="border-2 border-border p-1.5 transition-all hover:bg-orange-100" title="Tạm dừng">
                          <Pause className="h-4 w-4 text-orange-500" />
                        </button>
                      )}
                      {tournament.status === 'DRAFT' && (
                        <button className="border-2 border-border p-1.5 transition-all hover:bg-red-100" title="Xóa">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <h3 className="mb-4 font-bold">Giải đấu sắp diễn ra</h3>
          {tournaments.filter(t => t.status === 'SCHEDULED').length > 0 ? (
            <div className="space-y-3">
              {tournaments.filter(t => t.status === 'SCHEDULED').slice(0, 3).map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded bg-blue-50 p-3 dark:bg-blue-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border-2 border-blue-500 bg-blue-100">
                      <Trophy className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(t.startTime).toLocaleString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  <button className="border-2 border-border bg-blue-500 px-3 py-1 text-sm font-medium text-white transition-all hover:bg-blue-600">
                    Bắt đầu
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-4">Không có giải đấu sắp diễn ra</p>
          )}
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <h3 className="mb-4 font-bold">Đang diễn ra</h3>
          {tournaments.filter(t => t.status === 'ACTIVE').length > 0 ? (
            <div className="space-y-3">
              {tournaments.filter(t => t.status === 'ACTIVE').slice(0, 3).map((t) => (
                <div key={t.id} className="flex items-center justify-between rounded bg-green-50 p-3 dark:bg-green-950">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border-2 border-green-500 bg-green-100">
                      <Trophy className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.currentParticipants} người đang tham gia
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="border-2 border-border bg-white px-3 py-1 text-sm font-medium transition-all hover:bg-muted">
                      Xem
                    </button>
                    <button className="border-2 border-border bg-orange-500 px-3 py-1 text-sm font-medium text-white transition-all hover:bg-orange-600">
                      Dừng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-4">Không có giải đấu đang diễn ra</p>
          )}
        </div>
      </div>
    </div>
  );
}
