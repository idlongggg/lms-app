'use client';

import { useState } from 'react';
import {
  Trophy,
  Search,
  Calendar,
  Users,
  Clock,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  BarChart3,
  Plus,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { mockTeacherTournaments } from '@/lib/mock/classes';
import Link from 'next/link';
import { Table } from '@/components/retroui/Table';
import { Button } from '@/components/retroui/Button';
import { Badge } from '@/components/retroui/Badge';
import { Input } from '@/components/retroui/Input';
import { Select } from '@/components/retroui/Select';
import { Card } from '@/components/retroui/Card';

export default function TeacherTournamentManagePage() {
  const { user } = useAuth();
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    active: tournaments.filter((t) => t.status === 'ACTIVE').length,
    scheduled: tournaments.filter((t) => t.status === 'SCHEDULED').length,
    completed: tournaments.filter((t) => t.status === 'COMPLETED').length,
  };

  const filteredTournaments = tournaments.filter((t) => {
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Giải đấu của tôi</h1>
          <p className="text-muted-foreground">Quản lý các giải đấu bạn đã tạo</p>
        </div>
        <Button asChild>
          <Link href="/tournament/create">
            <Plus className="mr-2 h-4 w-4" />
            Tạo giải đấu
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
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
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Đang diễn ra</p>
                <p className="text-2xl font-bold text-green-500">{stats.active}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-500">
                <Play className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Sắp diễn ra</p>
                <p className="text-2xl font-bold text-blue-500">{stats.scheduled}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-500">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
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
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Tìm kiếm giải đấu..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <Select.Trigger className="w-[130px]">
            <Select.Value placeholder="Tất cả loại" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Tất cả loại</Select.Item>
            <Select.Item value="RANKED">Xếp hạng</Select.Item>
            <Select.Item value="PRACTICE">Luyện tập</Select.Item>
            <Select.Item value="CLASS">Riêng lớp</Select.Item>
          </Select.Content>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <Select.Trigger className="w-[150px]">
            <Select.Value placeholder="Trạng thái" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Tất cả</Select.Item>
            <Select.Item value="ACTIVE">Đang diễn ra</Select.Item>
            <Select.Item value="SCHEDULED">Sắp diễn ra</Select.Item>
            <Select.Item value="COMPLETED">Đã kết thúc</Select.Item>
          </Select.Content>
        </Select>
      </div>

      {/* Tournaments Table */}
      <div className="border-border bg-card border-2 shadow-sm">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Giải đấu</Table.Head>
              <Table.Head>Loại</Table.Head>
              <Table.Head>Thời gian</Table.Head>
              <Table.Head>Người tham gia</Table.Head>
              <Table.Head>Trạng thái</Table.Head>
              <Table.Head className="text-right">Actions</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredTournaments.map((tournament) => (
              <Table.Row key={tournament.id}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <div className="border-border bg-primary flex h-10 w-10 items-center justify-center border-2">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{tournament.name}</p>
                      <p className="text-muted-foreground line-clamp-1 text-xs">
                        {tournament.description}
                      </p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    size="sm"
                    className={
                      tournament.type === 'RANKED'
                        ? 'bg-purple-100 text-purple-700'
                        : tournament.type === 'PRACTICE'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                    }
                  >
                    {tournament.type === 'RANKED'
                      ? 'Xếp hạng'
                      : tournament.type === 'PRACTICE'
                        ? 'Luyện tập'
                        : 'Riêng lớp'}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <div className="text-sm">
                    <p>{new Date(tournament.startTime).toLocaleDateString('vi-VN')}</p>
                    <p className="text-muted-foreground text-xs">
                      {tournament.duration} phút • {tournament.questionCount} câu
                    </p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Users className="text-muted-foreground h-4 w-4" />
                    <span>
                      {tournament.currentParticipants}/{tournament.maxParticipants}
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span
                    className={`inline-flex items-center gap-1 text-sm ${
                      tournament.status === 'ACTIVE'
                        ? 'text-green-500'
                        : tournament.status === 'SCHEDULED'
                          ? 'text-blue-500'
                          : tournament.status === 'COMPLETED'
                            ? 'text-gray-500'
                            : 'text-red-500'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        tournament.status === 'ACTIVE'
                          ? 'animate-pulse bg-green-500'
                          : tournament.status === 'SCHEDULED'
                            ? 'bg-blue-500'
                            : tournament.status === 'COMPLETED'
                              ? 'bg-gray-500'
                              : 'bg-red-500'
                      }`}
                    />
                    {tournament.status === 'ACTIVE'
                      ? 'Đang diễn ra'
                      : tournament.status === 'SCHEDULED'
                        ? 'Sắp diễn ra'
                        : tournament.status === 'COMPLETED'
                          ? 'Đã kết thúc'
                          : tournament.status === 'DRAFT'
                            ? 'Nháp'
                            : 'Đã hủy'}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="outline" size="icon" title="Xem chi tiết">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" title="Thống kê">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    {tournament.status === 'SCHEDULED' && (
                      <>
                        <Button variant="outline" size="icon" title="Sửa">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="hover:bg-green-100"
                          title="Bắt đầu"
                        >
                          <Play className="h-4 w-4 text-green-500" />
                        </Button>
                      </>
                    )}
                    {tournament.status === 'ACTIVE' && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-orange-100"
                        title="Tạm dừng"
                      >
                        <Pause className="h-4 w-4 text-orange-500" />
                      </Button>
                    )}
                    {tournament.status === 'DRAFT' && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-red-100"
                        title="Xóa"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <Card.Content className="p-4">
            <h3 className="mb-4 font-bold">Giải đấu sắp diễn ra</h3>
            {tournaments.filter((t) => t.status === 'SCHEDULED').length > 0 ? (
              <div className="space-y-3">
                {tournaments
                  .filter((t) => t.status === 'SCHEDULED')
                  .slice(0, 3)
                  .map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded bg-blue-50 p-3 dark:bg-blue-950"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center border-2 border-blue-500 bg-blue-100">
                          <Trophy className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">{t.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {new Date(t.startTime).toLocaleString('vi-VN')}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                        Bắt đầu
                      </Button>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4 text-center text-sm">
                Không có giải đấu sắp diễn ra
              </p>
            )}
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <h3 className="mb-4 font-bold">Đang diễn ra</h3>
            {tournaments.filter((t) => t.status === 'ACTIVE').length > 0 ? (
              <div className="space-y-3">
                {tournaments
                  .filter((t) => t.status === 'ACTIVE')
                  .slice(0, 3)
                  .map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded bg-green-50 p-3 dark:bg-green-950"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center border-2 border-green-500 bg-green-100">
                          <Trophy className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">{t.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {t.currentParticipants} người đang tham gia
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Xem
                        </Button>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          Dừng
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-4 text-center text-sm">
                Không có giải đấu đang diễn ra
              </p>
            )}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
