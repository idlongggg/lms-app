import { Users, FileText, TrendingUp, AlertCircle } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-bold text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Tổng quan hệ thống và quản lý
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat, index) => (
          <div
            key={index}
            className="border-2 border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="font-bold text-2xl font-bold">{stat.value}</p>
                <p
                  className={`text-sm ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                >
                  {stat.change} so với tuần trước
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-primary">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <div className="border-2 border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b-2 border-border p-4">
            <h2 className="font-bold text-xl font-bold">Người dùng mới</h2>
            <a
              href="/admin/users"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Xem tất cả →
            </a>
          </div>
          <div className="divide-y-2 divide-border">
            {recentUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center border-2 border-border bg-primary">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <span className="border border-border bg-muted px-2 py-0.5 text-xs">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="border-2 border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b-2 border-border p-4">
            <h2 className="font-bold text-xl font-bold">Cảnh báo hệ thống</h2>
          </div>
          <div className="divide-y-2 divide-border">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-4">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center border-2 border-border ${alert.type === "error" ? "bg-destructive text-destructive-foreground" : "bg-accent"}`}
                >
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const adminStats = [
  { label: "Tổng người dùng", value: "12,543", change: "+12%", icon: Users },
  { label: "Nội dung", value: "1,234", change: "+5%", icon: FileText },
  { label: "Hoạt động/ngày", value: "8,432", change: "+18%", icon: TrendingUp },
  { label: "Cảnh báo", value: "3", change: "-2", icon: AlertCircle },
];

const recentUsers = [
  { name: "Nguyễn Văn A", email: "a@example.com", role: "Student" },
  { name: "Trần Thị B", email: "b@example.com", role: "Teacher" },
  { name: "Lê Văn C", email: "c@example.com", role: "Student" },
];

const systemAlerts = [
  {
    type: "warning",
    title: "Dung lượng lưu trữ",
    description: "Đã sử dụng 85% dung lượng",
    time: "5 phút trước",
  },
  {
    type: "error",
    title: "Lỗi đồng bộ",
    description: "Không thể đồng bộ dữ liệu với Redis",
    time: "1 giờ trước",
  },
];
