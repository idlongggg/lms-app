/**
 * Mock Rewards Data
 * Based on database.md schema: Reward, RewardRedemption, UserInventory
 */

export type RewardType = 'DIGITAL' | 'PHYSICAL';
export type RedemptionStatus = 'PENDING' | 'FULFILLED';
export type InventoryStatus = 'ACTIVE' | 'APPLIED' | 'EXPIRED';

export interface Reward {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  cost: number;
  type: RewardType;
  category: 'avatar' | 'theme' | 'voucher' | 'item' | 'booster';
  isActive: boolean;
  stock: number | null; // Null = unlimited
  createdAt: string;
}

export interface RewardRedemption {
  id: string;
  userId: string;
  rewardId: string;
  status: RedemptionStatus;
  redeemedAt: string;
}

export interface UserInventory {
  id: string;
  userId: string;
  rewardId: string;
  status: InventoryStatus;
  equipped: boolean;
  acquiredAt: string;
  expiresAt: string | null;
}

// Rewards catalog
export const rewards: Reward[] = [
  // Avatars
  {
    id: 'reward-avatar-1',
    name: 'Avatar Siêu Nhân',
    description: 'Avatar đặc biệt hình siêu nhân',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=superhero',
    cost: 500,
    type: 'DIGITAL',
    category: 'avatar',
    isActive: true,
    stock: null,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'reward-avatar-2',
    name: 'Avatar Ninja',
    description: 'Avatar ninja bí ẩn',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ninja',
    cost: 800,
    type: 'DIGITAL',
    category: 'avatar',
    isActive: true,
    stock: null,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'reward-avatar-3',
    name: 'Avatar Robot',
    description: 'Avatar robot công nghệ cao',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=robot',
    cost: 1000,
    type: 'DIGITAL',
    category: 'avatar',
    isActive: true,
    stock: null,
    createdAt: '2024-01-01T00:00:00Z',
  },
  // Themes
  {
    id: 'reward-theme-1',
    name: 'Theme Vũ Trụ',
    description: 'Giao diện màu tối với hiệu ứng sao',
    imageUrl: 'https://placehold.co/200x200/1a1a2e/white?text=Space',
    cost: 1500,
    type: 'DIGITAL',
    category: 'theme',
    isActive: true,
    stock: null,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'reward-theme-2',
    name: 'Theme Đại Dương',
    description: 'Giao diện xanh dương mát mẻ',
    imageUrl: 'https://placehold.co/200x200/0077b6/white?text=Ocean',
    cost: 1500,
    type: 'DIGITAL',
    category: 'theme',
    isActive: true,
    stock: null,
    createdAt: '2024-01-01T00:00:00Z',
  },
  // Vouchers
  {
    id: 'reward-voucher-1',
    name: 'Giảm 50% phí Tournament',
    description: 'Giảm 50% phí tham gia giải đấu tiếp theo',
    imageUrl: 'https://placehold.co/200x200/e74c3c/white?text=50%25',
    cost: 2000,
    type: 'DIGITAL',
    category: 'voucher',
    isActive: true,
    stock: 100,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'reward-voucher-2',
    name: 'Miễn phí 1 Tournament',
    description: 'Miễn phí tham gia 1 giải đấu bất kỳ',
    imageUrl: 'https://placehold.co/200x200/27ae60/white?text=FREE',
    cost: 5000,
    type: 'DIGITAL',
    category: 'voucher',
    isActive: true,
    stock: 50,
    createdAt: '2024-01-01T00:00:00Z',
  },
  // Boosters
  {
    id: 'reward-booster-1',
    name: 'XP Booster 2x (7 ngày)',
    description: 'Nhân đôi XP nhận được trong 7 ngày',
    imageUrl: 'https://placehold.co/200x200/f39c12/white?text=2x+XP',
    cost: 3000,
    type: 'DIGITAL',
    category: 'booster',
    isActive: true,
    stock: null,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'reward-booster-2',
    name: 'Coin Booster 1.5x (3 ngày)',
    description: 'Tăng 50% coin nhận được trong 3 ngày',
    imageUrl: 'https://placehold.co/200x200/9b59b6/white?text=1.5x',
    cost: 1500,
    type: 'DIGITAL',
    category: 'booster',
    isActive: true,
    stock: null,
    createdAt: '2024-01-01T00:00:00Z',
  },
  // Physical items
  {
    id: 'reward-physical-1',
    name: 'Áo thun LMS',
    description: 'Áo thun in logo LMS - Size M/L/XL',
    imageUrl: 'https://placehold.co/200x200/333/white?text=T-Shirt',
    cost: 10000,
    type: 'PHYSICAL',
    category: 'item',
    isActive: true,
    stock: 20,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'reward-physical-2',
    name: 'Sticker Pack',
    description: 'Bộ sticker LMS (10 miếng)',
    imageUrl: 'https://placehold.co/200x200/e91e63/white?text=Stickers',
    cost: 500,
    type: 'PHYSICAL',
    category: 'item',
    isActive: true,
    stock: 100,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// User redemption history
export const redemptions: RewardRedemption[] = [
  {
    id: 'redemption-001',
    userId: 'user-student',
    rewardId: 'reward-avatar-1',
    status: 'FULFILLED',
    redeemedAt: '2024-06-15T00:00:00Z',
  },
  {
    id: 'redemption-002',
    userId: 'user-student',
    rewardId: 'reward-physical-2',
    status: 'PENDING',
    redeemedAt: '2026-01-20T00:00:00Z',
  },
];

// User inventory
export const userInventory: UserInventory[] = [
  {
    id: 'inventory-001',
    userId: 'user-student',
    rewardId: 'reward-avatar-1',
    status: 'ACTIVE',
    equipped: true,
    acquiredAt: '2024-06-15T00:00:00Z',
    expiresAt: null,
  },
  {
    id: 'inventory-002',
    userId: 'user-student',
    rewardId: 'reward-physical-2',
    status: 'ACTIVE',
    equipped: false,
    acquiredAt: '2026-01-20T00:00:00Z',
    expiresAt: null,
  },
];

// Coin transactions
export interface CoinTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'spent';
  source: 'quiz' | 'streak' | 'tournament' | 'achievement' | 'redemption' | 'bonus';
  description: string;
  createdAt: string;
}

export const coinTransactions: CoinTransaction[] = [
  {
    id: 'tx-001',
    userId: 'user-student',
    amount: 100,
    type: 'earned',
    source: 'quiz',
    description: 'Hoàn thành bài học "Số nguyên tố"',
    createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'tx-002',
    userId: 'user-student',
    amount: 50,
    type: 'earned',
    source: 'streak',
    description: 'Bonus streak 7 ngày',
    createdAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'tx-003',
    userId: 'user-student',
    amount: 200,
    type: 'earned',
    source: 'tournament',
    description: 'Hạng 3 - Toán Học Tuần 4',
    createdAt: '2026-01-27T15:00:00Z',
  },
  {
    id: 'tx-004',
    userId: 'user-student',
    amount: -500,
    type: 'spent',
    source: 'redemption',
    description: 'Đổi "Avatar Siêu Nhân"',
    createdAt: '2024-06-15T00:00:00Z',
  },
  {
    id: 'tx-005',
    userId: 'user-student',
    amount: 75,
    type: 'earned',
    source: 'quiz',
    description: 'Hoàn thành bài học "Ước và bội số"',
    createdAt: '2026-01-30T14:30:00Z',
  },
  {
    id: 'tx-006',
    userId: 'user-student',
    amount: 100,
    type: 'earned',
    source: 'achievement',
    description: 'Đạt huy hiệu "Siêng năng"',
    createdAt: '2026-01-28T00:00:00Z',
  },
];

// Helper functions
export function getRewardById(id: string): Reward | undefined {
  return rewards.find((r) => r.id === id);
}

export function getRewardsByCategory(category: Reward['category']): Reward[] {
  return rewards.filter((r) => r.category === category && r.isActive);
}

export function getActiveRewards(): Reward[] {
  return rewards.filter((r) => r.isActive);
}

export function getUserInventory(userId: string): (UserInventory & { reward: Reward })[] {
  return userInventory
    .filter((i) => i.userId === userId)
    .map((i) => ({
      ...i,
      reward: getRewardById(i.rewardId)!,
    }))
    .filter((i) => i.reward);
}

export function getUserRedemptions(userId: string): (RewardRedemption & { reward: Reward })[] {
  return redemptions
    .filter((r) => r.userId === userId)
    .map((r) => ({
      ...r,
      reward: getRewardById(r.rewardId)!,
    }))
    .filter((r) => r.reward);
}

export function getUserCoinTransactions(userId: string): CoinTransaction[] {
  return coinTransactions
    .filter((t) => t.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getUserCoinBalance(userId: string): number {
  return coinTransactions.filter((t) => t.userId === userId).reduce((sum, t) => sum + t.amount, 0);
}

export function getCoinStats(userId: string) {
  const transactions = getUserCoinTransactions(userId);
  const earned = transactions
    .filter((t) => t.type === 'earned')
    .reduce((sum, t) => sum + t.amount, 0);
  const spent = transactions
    .filter((t) => t.type === 'spent')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const bySource = {
    quiz: transactions
      .filter((t) => t.source === 'quiz' && t.type === 'earned')
      .reduce((sum, t) => sum + t.amount, 0),
    streak: transactions
      .filter((t) => t.source === 'streak' && t.type === 'earned')
      .reduce((sum, t) => sum + t.amount, 0),
    tournament: transactions
      .filter((t) => t.source === 'tournament' && t.type === 'earned')
      .reduce((sum, t) => sum + t.amount, 0),
    achievement: transactions
      .filter((t) => t.source === 'achievement' && t.type === 'earned')
      .reduce((sum, t) => sum + t.amount, 0),
  };

  return {
    balance: earned - spent,
    totalEarned: earned,
    totalSpent: spent,
    bySource,
  };
}

// Reward card for display
export interface RewardCard {
  id: string;
  name: string;
  description: string;
  image: string;
  cost: number;
  category: string;
  categoryLabel: string;
  type: RewardType;
  inStock: boolean;
  stock: number | null;
  owned: boolean;
}

const categoryLabels: Record<Reward['category'], string> = {
  avatar: 'Avatar',
  theme: 'Giao diện',
  voucher: 'Voucher',
  item: 'Vật phẩm',
  booster: 'Booster',
};

export function getRewardCards(userId: string): RewardCard[] {
  const inventory = getUserInventory(userId);

  return rewards
    .filter((r) => r.isActive)
    .map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      image: r.imageUrl || 'https://placehold.co/200x200/333/white?text=Reward',
      cost: r.cost,
      category: r.category,
      categoryLabel: categoryLabels[r.category],
      type: r.type,
      inStock: r.stock === null || r.stock > 0,
      stock: r.stock,
      owned: inventory.some((i) => i.rewardId === r.id),
    }));
}

// Redeemed items for display
export interface RedeemedItem {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  status: InventoryStatus;
  statusLabel: string;
  equipped: boolean;
  acquiredAt: string;
  expiresAt: string | null;
}

const statusLabels: Record<InventoryStatus, string> = {
  ACTIVE: 'Đang sử dụng',
  APPLIED: 'Đã áp dụng',
  EXPIRED: 'Đã hết hạn',
};

export function getRedeemedItems(userId: string): RedeemedItem[] {
  return getUserInventory(userId).map((i) => ({
    id: i.id,
    name: i.reward.name,
    description: i.reward.description,
    image: i.reward.imageUrl || 'https://placehold.co/200x200/333/white?text=Item',
    category: categoryLabels[i.reward.category],
    status: i.status,
    statusLabel: statusLabels[i.status],
    equipped: i.equipped,
    acquiredAt: i.acquiredAt,
    expiresAt: i.expiresAt,
  }));
}
