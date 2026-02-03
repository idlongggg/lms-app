'use client';

import {
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  Play,
  Search,
  Star,
  Swords,
  Trophy,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '@/lib/auth';
import { mockJoinableTournaments } from '@/lib/mock/classes';

export default function StudentTournamentJoinPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'available' | 'joined'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user || user.role !== 'student') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  const tournaments = mockJoinableTournaments;

  const filteredTournaments = tournaments.filter((t) => {
    if (filter === 'available' && t.isJoined) return false;
    if (filter === 'joined' && !t.isJoined) return false;
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const stats = {
    available: tournaments.filter((t) => !t.isJoined).length,
    joined: tournaments.filter((t) => t.isJoined).length,
    active: tournaments.filter((t) => t.status === 'ACTIVE').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Tham gia giải đấu</h1>
        <p className="text-muted-foreground">Khám phá và tham gia các giải đấu đang mở</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Có thể tham gia</p>
              <p className="text-2xl font-bold text-blue-500">{stats.available}</p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Đã đăng ký</p>
              <p className="text-2xl font-bold text-green-500">{stats.joined}</p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-500">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Đang diễn ra</p>
              <p className="text-2xl font-bold text-orange-500">{stats.active}</p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-orange-500">
              <Play className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="border-border bg-input flex flex-1 items-center gap-2 border-2 px-3 py-2 shadow-xs">
          <Search className="text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm giải đấu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`border-border border-2 px-4 py-2 font-medium transition-all ${
              filter === 'all' ? 'bg-primary' : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`border-border border-2 px-4 py-2 font-medium transition-all ${
              filter === 'available' ? 'bg-primary' : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Có thể tham gia
          </button>
          <button
            onClick={() => setFilter('joined')}
            className={`border-border border-2 px-4 py-2 font-medium transition-all ${
              filter === 'joined' ? 'bg-primary' : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Đã đăng ký
          </button>
        </div>
      </div>

      {/* Tournament Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTournaments.map((tournament) => (
          <div
            key={tournament.id}
            className={`bg-card border-2 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md ${
              tournament.isJoined ? 'border-green-500' : 'border-border'
            }`}
          >
            <div className="p-4">
              {/* Header */}
              <div className="mb-3 flex items-start justify-between">
                <div
                  className={`border-border flex h-12 w-12 items-center justify-center border-2 ${
                    tournament.type === 'RANKED'
                      ? 'bg-purple-500'
                      : tournament.type === 'PRACTICE'
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                  }`}
                >
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`border-border border px-2 py-0.5 text-xs ${
                      tournament.type === 'RANKED'
                        ? 'bg-purple-100 text-purple-700'
                        : tournament.type === 'PRACTICE'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {tournament.type === 'RANKED'
                      ? 'Xếp hạng'
                      : tournament.type === 'PRACTICE'
                        ? 'Luyện tập'
                        : 'Riêng lớp'}
                  </span>
                  {tournament.isJoined && (
                    <span className="flex items-center gap-1 text-xs text-green-500">
                      <CheckCircle className="h-3 w-3" />
                      Đã đăng ký
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <h3 className="mb-1 text-lg font-bold">{tournament.name}</h3>
              <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                {tournament.description}
              </p>

              {/* Info */}
              <div className="mb-4 space-y-2 text-sm">
                <div className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {tournament.status === 'ACTIVE'
                      ? 'Đang diễn ra'
                      : new Date(tournament.startTime).toLocaleString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                  </span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {tournament.duration} phút • {tournament.questionCount} câu
                  </span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    {tournament.currentParticipants}/{tournament.maxParticipants} người tham gia
                  </span>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Tạo bởi: {tournament.createdByName}</span>
                </div>
              </div>

              {/* Progress bar for participants */}
              <div className="mb-4">
                <div className="bg-muted border-border h-2 border">
                  <div
                    className={`h-full ${
                      tournament.currentParticipants / tournament.maxParticipants > 0.8
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                    style={{
                      width: `${Math.min(100, (tournament.currentParticipants / tournament.maxParticipants) * 100)}%`,
                    }}
                  />
                </div>
                <p className="text-muted-foreground mt-1 text-right text-xs">
                  Còn {tournament.maxParticipants - tournament.currentParticipants} chỗ
                </p>
              </div>

              {/* Actions */}
              {tournament.isJoined ? (
                <div className="flex gap-2">
                  {tournament.status === 'ACTIVE' ? (
                    <button className="border-border flex-1 border-2 bg-green-500 px-4 py-2 font-medium text-white shadow-sm transition-all hover:bg-green-600">
                      <Swords className="mr-2 inline h-4 w-4" />
                      Vào thi đấu
                    </button>
                  ) : (
                    <button className="border-border bg-muted hover:bg-muted/80 flex-1 border-2 px-4 py-2 font-medium transition-all">
                      Xem chi tiết
                    </button>
                  )}
                  <button className="border-border border-2 bg-red-100 px-4 py-2 font-medium text-red-600 transition-all hover:bg-red-200">
                    Hủy
                  </button>
                </div>
              ) : (
                <button
                  className="border-border bg-primary w-full border-2 px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
                  disabled={tournament.currentParticipants >= tournament.maxParticipants}
                >
                  {tournament.currentParticipants >= tournament.maxParticipants ? (
                    'Đã đầy'
                  ) : (
                    <>
                      <Trophy className="mr-2 inline h-4 w-4" />
                      Đăng ký tham gia
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTournaments.length === 0 && (
        <div className="border-border bg-muted/50 border-2 border-dashed p-12 text-center">
          <Trophy className="text-muted-foreground mx-auto h-12 w-12" />
          <h3 className="mt-4 text-lg font-bold">Không tìm thấy giải đấu</h3>
          <p className="text-muted-foreground mt-2">
            {filter === 'joined'
              ? 'Bạn chưa đăng ký giải đấu nào'
              : 'Không có giải đấu nào phù hợp với bộ lọc'}
          </p>
        </div>
      )}

      {/* Tips Section */}
      <div className="border-border border-2 bg-blue-50 p-4 shadow-sm dark:bg-blue-950">
        <h3 className="mb-3 font-bold">💡 Mẹo thi đấu</h3>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li>
            • <strong>Giải xếp hạng:</strong> Điểm được tính vào bảng tổng, cố gắng hết sức!
          </li>
          <li>
            • <strong>Giải luyện tập:</strong> Không tính điểm, thoải mái luyện tập nhiều lần
          </li>
          <li>• Đăng ký sớm để không bỏ lỡ giải đấu yêu thích</li>
          <li>• Kiểm tra kỹ thời gian bắt đầu để chuẩn bị tốt nhất</li>
        </ul>
      </div>
    </div>
  );
}
