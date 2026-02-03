'use client';

import {
  BarChart3,
  BookOpen,
  Calendar,
  Download,
  Filter,
  Plus,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/retroui/Badge';
import { Button } from '@/components/retroui/Button';
import { Card } from '@/components/retroui/Card';
import { Dialog } from '@/components/retroui/Dialog';
import { Input } from '@/components/retroui/Input';
import { Loader } from '@/components/retroui/Loader';
import { Select } from '@/components/retroui/Select';
import { Table } from '@/components/retroui/Table';
import { useAuth } from '@/lib/auth';

// Mock report data
const reportTypes = [
  {
    id: 'user-activity',
    name: 'Hoạt động người dùng',
    description: 'Thống kê đăng nhập, thời gian sử dụng theo ngày/tuần/tháng',
    icon: Users,
    lastGenerated: '2024-01-20T10:30:00Z',
  },
  {
    id: 'learning-progress',
    name: 'Tiến độ học tập',
    description: 'Báo cáo hoàn thành bài học, điểm số trung bình',
    icon: BookOpen,
    lastGenerated: '2024-01-20T08:00:00Z',
  },
  {
    id: 'tournament-stats',
    name: 'Thống kê giải đấu',
    description: 'Số lượng tham gia, điểm số, xếp hạng',
    icon: Trophy,
    lastGenerated: '2024-01-19T15:00:00Z',
  },
  {
    id: 'content-usage',
    name: 'Sử dụng nội dung',
    description: 'Bài học được xem nhiều nhất, câu hỏi khó nhất',
    icon: BarChart3,
    lastGenerated: '2024-01-18T12:00:00Z',
  },
];

const summaryStats = {
  totalReports: 24,
  generatedThisWeek: 8,
  scheduledReports: 4,
  dataPoints: '1.2M',
};

const recentReports = [
  {
    name: 'Báo cáo hoạt động tuần 3/2024',
    type: 'user-activity',
    date: '2024-01-20',
    size: '2.4 MB',
    status: 'ready',
  },
  {
    name: 'Tiến độ học tập tháng 1',
    type: 'learning-progress',
    date: '2024-01-19',
    size: '5.1 MB',
    status: 'ready',
  },
  {
    name: 'Thống kê giải đấu Q1',
    type: 'tournament-stats',
    date: '2024-01-18',
    size: '3.2 MB',
    status: 'generating',
  },
  {
    name: 'Phân tích nội dung',
    type: 'content-usage',
    date: '2024-01-17',
    size: '1.8 MB',
    status: 'ready',
  },
];

export default function AdminReportsPage() {
  const { user } = useAuth();
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);
  const [reportType, setReportType] = useState<string>('user-activity');

  if (!user || (user.role !== 'root-admin' && user.role !== 'tenant-admin')) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  const isRootAdmin = user.role === 'root-admin';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Báo cáo & Thống kê</h1>
          <p className="text-muted-foreground">
            {isRootAdmin ? 'Báo cáo toàn hệ thống' : 'Báo cáo và phân tích dữ liệu'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Lên lịch
          </Button>
          <Dialog open={isCreateReportOpen} onOpenChange={setIsCreateReportOpen}>
            <Dialog.Trigger asChild>
              <Button>
                <BarChart3 className="mr-2 h-4 w-4" />
                Tạo báo cáo
              </Button>
            </Dialog.Trigger>
            <Dialog.Content size="md">
              <Dialog.Header>Tạo báo cáo mới</Dialog.Header>
              <div className="space-y-4 p-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Loại báo cáo</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Chọn loại báo cáo" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="user-activity">Hoạt động người dùng</Select.Item>
                      <Select.Item value="learning-progress">Tiến độ học tập</Select.Item>
                      <Select.Item value="tournament-stats">Thống kê giải đấu</Select.Item>
                      <Select.Item value="content-usage">Sử dụng nội dung</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Khoảng thời gian</label>
                  <Select defaultValue="week">
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Chọn khoảng thời gian" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="day">Hôm nay</Select.Item>
                      <Select.Item value="week">Tuần này</Select.Item>
                      <Select.Item value="month">Tháng này</Select.Item>
                      <Select.Item value="quarter">Quý này</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Tên báo cáo</label>
                  <Input placeholder="VD: Báo cáo hoạt động tuần 4" />
                </div>
              </div>
              <Dialog.Footer>
                <Button variant="outline" onClick={() => setIsCreateReportOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setIsCreateReportOpen(false)}>Tạo</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Tổng báo cáo</p>
                <p className="text-2xl font-bold">{summaryStats.totalReports}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-purple-500">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Tuần này</p>
                <p className="text-2xl font-bold">{summaryStats.generatedThisWeek}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-500">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Đã lên lịch</p>
                <p className="text-2xl font-bold">{summaryStats.scheduledReports}</p>
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
                <p className="text-muted-foreground text-sm">Data points</p>
                <p className="text-2xl font-bold">{summaryStats.dataPoints}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-orange-500">
                <Filter className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Report Types */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Loại báo cáo</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reportTypes.map((report) => (
            <Card
              key={report.id}
              className="cursor-pointer transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Card.Content className="p-4">
                <div className="border-border bg-primary mb-3 flex h-10 w-10 items-center justify-center border-2">
                  <report.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-bold">{report.name}</h3>
                <p className="text-muted-foreground mb-2 text-sm">{report.description}</p>
                <p className="text-muted-foreground text-xs">
                  Cập nhật: {new Date(report.lastGenerated).toLocaleDateString('vi-VN')}
                </p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Báo cáo gần đây</h2>
        <div className="border-border bg-card border-2 shadow-sm">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Tên báo cáo</Table.Head>
                <Table.Head>Loại</Table.Head>
                <Table.Head>Ngày tạo</Table.Head>
                <Table.Head>Kích thước</Table.Head>
                <Table.Head>Trạng thái</Table.Head>
                <Table.Head className="text-right">Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {recentReports.map((report, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="font-medium">{report.name}</Table.Cell>
                  <Table.Cell className="text-muted-foreground capitalize">
                    {report.type.replace('-', ' ')}
                  </Table.Cell>
                  <Table.Cell className="text-muted-foreground">
                    {new Date(report.date).toLocaleDateString('vi-VN')}
                  </Table.Cell>
                  <Table.Cell className="text-muted-foreground">{report.size}</Table.Cell>
                  <Table.Cell>
                    {report.status === 'generating' ? (
                      <span className="inline-flex items-center gap-2 text-sm text-orange-500">
                        <Loader className="h-4 w-4" />
                        Đang tạo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-sm text-green-500">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Sẵn sàng
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <Button variant="outline" size="sm" disabled={report.status !== 'ready'}>
                      <Download className="mr-1 h-4 w-4" />
                      Tải xuống
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
