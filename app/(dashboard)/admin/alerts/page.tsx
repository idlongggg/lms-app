"use client";

import {
  AlertTriangle,
  Bell,
  Check,
  Clock,
  Plus,
  Search,
  Settings,
  X,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Dialog } from "@/components/retroui/Dialog";
import { Input } from "@/components/retroui/Input";
import { Select } from "@/components/retroui/Select";
import { Switch } from "@/components/retroui/Switch";
import { Table } from "@/components/retroui/Table";
import { useAuth } from "@/lib/auth";

// Mock alerts data
const alerts = [
  {
    id: 1,
    title: "CPU usage cao",
    message: "Server API-01 CPU vượt ngưỡng 80% trong 5 phút",
    severity: "critical",
    status: "active",
    source: "System Monitor",
    createdAt: "2024-01-20T10:25:00Z",
    acknowledgedAt: null,
  },
  {
    id: 2,
    title: "File Storage latency",
    message: "Độ trễ truy cập file storage tăng lên 45ms",
    severity: "warning",
    status: "acknowledged",
    source: "Health Check",
    createdAt: "2024-01-20T09:15:00Z",
    acknowledgedAt: "2024-01-20T09:20:00Z",
  },
  {
    id: 3,
    title: "Login failures spike",
    message: "50+ đăng nhập thất bại từ IP 192.168.1.100",
    severity: "warning",
    status: "active",
    source: "Security",
    createdAt: "2024-01-20T08:45:00Z",
    acknowledgedAt: null,
  },
  {
    id: 4,
    title: "Database backup completed",
    message: "Backup hàng ngày hoàn thành thành công",
    severity: "info",
    status: "resolved",
    source: "Backup Service",
    createdAt: "2024-01-20T02:00:00Z",
    acknowledgedAt: "2024-01-20T02:01:00Z",
  },
  {
    id: 5,
    title: "Memory usage warning",
    message: "Server DB-01 memory đạt 75%",
    severity: "warning",
    status: "resolved",
    source: "System Monitor",
    createdAt: "2024-01-19T16:30:00Z",
    acknowledgedAt: "2024-01-19T16:35:00Z",
  },
];

const alertRules = [
  {
    name: "CPU > 80%",
    enabled: true,
    severity: "critical",
    channel: "Email, Slack",
  },
  {
    name: "Memory > 85%",
    enabled: true,
    severity: "critical",
    channel: "Email, Slack",
  },
  { name: "Disk > 90%", enabled: true, severity: "warning", channel: "Email" },
  {
    name: "API latency > 500ms",
    enabled: true,
    severity: "warning",
    channel: "Slack",
  },
  {
    name: "Error rate > 1%",
    enabled: false,
    severity: "critical",
    channel: "Email, Slack, SMS",
  },
];

export default function AdminAlertsPage() {
  const { user } = useAuth();
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);

  // Only root-admin can access this page
  if (!user || user.role.code !== "root-admin") {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">
          Bạn không có quyền truy cập trang này.
        </p>
      </div>
    );
  }

  const activeAlerts = alerts.filter((a) => a.status === "active").length;
  const criticalAlerts = alerts.filter(
    (a) => a.severity === "critical" && a.status !== "resolved",
  ).length;

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity =
      severityFilter === "all" || alert.severity === severityFilter;
    const matchesStatus =
      statusFilter === "all" || alert.status === statusFilter;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cảnh báo hệ thống</h1>
          <p className="text-muted-foreground">Quản lý và cấu hình cảnh báo</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Cài đặt
          </Button>
          <Dialog open={isAddRuleOpen} onOpenChange={setIsAddRuleOpen}>
            <Dialog.Trigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Thêm quy tắc
              </Button>
            </Dialog.Trigger>
            <Dialog.Content size="md">
              <Dialog.Header>Thêm quy tắc cảnh báo</Dialog.Header>
              <div className="space-y-4 p-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Tên quy tắc
                  </label>
                  <Input placeholder="VD: CPU > 90%" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Mức độ
                  </label>
                  <Select defaultValue="warning">
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Chọn mức độ" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="critical">Critical</Select.Item>
                      <Select.Item value="warning">Warning</Select.Item>
                      <Select.Item value="info">Info</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Kênh thông báo
                  </label>
                  <Input placeholder="Email, Slack, SMS" />
                </div>
              </div>
              <Dialog.Footer>
                <Button
                  variant="outline"
                  onClick={() => setIsAddRuleOpen(false)}
                >
                  Hủy
                </Button>
                <Button onClick={() => setIsAddRuleOpen(false)}>Lưu</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  Cảnh báo đang hoạt động
                </p>
                <p className="text-2xl font-bold">{activeAlerts}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-orange-500">
                <Bell className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Nghiêm trọng</p>
                <p className="text-2xl font-bold text-red-500">
                  {criticalAlerts}
                </p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-red-500">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  Quy tắc đang bật
                </p>
                <p className="text-2xl font-bold">
                  {alertRules.filter((r) => r.enabled).length}/
                  {alertRules.length}
                </p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-500">
                <Settings className="h-5 w-5 text-white" />
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
            placeholder="Tìm kiếm cảnh báo..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <Select.Trigger className="w-[150px]">
            <Select.Value placeholder="Tất cả mức độ" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Tất cả mức độ</Select.Item>
            <Select.Item value="critical">Critical</Select.Item>
            <Select.Item value="warning">Warning</Select.Item>
            <Select.Item value="info">Info</Select.Item>
          </Select.Content>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <Select.Trigger className="w-[150px]">
            <Select.Value placeholder="Trạng thái" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Tất cả</Select.Item>
            <Select.Item value="active">Active</Select.Item>
            <Select.Item value="acknowledged">Acknowledged</Select.Item>
            <Select.Item value="resolved">Resolved</Select.Item>
          </Select.Content>
        </Select>
      </div>

      {/* Alerts List */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Cảnh báo gần đây</h2>
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`${
                alert.severity === "critical" && alert.status === "active"
                  ? "border-red-500"
                  : alert.severity === "warning" && alert.status === "active"
                    ? "border-orange-500"
                    : ""
              }`}
            >
              <Card.Content className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`border-border mt-0.5 flex h-8 w-8 items-center justify-center border-2 ${
                      alert.severity === "critical"
                        ? "bg-red-500"
                        : alert.severity === "warning"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                    }`}
                  >
                    {alert.severity === "info" ? (
                      <Bell className="h-4 w-4 text-white" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{alert.title}</h3>
                      <Badge
                        variant={
                          alert.severity === "critical"
                            ? "solid"
                            : alert.severity === "warning"
                              ? "surface"
                              : "default"
                        }
                        size="sm"
                        className={
                          alert.severity === "critical"
                            ? "bg-red-500 text-white"
                            : alert.severity === "warning"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                        }
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Badge
                        size="sm"
                        className={
                          alert.status === "active"
                            ? "bg-red-100 text-red-700"
                            : alert.status === "acknowledged"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                        }
                      >
                        {alert.status === "active"
                          ? "Đang hoạt động"
                          : alert.status === "acknowledged"
                            ? "Đã xác nhận"
                            : "Đã giải quyết"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {alert.message}
                    </p>
                    <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                      <span>Nguồn: {alert.source}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(alert.createdAt).toLocaleString("vi-VN")}
                      </span>
                    </div>
                  </div>
                  {alert.status === "active" && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-green-100"
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-red-100"
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>

      {/* Alert Rules */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Quy tắc cảnh báo</h2>
        <div className="border-border bg-card border-2 shadow-sm">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Quy tắc</Table.Head>
                <Table.Head>Mức độ</Table.Head>
                <Table.Head>Kênh thông báo</Table.Head>
                <Table.Head>Trạng thái</Table.Head>
                <Table.Head className="text-right">Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {alertRules.map((rule, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="font-medium">{rule.name}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      size="sm"
                      className={
                        rule.severity === "critical"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }
                    >
                      {rule.severity.toUpperCase()}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="text-muted-foreground">
                    {rule.channel}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Switch checked={rule.enabled} />
                      <span
                        className={`text-sm ${rule.enabled ? "text-green-500" : "text-muted-foreground"}`}
                      >
                        {rule.enabled ? "Đang bật" : "Đã tắt"}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
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
