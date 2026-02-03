import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-bold text-3xl font-bold">Quên mật khẩu</h1>
        <p className="text-muted-foreground">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
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

        <button
          type="submit"
          className="w-full border-2 border-border bg-primary px-4 py-3 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md active:translate-x-0 active:translate-y-0 active:shadow-sm"
        >
          Gửi liên kết đặt lại
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Nhớ mật khẩu rồi?{" "}
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
