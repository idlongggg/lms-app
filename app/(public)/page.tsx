import Link from "next/link";
import { ArrowRight, BookOpen, Swords, Trophy, Zap } from "lucide-react";

const FeatureIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "BookOpen":
      return <BookOpen className="h-6 w-6" />;
    case "Swords":
      return <Swords className="h-6 w-6" />;
    case "Trophy":
      return <Trophy className="h-6 w-6" />;
    case "Zap":
      return <Zap className="h-6 w-6" />;
    default:
      return null;
  }
};

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="font-bold text-5xl font-bold leading-tight md:text-6xl">
                Học tập không nhàm chán
              </h1>
              <p className="text-lg text-foreground/80">
                Nền tảng học tập trực tuyến với gamification, giải đấu thú vị và
                phong cách NeoBrutalism độc đáo. Biến việc học thành cuộc phiêu
                lưu!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center gap-2 border-2 border-border bg-secondary px-6 py-3 font-medium text-secondary-foreground shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg"
                >
                  Bắt đầu ngay
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 border-2 border-border bg-background px-6 py-3 font-medium shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square border-4 border-border bg-background p-8 shadow-xl">
                <div className="grid h-full grid-cols-2 gap-4">
                  <div className="border-2 border-border bg-accent p-4">
                    <BookOpen className="h-8 w-8" />
                    <p className="mt-2 font-medium">1000+ Bài học</p>
                  </div>
                  <div className="border-2 border-border bg-muted p-4">
                    <Trophy className="h-8 w-8" />
                    <p className="mt-2 font-medium">50+ Giải đấu</p>
                  </div>
                  <div className="border-2 border-border bg-muted p-4">
                    <Swords className="h-8 w-8" />
                    <p className="mt-2 font-medium">PvP Mode</p>
                  </div>
                  <div className="border-2 border-border bg-accent p-4">
                    <Zap className="h-8 w-8" />
                    <p className="mt-2 font-medium">AI Tutor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="font-bold text-4xl font-bold">Tính năng nổi bật</h2>
            <p className="mt-4 text-muted-foreground">
              Trải nghiệm học tập hoàn toàn mới với các tính năng độc đáo
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border-2 border-border bg-card p-6 shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border-2 border-border bg-primary">
                  <FeatureIcon name={feature.icon} />
                </div>
                <h3 className="mb-2 font-bold text-xl font-bold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-y-2 border-border bg-accent py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-bold text-4xl font-bold">
            Sẵn sàng bắt đầu hành trình?
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Tham gia cùng hàng nghìn học viên và biến việc học thành niềm vui
            mỗi ngày.
          </p>
          <Link
            href="/auth/register"
            className="mt-8 inline-flex items-center gap-2 border-2 border-border bg-secondary px-8 py-4 font-medium text-secondary-foreground shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg"
          >
            Đăng ký miễn phí
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}

const features = [
  {
    icon: "BookOpen",
    title: "Nội dung đa dạng",
    description:
      "Hàng nghìn bài học từ cơ bản đến nâng cao, được biên soạn bởi các chuyên gia.",
  },
  {
    icon: "Swords",
    title: "Giải đấu PvP",
    description:
      "Thử thách bản thân trong các trận đấu realtime với người chơi khác.",
  },
  {
    icon: "Trophy",
    title: "Hệ thống phần thưởng",
    description:
      "Nhận điểm, huy hiệu và leo rank khi hoàn thành bài học và chiến thắng.",
  },
  {
    icon: "Zap",
    title: "AI Tutor",
    description:
      "Trợ lý AI thông minh hỗ trợ giải đáp thắc mắc 24/7.",
  },
];
