import { ArrowRight, BookOpen, type LucideIcon, Swords, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Swords,
  Trophy,
  Zap,
};

function FeatureIcon({ name }: { name: string }) {
  const Icon = iconMap[name];
  return Icon ? <Icon className="h-6 w-6" /> : null;
}

function HeroSection() {
  return (
    <section className="bg-primary relative overflow-hidden pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-5xl leading-tight font-bold md:text-6xl">
              Học tập không nhàm chán
            </h1>
            <p className="text-foreground/80 text-lg">
              Nền tảng học tập trực tuyến với gamification, giải đấu thú vị và phong cách
              NeoBrutalism độc đáo. Biến việc học thành cuộc phiêu lưu!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/auth/register"
                className="border-border bg-secondary text-secondary-foreground inline-flex items-center gap-2 border-2 px-6 py-3 font-medium shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg"
              >
                Bắt đầu ngay
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className="border-border bg-background inline-flex items-center gap-2 border-2 px-6 py-3 font-medium shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
          <HeroStats />
        </div>
      </div>
    </section>
  );
}

function HeroStats() {
  return (
    <div className="relative">
      <div className="border-border bg-background aspect-square border-4 p-8 shadow-xl">
        <div className="grid h-full grid-cols-2 gap-4">
          <StatCard
            icon={<BookOpen className="h-8 w-8" />}
            label="1000+ Bài học"
            variant="accent"
          />
          <StatCard icon={<Trophy className="h-8 w-8" />} label="50+ Giải đấu" variant="muted" />
          <StatCard icon={<Swords className="h-8 w-8" />} label="PvP Mode" variant="muted" />
          <StatCard icon={<Zap className="h-8 w-8" />} label="AI Tutor" variant="accent" />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  variant,
}: {
  icon: React.ReactNode;
  label: string;
  variant: 'accent' | 'muted';
}) {
  return (
    <div
      className={`border-border border-2 p-4 ${variant === 'accent' ? 'bg-accent' : 'bg-muted'}`}
    >
      {icon}
      <p className="mt-2 font-medium">{label}</p>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Tính năng nổi bật</h2>
          <p className="text-muted-foreground mt-4">
            Trải nghiệm học tập hoàn toàn mới với các tính năng độc đáo
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-border bg-card border-2 p-6 shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg">
      <div className="border-border bg-primary mb-4 inline-flex h-12 w-12 items-center justify-center border-2">
        <FeatureIcon name={icon} />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function CTASection() {
  return (
    <section className="border-border bg-accent border-y-2 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-4xl font-bold">Sẵn sàng bắt đầu hành trình?</h2>
        <p className="text-foreground/80 mt-4 text-lg">
          Tham gia cùng hàng nghìn học viên và biến việc học thành niềm vui mỗi ngày.
        </p>
        <Link
          href="/auth/register"
          className="border-border bg-secondary text-secondary-foreground mt-8 inline-flex items-center gap-2 border-2 px-8 py-4 font-medium shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg"
        >
          Đăng ký miễn phí
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </>
  );
}

const features = [
  {
    icon: 'BookOpen',
    title: 'Nội dung đa dạng',
    description: 'Hàng nghìn bài học từ cơ bản đến nâng cao, được biên soạn bởi các chuyên gia.',
  },
  {
    icon: 'Swords',
    title: 'Giải đấu PvP',
    description: 'Thử thách bản thân trong các trận đấu realtime với người chơi khác.',
  },
  {
    icon: 'Trophy',
    title: 'Hệ thống phần thưởng',
    description: 'Nhận điểm, huy hiệu và leo rank khi hoàn thành bài học và chiến thắng.',
  },
  {
    icon: 'Zap',
    title: 'AI Tutor',
    description: 'Trợ lý AI thông minh hỗ trợ giải đáp thắc mắc 24/7.',
  },
];
