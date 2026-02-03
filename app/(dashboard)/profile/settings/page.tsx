export default function ProfileSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Cài đặt</h1>
        <p className="text-muted-foreground">Quản lý cài đặt tài khoản của bạn</p>
      </div>

      <div className="space-y-6">
        {/* Account Settings */}
        <div className="border-border bg-background border-2 shadow-sm">
          <div className="border-border bg-muted border-b-2 px-6 py-4">
            <h2 className="font-bold">Thông tin tài khoản</h2>
          </div>
          <div className="space-y-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  defaultValue="nguyenvana@email.com"
                  className="border-border bg-background focus:ring-primary w-full border-2 px-4 py-2 focus:ring-2 focus:outline-none"
                  disabled
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Số điện thoại</label>
                <input
                  type="tel"
                  defaultValue="0912345678"
                  className="border-border bg-background focus:ring-primary w-full border-2 px-4 py-2 focus:ring-2 focus:outline-none"
                />
              </div>
            </div>
            <button className="border-border bg-primary border-2 px-6 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
              Lưu thay đổi
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="border-border bg-background border-2 shadow-sm">
          <div className="border-border bg-muted border-b-2 px-6 py-4">
            <h2 className="font-bold">Thông báo</h2>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo email</p>
                <p className="text-muted-foreground text-sm">Nhận thông báo qua email</p>
              </div>
              <button className="bg-primary h-6 w-11 rounded-full p-0.5">
                <div className="bg-background h-5 w-5 translate-x-5 rounded-full transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo thách đấu</p>
                <p className="text-muted-foreground text-sm">
                  Nhận thông báo khi có người thách đấu
                </p>
              </div>
              <button className="bg-primary h-6 w-11 rounded-full p-0.5">
                <div className="bg-background h-5 w-5 translate-x-5 rounded-full transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Nhắc nhở học tập</p>
                <p className="text-muted-foreground text-sm">Nhận nhắc nhở hàng ngày</p>
              </div>
              <button className="bg-muted h-6 w-11 rounded-full p-0.5">
                <div className="bg-background h-5 w-5 rounded-full transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-destructive bg-background border-2 shadow-sm">
          <div className="border-destructive bg-destructive/10 border-b-2 px-6 py-4">
            <h2 className="text-destructive font-bold">Vùng nguy hiểm</h2>
          </div>
          <div className="p-6">
            <p className="text-muted-foreground mb-4 text-sm">
              Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu của bạn. Hành động này không thể hoàn
              tác.
            </p>
            <button className="border-destructive bg-background text-destructive hover:bg-destructive border-2 px-6 py-2 font-medium shadow-xs transition-all hover:text-white">
              Xóa tài khoản
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
