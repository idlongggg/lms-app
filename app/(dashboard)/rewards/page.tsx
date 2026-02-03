import { ShoppingBag, Coins, Gift, Star } from "lucide-react";

const featuredRewards = [
  {
    id: 1,
    name: "Áo thun LMS Limited",
    coins: 500,
    image: "👕",
    stock: 10,
  },
  {
    id: 2,
    name: "Voucher Grab 50K",
    coins: 300,
    image: "🎫",
    stock: 25,
  },
  {
    id: 3,
    name: "Khóa học Premium 1 tháng",
    coins: 1000,
    image: "🎓",
    stock: 5,
  },
  {
    id: 4,
    name: "Sticker Pack Exclusive",
    coins: 100,
    image: "🎨",
    stock: 50,
  },
];

export default function RewardsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Đổi quà</h1>
          <p className="text-muted-foreground">
            Dùng xu tích lũy để đổi những phần quà hấp dẫn
          </p>
        </div>
        <div className="flex items-center gap-2 border-2 border-border bg-primary px-4 py-2 shadow-sm">
          <Coins className="h-5 w-5" />
          <span className="font-bold">1,250 xu</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border-2 border-border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-primary">
              <Coins className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Xu hiện có</p>
              <p className="text-xl font-bold">1,250</p>
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-secondary">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Đã đổi</p>
              <p className="text-xl font-bold">8 quà</p>
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-accent">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Điểm thưởng</p>
              <p className="text-xl font-bold">3,500</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Rewards */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Quà nổi bật</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredRewards.map((reward) => (
            <div
              key={reward.id}
              className="border-2 border-border bg-background p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 flex h-24 items-center justify-center border-2 border-border bg-muted text-4xl">
                {reward.image}
              </div>
              <h3 className="font-bold">{reward.name}</h3>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <Coins className="h-4 w-4" />
                  <span className="font-medium">{reward.coins}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Còn {reward.stock}
                </span>
              </div>
              <button className="mt-3 w-full border-2 border-border bg-primary py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
                Đổi ngay
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* How to earn */}
      <div className="border-2 border-border bg-muted/50 p-6">
        <h2 className="mb-4 text-xl font-bold">Cách kiếm xu</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-border bg-primary font-bold">
              1
            </div>
            <div>
              <p className="font-medium">Hoàn thành bài học</p>
              <p className="text-sm text-muted-foreground">+10 xu/bài</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-border bg-primary font-bold">
              2
            </div>
            <div>
              <p className="font-medium">Thắng thách đấu</p>
              <p className="text-sm text-muted-foreground">+50 xu/trận</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-border bg-primary font-bold">
              3
            </div>
            <div>
              <p className="font-medium">Streak hàng ngày</p>
              <p className="text-sm text-muted-foreground">+20 xu/ngày</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-border bg-primary font-bold">
              4
            </div>
            <div>
              <p className="font-medium">Mời bạn bè</p>
              <p className="text-sm text-muted-foreground">+100 xu/người</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
