'use client';

import { AlertTriangle, Bell, Settings, Plus, Check, X, Clock, Filter, Search } from "lucide-react";
import { useAuth } from "@/lib/auth";

// Mock alerts data
const alerts = [
  {
    id: 1,
    title: 'CPU usage cao',
    message: 'Server API-01 CPU vượt ngưỡng 80% trong 5 phút',
    severity: 'critical',
    status: 'active',
    source: 'System Monitor',
    createdAt: '2024-01-20T10:25:00Z',
    acknowledgedAt: null,
  },
  {
    id: 2,
    title: 'File Storage latency',
    message: 'Độ trễ truy cập file storage tăng lên 45ms',
    severity: 'warning',
    status: 'acknowledged',
    source: 'Health Check',
    createdAt: '2024-01-20T09:15:00Z',
    acknowledgedAt: '2024-01-20T09:20:00Z',
  },
  {
    id: 3,
    title: 'Login failures spike',
    message: '50+ đăng nhập thất bại từ IP 192.168.1.100',
    severity: 'warning',
    status: 'active',
    source: 'Security',
    createdAt: '2024-01-20T08:45:00Z',
    acknowledgedAt: null,
  },
  {
    id: 4,
    title: 'Database backup completed',
    message: 'Backup hàng ngày hoàn thành thành công',
    severity: 'info',
    status: 'resolved',
    source: 'Backup Service',
    createdAt: '2024-01-20T02:00:00Z',
    acknowledgedAt: '2024-01-20T02:01:00Z',
  },
  {
    id: 5,
    title: 'Memory usage warning',
    message: 'Server DB-01 memory đạt 75%',
    severity: 'warning',
    status: 'resolved',
    source: 'System Monitor',
    createdAt: '2024-01-19T16:30:00Z',
    acknowledgedAt: '2024-01-19T16:35:00Z',
  },
];

const alertRules = [
  { name: 'CPU > 80%', enabled: true, severity: 'critical', channel: 'Email, Slack' },
  { name: 'Memory > 85%', enabled: true, severity: 'critical', channel: 'Email, Slack' },
  { name: 'Disk > 90%', enabled: true, severity: 'warning', channel: 'Email' },
  { name: 'API latency > 500ms', enabled: true, severity: 'warning', channel: 'Slack' },
  { name: 'Error rate > 1%', enabled: false, severity: 'critical', channel: 'Email, Slack, SMS' },
];

export default function AdminAlertsPage() {
  const { user } = useAuth();

  // Only root-admin can access this page
  if (!user || user.role !== 'root-admin') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  const activeAlerts = alerts.filter(a => a.status === 'active').length;
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' && a.status !== 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl">Cảnh báo hệ thống</h1>
          <p className="text-muted-foreground">
            Quản lý và cấu hình cảnh báo
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 border-2 border-border bg-muted px-4 py-2 font-medium shadow-sm transition-all hover:bg-muted/80">
            <Settings className="h-4 w-4" />
            Cài đặt
          </button>
          <button className="inline-flex items-center gap-2 border-2 border-border bg-primary px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
            <Plus className="h-4 w-4" />
            Thêm quy tắc
          </button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cảnh báo đang hoạt động</p>
              <p className="font-bold text-2xl">{activeAlerts}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-orange-500">
              <Bell className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Nghiêm trọng</p>
              <p className="font-bold text-2xl text-red-500">{criticalAlerts}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-red-500">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Quy tắc đang bật</p>
              <p className="font-bold text-2xl">{alertRules.filter(r => r.enabled).length}/{alertRules.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-blue-500">
              <Settings className="h-5 w-5 text-white" />
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
            placeholder="Tìm kiếm cảnh báo..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
        <select className="border-2 border-border bg-input px-4 py-2 shadow-xs">
          <option>Tất cả mức độ</option>
          <option>Critical</option>
          <option>Warning</option>
          <option>Info</option>
        </select>
        <select className="border-2 border-border bg-input px-4 py-2 shadow-xs">
          <option>Trạng thái</option>
          <option>Active</option>
          <option>Acknowledged</option>
          <option>Resolved</option>
        </select>
      </div>

      {/* Alerts List */}
      <div>
        <h2 className="mb-4 font-bold text-xl">Cảnh báo gần đây</h2>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`border-2 bg-card p-4 shadow-sm ${
              alert.severity === 'critical' && alert.status === 'active' ? 'border-red-500' :
              alert.severity === 'warning' && alert.status === 'active' ? 'border-orange-500' :
              'border-border'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-8 w-8 items-center justify-center border-2 border-border ${
                  alert.severity === 'critical' ? 'bg-red-500' :
                  alert.severity === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`}>
                  {alert.severity === 'info' ? (
                    <Bell className="h-4 w-4 text-white" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{alert.title}</h3>
                    <span className={`border border-border px-2 py-0.5 text-xs ${
                      alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      alert.severity === 'warning' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className={`border border-border px-2 py-0.5 text-xs ${
                      alert.status === 'active' ? 'bg-red-100 text-red-700' :
                      alert.status === 'acknowledged' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {alert.status === 'active' ? 'Đang hoạt động' :
                       alert.status === 'acknowledged' ? 'Đã xác nhận' : 'Đã giải quyết'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Nguồn: {alert.source}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(alert.createdAt).toLocaleString('vi-VN')}
                    </span>
                  </div>
                </div>
                {alert.status === 'active' && (
                  <div className="flex gap-2">
                    <button className="border-2 border-border p-1.5 transition-all hover:bg-green-100">
                      <Check className="h-4 w-4 text-green-500" />
                    </button>
                    <button className="border-2 border-border p-1.5 transition-all hover:bg-red-100">
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Rules */}
      <div>
        <h2 className="mb-4 font-bold text-xl">Quy tắc cảnh báo</h2>
        <div className="border-2 border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border bg-muted">
                  <th className="px-4 py-3 text-left text-sm font-bold">Quy tắc</th>
                  <th className="px-4 py-3 text-left text-sm font-bold">Mức độ</th>
                  <th className="px-4 py-3 text-left text-sm font-bold">Kênh thông báo</th>
                  <th className="px-4 py-3 text-left text-sm font-bold">Trạng thái</th>
                  <th className="px-4 py-3 text-right text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-border">
                {alertRules.map((rule, index) => (
                  <tr key={index} className="transition-colors hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{rule.name}</td>
                    <td className="px-4 py-3">
                      <span className={`border border-border px-2 py-0.5 text-xs ${
                        rule.severity === 'critical' ? 'bg-red-100 text-red-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {rule.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{rule.channel}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-sm ${
                        rule.enabled ? 'text-green-500' : 'text-muted-foreground'
                      }`}>
                        <span className={`h-2 w-2 rounded-full ${
                          rule.enabled ? 'bg-green-500' : 'bg-muted-foreground'
                        }`} />
                        {rule.enabled ? 'Đang bật' : 'Đã tắt'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="border-2 border-border px-2 py-1 text-sm transition-all hover:bg-muted">
                        <Settings className="h-4 w-4" />
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
