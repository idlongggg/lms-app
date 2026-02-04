import { Bell, Database, Settings, Shield } from "lucide-react";

interface SettingCardProps {
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

function SettingCard({
  icon,
  iconBg = "bg-primary",
  title,
  description,
  children,
}: SettingCardProps) {
  return (
    <div className="border-border bg-card border-2 shadow-sm">
      <div className="border-border flex items-center gap-3 border-b-2 p-4">
        <div
          className={`border-border flex h-10 w-10 items-center justify-center border-2 ${iconBg}`}
        >
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      <div className="space-y-4 p-4">{children}</div>
    </div>
  );
}

function ToggleSwitch({ enabled }: { enabled: boolean }) {
  return (
    <button
      className={`border-border h-6 w-12 border-2 transition-colors ${enabled ? "bg-primary" : "bg-muted"}`}
    >
      <div
        className={`border-border bg-background h-4 w-4 border transition-transform ${enabled ? "translate-x-6" : "translate-x-0.5"}`}
      />
    </button>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cài đặt hệ thống"
        description="Quản lý cấu hình và tùy chỉnh hệ thống"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SettingCard
          icon={<Settings className="h-5 w-5" />}
          title="Cài đặt chung"
          description="Thông tin cơ bản của hệ thống"
        >
          <FormField label="Tên hệ thống">
            <input
              type="text"
              defaultValue="LMS Platform"
              className="border-border bg-input mt-1 w-full border-2 px-3 py-2 shadow-xs"
            />
          </FormField>
          <FormField label="Email liên hệ">
            <input
              type="email"
              defaultValue="admin@lms.com"
              className="border-border bg-input mt-1 w-full border-2 px-3 py-2 shadow-xs"
            />
          </FormField>
          <FormField label="Timezone">
            <select className="border-border bg-input mt-1 w-full border-2 px-3 py-2 shadow-xs">
              <option>Asia/Ho_Chi_Minh (UTC+7)</option>
              <option>Asia/Bangkok (UTC+7)</option>
            </select>
          </FormField>
        </SettingCard>

        <SettingCard
          icon={<Bell className="h-5 w-5" />}
          iconBg="bg-accent"
          title="Thông báo"
          description="Cấu hình thông báo hệ thống"
        >
          {notificationSettings.map((setting, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{setting.label}</p>
                <p className="text-muted-foreground text-sm">
                  {setting.description}
                </p>
              </div>
              <ToggleSwitch enabled={setting.enabled} />
            </div>
          ))}
        </SettingCard>

        <SettingCard
          icon={<Shield className="h-5 w-5" />}
          iconBg="bg-destructive text-destructive-foreground"
          title="Bảo mật"
          description="Cài đặt bảo mật và xác thực"
        >
          <FormField label="Thời gian session (phút)">
            <input
              type="number"
              defaultValue="60"
              className="border-border bg-input mt-1 w-full border-2 px-3 py-2 shadow-xs"
            />
          </FormField>
          <FormField label="Số lần đăng nhập sai tối đa">
            <input
              type="number"
              defaultValue="5"
              className="border-border bg-input mt-1 w-full border-2 px-3 py-2 shadow-xs"
            />
          </FormField>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-muted-foreground text-sm">
                Bắt buộc cho Admin
              </p>
            </div>
            <ToggleSwitch enabled={true} />
          </div>
        </SettingCard>

        <SettingCard
          icon={<Database className="h-5 w-5" />}
          iconBg="bg-muted"
          title="Database"
          description="Thông tin và backup database"
        >
          <ConnectionStatus name="PostgreSQL" status="Connected" />
          <ConnectionStatus name="Redis" status="Connected" />
          <button className="border-border bg-secondary text-secondary-foreground w-full border-2 px-4 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
            Backup Database
          </button>
        </SettingCard>
      </div>

      <div className="flex justify-end">
        <button className="border-border bg-primary border-2 px-6 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
          Lưu cài đặt
        </button>
      </div>
    </div>
  );
}

function ConnectionStatus({ name, status }: { name: string; status: string }) {
  return (
    <div className="border-border bg-muted flex items-center justify-between border-2 p-3">
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-muted-foreground text-xs">{status}</p>
      </div>
      <span className="h-3 w-3 rounded-full bg-green-500" />
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
