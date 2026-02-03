export default function ProfileSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Cài đặt</h1>
        <p className="text-muted-foreground">
          Quản lý cài đặt tài khoản của bạn
        </p>
      </div>

      <div className="space-y-6">
        {/* Account Settings */}
        <div className="border-2 border-border bg-background shadow-sm">
          <div className="border-b-2 border-border bg-muted px-6 py-4">
            <h2 className="font-bold">Thông tin tài khoản</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  defaultValue="nguyenvana@email.com"
                  className="w-full border-2 border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  defaultValue="0912345678"
                  className="w-full border-2 border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <button className="border-2 border-border bg-primary px-6 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
              Lưu thay đổi
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="border-2 border-border bg-background shadow-sm">
          <div className="border-b-2 border-border bg-muted px-6 py-4">
            <h2 className="font-bold">Thông báo</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo email</p>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo qua email
                </p>
              </div>
              <button className="h-6 w-11 rounded-full bg-primary p-0.5">
                <div className="h-5 w-5 translate-x-5 rounded-full bg-background transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo thách đấu</p>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo khi có người thách đấu
                </p>
              </div>
              <button className="h-6 w-11 rounded-full bg-primary p-0.5">
                <div className="h-5 w-5 translate-x-5 rounded-full bg-background transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Nhắc nhở học tập</p>
                <p className="text-sm text-muted-foreground">
                  Nhận nhắc nhở hàng ngày
                </p>
              </div>
              <button className="h-6 w-11 rounded-full bg-muted p-0.5">
                <div className="h-5 w-5 rounded-full bg-background transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-2 border-destructive bg-background shadow-sm">
          <div className="border-b-2 border-destructive bg-destructive/10 px-6 py-4">
            <h2 className="font-bold text-destructive">Vùng nguy hiểm</h2>
          </div>
          <div className="p-6">
            <p className="mb-4 text-sm text-muted-foreground">
              Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu của bạn. Hành động
              này không thể hoàn tác.
            </p>
            <button className="border-2 border-destructive bg-background px-6 py-2 font-medium text-destructive shadow-xs transition-all hover:bg-destructive hover:text-white">
              Xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
