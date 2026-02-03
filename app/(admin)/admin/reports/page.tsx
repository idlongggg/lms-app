'use client';

import { BarChart3, Download, Calendar, TrendingUp, Users, BookOpen, Trophy, Filter } from "lucide-react";
import { useAuth } from "@/lib/auth";

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
  { name: 'Báo cáo hoạt động tuần 3/2024', type: 'user-activity', date: '2024-01-20', size: '2.4 MB', status: 'ready' },
  { name: 'Tiến độ học tập tháng 1', type: 'learning-progress', date: '2024-01-19', size: '5.1 MB', status: 'ready' },
  { name: 'Thống kê giải đấu Q1', type: 'tournament-stats', date: '2024-01-18', size: '3.2 MB', status: 'generating' },
  { name: 'Phân tích nội dung', type: 'content-usage', date: '2024-01-17', size: '1.8 MB', status: 'ready' },
];

export default function AdminReportsPage() {
  const { user } = useAuth();

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
          <h1 className="font-bold text-3xl">Báo cáo & Thống kê</h1>
          <p className="text-muted-foreground">
            {isRootAdmin ? 'Báo cáo toàn hệ thống' : 'Báo cáo và phân tích dữ liệu'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 border-2 border-border bg-muted px-4 py-2 font-medium shadow-sm transition-all hover:bg-muted/80">
            <Calendar className="h-4 w-4" />
            Lên lịch
          </button>
          <button className="inline-flex items-center gap-2 border-2 border-border bg-primary px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
            <BarChart3 className="h-4 w-4" />
            Tạo báo cáo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng báo cáo</p>
              <p className="font-bold text-2xl">{summaryStats.totalReports}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-purple-500">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tuần này</p>
              <p className="font-bold text-2xl">{summaryStats.generatedThisWeek}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-green-500">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đã lên lịch</p>
              <p className="font-bold text-2xl">{summaryStats.scheduledReports}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-blue-500">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Data points</p>
              <p className="font-bold text-2xl">{summaryStats.dataPoints}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-orange-500">
              <Filter className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div>
        <h2 className="mb-4 font-bold text-xl">Loại báo cáo</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reportTypes.map((report) => (
            <div key={report.id} className="border-2 border-border bg-card p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
              <div className="mb-3 flex h-10 w-10 items-center justify-center border-2 border-border bg-primary">
                <report.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1 font-bold">{report.name}</h3>
              <p className="mb-2 text-sm text-muted-foreground">{report.description}</p>
              <p className="text-xs text-muted-foreground">
                Cập nhật: {new Date(report.lastGenerated).toLocaleDateString('vi-VN')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h2 className="mb-4 font-bold text-xl">Báo cáo gần đây</h2>
        <div className="border-2 border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border bg-muted">
                  <th className="px-4 py-3 text-left text-sm font-bold">Tên báo cáo</th>
                  <th className="px-4 py-3 text-left text-sm font-bold">Loại</th>
                  <th className="px-4 py-3 text-left text-sm font-bold">Ngày tạo</th>
                  <th className="px-4 py-3 text-left text-sm font-bold">Kích thước</th>
                  <th className="px-4 py-3 text-left text-sm font-bold">Trạng thái</th>
                  <th className="px-4 py-3 text-right text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-border">
                {recentReports.map((report, index) => (
                  <tr key={index} className="transition-colors hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{report.name}</td>
                    <td className="px-4 py-3 text-muted-foreground capitalize">
                      {report.type.replace('-', ' ')}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(report.date).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{report.size}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-sm ${
                        report.status === 'ready' ? 'text-green-500' : 'text-orange-500'
                      }`}>
                        <span className={`h-2 w-2 rounded-full ${
                          report.status === 'ready' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'
                        }`} />
                        {report.status === 'ready' ? 'Sẵn sàng' : 'Đang tạo'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        className="inline-flex items-center gap-1 border-2 border-border px-2 py-1 text-sm transition-all hover:bg-muted disabled:opacity-50"
                        disabled={report.status !== 'ready'}
                      >
                        <Download className="h-4 w-4" />
                        Tải xuống
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
