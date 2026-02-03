import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-bold text-3xl font-bold">Tạo tài khoản</h1>
        <p className="text-muted-foreground">
          Bắt đầu hành trình học tập của bạn ngay hôm nay.
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Họ và tên
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nguyễn Văn A"
            className="w-full border-2 border-border bg-input px-4 py-3 shadow-xs transition-shadow focus:shadow-sm focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full border-2 border-border bg-input px-4 py-3 shadow-xs transition-shadow focus:shadow-sm focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full border-2 border-border bg-input px-4 py-3 shadow-xs transition-shadow focus:shadow-sm focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Xác nhận mật khẩu
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="w-full border-2 border-border bg-input px-4 py-3 shadow-xs transition-shadow focus:shadow-sm focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full border-2 border-border bg-primary px-4 py-3 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md active:translate-x-0 active:translate-y-0 active:shadow-sm"
        >
          Đăng ký
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-sm text-muted-foreground">
            hoặc
          </span>
        </div>
      </div>

      <button
        type="button"
        className="w-full border-2 border-border bg-background px-4 py-3 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
      >
        Đăng ký với Google
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Đã có tài khoản?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-foreground hover:underline"
        >
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
