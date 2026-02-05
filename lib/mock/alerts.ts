/**
 * Mock Alerts Data
 */

export interface Alert {
  id: number;
  title: string;
  message: string;
  severity: "critical" | "warning" | "info";
  status: "active" | "acknowledged" | "resolved";
  source: string;
  createdAt: string;
  acknowledgedAt: string | null;
}

export interface AlertRule {
  name: string;
  enabled: boolean;
  severity: "critical" | "warning" | "info";
  channel: string;
}

export const mockAlerts: Alert[] = [
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

export const mockAlertRules: AlertRule[] = [
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
