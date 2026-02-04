"use client";

import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  HardDrive,
  RefreshCw,
  Server,
  Wifi,
} from "lucide-react";

import { useAuth } from "@/lib/auth";

// Mock health data
const services = [
  {
    name: "API Gateway",
    status: "healthy",
    uptime: "99.99%",
    latency: "12ms",
    lastCheck: "2024-01-20T10:30:00Z",
    icon: Server,
  },
  {
    name: "Database Primary",
    status: "healthy",
    uptime: "99.95%",
    latency: "3ms",
    lastCheck: "2024-01-20T10:30:00Z",
    icon: Database,
  },
  {
    name: "Database Replica",
    status: "healthy",
    uptime: "99.90%",
    latency: "5ms",
    lastCheck: "2024-01-20T10:30:00Z",
    icon: Database,
  },
  {
    name: "Redis Cache",
    status: "healthy",
    uptime: "99.99%",
    latency: "1ms",
    lastCheck: "2024-01-20T10:30:00Z",
    icon: HardDrive,
  },
  {
    name: "File Storage",
    status: "degraded",
    uptime: "98.50%",
    latency: "45ms",
    lastCheck: "2024-01-20T10:30:00Z",
    icon: HardDrive,
  },
  {
    name: "WebSocket Server",
    status: "healthy",
    uptime: "99.80%",
    latency: "8ms",
    lastCheck: "2024-01-20T10:30:00Z",
    icon: Wifi,
  },
];

const metrics = {
  cpu: { current: 45, avg: 38, max: 72 },
  memory: { current: 62, avg: 58, max: 85 },
  disk: { current: 34, avg: 32, max: 34 },
  network: { in: "125 MB/s", out: "89 MB/s" },
};

const recentIncidents = [
  {
    id: 1,
    title: "File Storage latency spike",
    status: "investigating",
    severity: "warning",
    startedAt: "2024-01-20T09:15:00Z",
    description: "Độ trễ tăng cao do tải cao từ backup process",
  },
  {
    id: 2,
    title: "Database maintenance completed",
    status: "resolved",
    severity: "info",
    startedAt: "2024-01-19T22:00:00Z",
    resolvedAt: "2024-01-19T23:30:00Z",
    description: "Bảo trì định kỳ hàng tuần",
  },
];

export default function AdminHealthPage() {
  const { user } = useAuth();

  // Only root-admin can access this page
  if (!user || user.role !== "root-admin") {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">
          Bạn không có quyền truy cập trang này.
        </p>
      </div>
    );
  }

  const healthyServices = services.filter((s) => s.status === "healthy").length;
  const totalServices = services.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trạng thái hệ thống</h1>
          <p className="text-muted-foreground">
            Giám sát sức khỏe và hiệu suất của hệ thống
          </p>
        </div>
        <button className="border-border bg-primary inline-flex items-center gap-2 border-2 px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
          <RefreshCw className="h-4 w-4" />
          Làm mới
        </button>
      </div>

      {/* Overall Status */}
      <div className="border-border bg-card border-2 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div
            className={`border-border flex h-16 w-16 items-center justify-center border-2 ${
              healthyServices === totalServices
                ? "bg-green-500"
                : "bg-orange-500"
            }`}
          >
            {healthyServices === totalServices ? (
              <CheckCircle className="h-8 w-8 text-white" />
            ) : (
              <AlertTriangle className="h-8 w-8 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {healthyServices === totalServices
                ? "Hệ thống hoạt động bình thường"
                : "Một số dịch vụ có vấn đề"}
            </h2>
            <p className="text-muted-foreground">
              {healthyServices}/{totalServices} dịch vụ đang hoạt động tốt • Cập
              nhật lúc {new Date().toLocaleTimeString("vi-VN")}
            </p>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">CPU Usage</p>
            <span className="text-sm font-medium">{metrics.cpu.current}%</span>
          </div>
          <div className="bg-muted border-border h-2 border">
            <div
              className={`h-full ${metrics.cpu.current > 80 ? "bg-red-500" : metrics.cpu.current > 60 ? "bg-orange-500" : "bg-green-500"}`}
              style={{ width: `${metrics.cpu.current}%` }}
            />
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            Avg: {metrics.cpu.avg}% | Max: {metrics.cpu.max}%
          </p>
        </div>
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">Memory Usage</p>
            <span className="text-sm font-medium">
              {metrics.memory.current}%
            </span>
          </div>
          <div className="bg-muted border-border h-2 border">
            <div
              className={`h-full ${metrics.memory.current > 80 ? "bg-red-500" : metrics.memory.current > 60 ? "bg-orange-500" : "bg-green-500"}`}
              style={{ width: `${metrics.memory.current}%` }}
            />
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            Avg: {metrics.memory.avg}% | Max: {metrics.memory.max}%
          </p>
        </div>
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">Disk Usage</p>
            <span className="text-sm font-medium">{metrics.disk.current}%</span>
          </div>
          <div className="bg-muted border-border h-2 border">
            <div
              className="h-full bg-green-500"
              style={{ width: `${metrics.disk.current}%` }}
            />
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            Avg: {metrics.disk.avg}% | Max: {metrics.disk.max}%
          </p>
        </div>
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">Network I/O</p>
            <Wifi className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-lg font-bold">↓ {metrics.network.in}</p>
          <p className="text-lg font-bold">↑ {metrics.network.out}</p>
        </div>
      </div>

      {/* Services Status */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Trạng thái dịch vụ</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="border-border bg-card border-2 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`border-border flex h-10 w-10 items-center justify-center border-2 ${
                      service.status === "healthy"
                        ? "bg-green-500"
                        : "bg-orange-500"
                    }`}
                  >
                    <service.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">{service.name}</h3>
                    <p
                      className={`text-sm ${
                        service.status === "healthy"
                          ? "text-green-500"
                          : "text-orange-500"
                      }`}
                    >
                      {service.status === "healthy"
                        ? "Hoạt động tốt"
                        : "Có vấn đề"}
                    </p>
                  </div>
                </div>
                <div
                  className={`h-3 w-3 rounded-full ${
                    service.status === "healthy"
                      ? "bg-green-500"
                      : "animate-pulse bg-orange-500"
                  }`}
                />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Uptime</p>
                  <p className="font-medium">{service.uptime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Latency</p>
                  <p className="font-medium">{service.latency}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last check</p>
                  <p className="font-medium">
                    {new Date(service.lastCheck).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Sự cố gần đây</h2>
        <div className="space-y-4">
          {recentIncidents.map((incident) => (
            <div
              key={incident.id}
              className="border-border bg-card border-2 p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`border-border mt-0.5 flex h-8 w-8 items-center justify-center border-2 ${
                    incident.status === "resolved"
                      ? "bg-green-500"
                      : incident.severity === "warning"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                  }`}
                >
                  {incident.status === "resolved" ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{incident.title}</h3>
                    <span
                      className={`border-border border px-2 py-0.5 text-xs ${
                        incident.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {incident.status === "resolved"
                        ? "Đã giải quyết"
                        : "Đang xử lý"}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {incident.description}
                  </p>
                  <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Bắt đầu:{" "}
                      {new Date(incident.startedAt).toLocaleString("vi-VN")}
                    </span>
                    {incident.resolvedAt && (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Giải quyết:{" "}
                        {new Date(incident.resolvedAt).toLocaleString("vi-VN")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
