import { Settings, Bell, Shield, Database, Palette } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-bold text-3xl font-bold">Cài đặt hệ thống</h1>
        <p className="text-muted-foreground">
          Quản lý cấu hình và tùy chỉnh hệ thống
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <div className="border-2 border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b-2 border-border p-4">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-primary">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg font-bold">Cài đặt chung</h2>
              <p className="text-sm text-muted-foreground">
                Thông tin cơ bản của hệ thống
              </p>
            </div>
          </div>
          <div className="space-y-4 p-4">
            <div>
              <label className="text-sm font-medium">Tên hệ thống</label>
              <input
                type="text"
                defaultValue="LMS Platform"
                className="mt-1 w-full border-2 border-border bg-input px-3 py-2 shadow-xs"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email liên hệ</label>
              <input
                type="email"
                defaultValue="admin@lms.com"
                className="mt-1 w-full border-2 border-border bg-input px-3 py-2 shadow-xs"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Timezone</label>
              <select className="mt-1 w-full border-2 border-border bg-input px-3 py-2 shadow-xs">
                <option>Asia/Ho_Chi_Minh (UTC+7)</option>
                <option>Asia/Bangkok (UTC+7)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="border-2 border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b-2 border-border p-4">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-accent">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg font-bold">Thông báo</h2>
              <p className="text-sm text-muted-foreground">
                Cấu hình thông báo hệ thống
              </p>
            </div>
          </div>
          <div className="space-y-4 p-4">
            {notificationSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{setting.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
                <button
                  className={`h-6 w-12 border-2 border-border transition-colors ${setting.enabled ? "bg-primary" : "bg-muted"}`}
                >
                  <div
                    className={`h-4 w-4 border border-border bg-background transition-transform ${setting.enabled ? "translate-x-6" : "translate-x-0.5"}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Settings */}
        <div className="border-2 border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b-2 border-border p-4">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-destructive text-destructive-foreground">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg font-bold">Bảo mật</h2>
              <p className="text-sm text-muted-foreground">
                Cài đặt bảo mật và xác thực
              </p>
            </div>
          </div>
          <div className="space-y-4 p-4">
            <div>
              <label className="text-sm font-medium">
                Thời gian session (phút)
              </label>
              <input
                type="number"
                defaultValue="60"
                className="mt-1 w-full border-2 border-border bg-input px-3 py-2 shadow-xs"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Số lần đăng nhập sai tối đa
              </label>
              <input
                type="number"
                defaultValue="5"
                className="mt-1 w-full border-2 border-border bg-input px-3 py-2 shadow-xs"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Bắt buộc cho Admin
                </p>
              </div>
              <button className="h-6 w-12 border-2 border-border bg-primary transition-colors">
                <div className="h-4 w-4 translate-x-6 border border-border bg-background" />
              </button>
            </div>
          </div>
        </div>

        {/* Database Settings */}
        <div className="border-2 border-border bg-card shadow-sm">
          <div className="flex items-center gap-3 border-b-2 border-border p-4">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-muted">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg font-bold">Database</h2>
              <p className="text-sm text-muted-foreground">
                Thông tin và backup database
              </p>
            </div>
          </div>
          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between border-2 border-border bg-muted p-3">
              <div>
                <p className="text-sm font-medium">PostgreSQL</p>
                <p className="text-xs text-muted-foreground">Connected</p>
              </div>
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center justify-between border-2 border-border bg-muted p-3">
              <div>
                <p className="text-sm font-medium">Redis</p>
                <p className="text-xs text-muted-foreground">Connected</p>
              </div>
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <button className="w-full border-2 border-border bg-secondary px-4 py-2 font-medium text-secondary-foreground shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
              Backup Database
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="border-2 border-border bg-primary px-6 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
          Lưu cài đặt
        </button>
      </div>
    </div>
  );
}

const notificationSettings = [
  {
    label: "Email thông báo",
    description: "Gửi email khi có sự kiện quan trọng",
    enabled: true,
  },
  {
    label: "Push notification",
    description: "Thông báo đẩy cho người dùng",
    enabled: true,
  },
  {
    label: "Báo cáo hàng tuần",
    description: "Gửi báo cáo tổng hợp mỗi tuần",
    enabled: false,
  },
];
