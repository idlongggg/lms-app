import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-bold text-3xl font-bold">Đăng nhập</h1>
        <p className="text-muted-foreground">
          Chào mừng trở lại! Nhập thông tin để tiếp tục.
        </p>
      </div>

      <form className="space-y-4">
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Mật khẩu
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full border-2 border-border bg-input px-4 py-3 shadow-xs transition-shadow focus:shadow-sm focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full border-2 border-border bg-primary px-4 py-3 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md active:translate-x-0 active:translate-y-0 active:shadow-sm"
        >
          Đăng nhập
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
        Đăng nhập với Google
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Chưa có tài khoản?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-foreground hover:underline"
        >
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}
