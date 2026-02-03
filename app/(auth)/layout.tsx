import Link from "next/link";
import { Logo } from "@/components/layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding */}
      <div className="hidden w-1/2 flex-col justify-between border-r-2 border-border bg-primary p-12 lg:flex">
        <Logo />
        <div className="space-y-6">
          <h1 className="font-bold text-5xl font-bold leading-tight">
            Chào mừng đến với LMS
          </h1>
          <p className="text-lg text-foreground/80">
            Nền tảng học tập trực tuyến với phong cách NeoBrutalism độc đáo.
            Học mà chơi, chơi mà học!
          </p>
          <div className="flex gap-4">
            <div className="border-2 border-border bg-background p-4 shadow-md">
              <p className="font-bold text-3xl font-bold">10K+</p>
              <p className="text-sm text-muted-foreground">Học viên</p>
            </div>
            <div className="border-2 border-border bg-background p-4 shadow-md">
              <p className="font-bold text-3xl font-bold">500+</p>
              <p className="text-sm text-muted-foreground">Bài học</p>
            </div>
            <div className="border-2 border-border bg-background p-4 shadow-md">
              <p className="font-bold text-3xl font-bold">50+</p>
              <p className="text-sm text-muted-foreground">Giải đấu</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-foreground/60">
          © {new Date().getFullYear()} LMS. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* Mobile logo */}
        <div className="flex h-16 items-center border-b-2 border-border px-6 lg:hidden">
          <Logo />
        </div>

        {/* Form container */}
        <div className="flex flex-1 flex-col items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* Back to home link */}
        <div className="flex h-16 items-center justify-center border-t-2 border-border">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
