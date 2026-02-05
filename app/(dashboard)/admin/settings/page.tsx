"use client";

import { Bell, Database, Settings, Shield } from "lucide-react";

import { Button, Card, Input, Select, Switch } from "@/components/ui";

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
    <Card className="shadow-sm">
      <Card.Content className="p-0">
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
      </Card.Content>
    </Card>
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
      <label className="mb-1 block text-sm font-medium">{label}</label>
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
            <Input type="text" defaultValue="LMS Platform" />
          </FormField>
          <FormField label="Email liên hệ">
            <Input type="email" defaultValue="admin@lms.com" />
          </FormField>
          <FormField label="Timezone">
            <Select defaultValue="hcm">
              <Select.Trigger className="w-full">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="hcm">Asia/Ho_Chi_Minh (UTC+7)</Select.Item>
                <Select.Item value="bkk">Asia/Bangkok (UTC+7)</Select.Item>
              </Select.Content>
            </Select>
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
              <Switch defaultChecked={setting.enabled} />
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
            <Input type="number" defaultValue="60" />
          </FormField>
          <FormField label="Số lần đăng nhập sai tối đa">
            <Input type="number" defaultValue="5" />
          </FormField>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-muted-foreground text-sm">
                Bắt buộc cho Admin
              </p>
            </div>
            <Switch defaultChecked={true} />
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
          <Button variant="secondary" className="w-full">
            Backup Database
          </Button>
        </SettingCard>
      </div>

      <div className="flex justify-end">
        <Button size="lg">Lưu cài đặt</Button>
      </div>
    </div>
  );
}

function ConnectionStatus({ name, status }: { name: string; status: string }) {
  return (
    <div className="border-border bg-muted flex items-center justify-between rounded border-2 p-3">
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
