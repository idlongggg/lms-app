"use client";

import { Button, Card, Input, Label, Switch } from "@/components/ui";
import { useTranslation } from "@/lib/providers";

export default function ProfileSettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Account Settings */}
        <Card className="shadow-sm">
          <Card.Content className="p-0">
            <div className="border-border bg-muted border-b-2 px-6 py-4">
              <h2 className="font-bold">Thông tin tài khoản</h2>
            </div>
            <div className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="mb-2 block text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    type="email"
                    defaultValue="nguyenvana@email.com"
                    disabled
                  />
                </div>
                <div>
                  <Label className="mb-2 block text-sm font-medium">
                    Số điện thoại
                  </Label>
                  <Input type="tel" defaultValue="0912345678" />
                </div>
              </div>
              <Button>Lưu thay đổi</Button>
            </div>
          </Card.Content>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-sm">
          <Card.Content className="p-0">
            <div className="border-border bg-muted border-b-2 px-6 py-4">
              <h2 className="font-bold">Thông báo</h2>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Thông báo email</p>
                  <p className="text-muted-foreground text-sm">
                    Nhận thông báo qua email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Thông báo thách đấu</p>
                  <p className="text-muted-foreground text-sm">
                    Nhận thông báo khi có người thách đấu
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nhắc nhở học tập</p>
                  <p className="text-muted-foreground text-sm">
                    Nhận nhắc nhở hàng ngày
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive shadow-sm">
          <Card.Content className="p-0">
            <div className="border-destructive bg-destructive/10 border-b-2 px-6 py-4">
              <h2 className="text-destructive font-bold">Vùng nguy hiểm</h2>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4 text-sm">
                Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu của bạn. Hành động
                này không thể hoàn tác.
              </p>
              <Button variant="destructive">Xóa tài khoản</Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
