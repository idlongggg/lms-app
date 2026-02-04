/**
 * Mock News Data
 * @description News, Announcements, and Events mock data
 * @see docs/blueprint/architecture/database.md
 */

import { tenants } from "./users";

export type NewsCategory = "EVENT" | "FEATURE" | "COURSE" | "PROMOTION";
export type NewsStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type AnnouncementType = "WARNING" | "INFO" | "SUCCESS";
export type EventType = "COMPETITION" | "WORKSHOP" | "SPECIAL";
export type EventStatus =
  | "DRAFT"
  | "OPEN"
  | "CLOSED"
  | "COMPLETED"
  | "CANCELLED";

export interface News {
  id: string;
  tenantId: string;
  authorId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnailUrl: string | null;
  category: NewsCategory;
  isPinned: boolean;
  status: NewsStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  tenantId: string;
  title: string;
  content: string;
  type: AnnouncementType;
  priority: number;
  isPinned: boolean;
  startsAt: string;
  endsAt: string | null;
  createdAt: string;
}

export interface AnnouncementRead {
  id: string;
  userId: string;
  announcementId: string;
  readAt: string;
}

export interface Event {
  id: string;
  tenantId: string;
  createdBy: string;
  title: string;
  description: string | null;
  bannerUrl: string | null;
  type: EventType;
  maxParticipants: number | null;
  location: string | null;
  startsAt: string;
  endsAt: string;
  registrationDeadline: string | null;
  status: EventStatus;
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  status: "REGISTERED" | "ATTENDED" | "CANCELLED";
  registeredAt: string;
}

export const news: News[] = [
  {
    id: "news-001",
    tenantId: tenants.school.id,
    authorId: "user-tenant-admin",
    title: "Ra mắt tính năng Giải đấu mới",
    slug: "ra-mat-tinh-nang-giai-dau-moi",
    content:
      "Chúng tôi vui mừng giới thiệu hệ thống giải đấu hoàn toàn mới với nhiều tính năng hấp dẫn...",
    excerpt:
      "Hệ thống giải đấu mới với realtime leaderboard và nhiều phần thưởng hấp dẫn.",
    thumbnailUrl:
      "https://placehold.co/800x400/3498db/white?text=Tournament+Feature",
    category: "FEATURE",
    isPinned: true,
    status: "PUBLISHED",
    publishedAt: "2026-02-01T00:00:00Z",
    createdAt: "2026-01-30T00:00:00Z",
    updatedAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "news-002",
    tenantId: tenants.school.id,
    authorId: "user-tenant-admin",
    title: "Khóa học Tiếng Anh nâng cao đã có mặt",
    slug: "khoa-hoc-tieng-anh-nang-cao",
    content:
      "Bổ sung thêm 50 bài học Tiếng Anh nâng cao dành cho học sinh lớp 7-9...",
    excerpt: "50 bài học mới với video và bài tập tương tác.",
    thumbnailUrl:
      "https://placehold.co/800x400/2ecc71/white?text=English+Course",
    category: "COURSE",
    isPinned: false,
    status: "PUBLISHED",
    publishedAt: "2026-01-28T00:00:00Z",
    createdAt: "2026-01-25T00:00:00Z",
    updatedAt: "2026-01-28T00:00:00Z",
  },
  {
    id: "news-003",
    tenantId: tenants.school.id,
    authorId: "user-tenant-admin",
    title: "Giải vô địch Toán tháng 2 sắp diễn ra",
    slug: "giai-vo-dich-toan-thang-2",
    content:
      "Đăng ký ngay giải vô địch Toán học tháng 2 với tổng giải thưởng 10,000 xu...",
    excerpt: "Giải thưởng lên đến 10,000 xu. Đăng ký trước 14/02.",
    thumbnailUrl:
      "https://placehold.co/800x400/e74c3c/white?text=Math+Championship",
    category: "EVENT",
    isPinned: false,
    status: "PUBLISHED",
    publishedAt: "2026-02-02T00:00:00Z",
    createdAt: "2026-02-01T00:00:00Z",
    updatedAt: "2026-02-02T00:00:00Z",
  },
  {
    id: "news-004",
    tenantId: tenants.school.id,
    authorId: "user-tenant-admin",
    title: "Khuyến mãi Tết: X2 XP",
    slug: "khuyen-mai-tet-x2-xp",
    content:
      "Từ ngày 10-17/02/2026, tất cả hoạt động học tập sẽ nhận được gấp đôi XP...",
    excerpt: "Nhân đôi XP trong tuần Tết Nguyên Đán.",
    thumbnailUrl: "https://placehold.co/800x400/f39c12/white?text=Tet+Promo",
    category: "PROMOTION",
    isPinned: false,
    status: "PUBLISHED",
    publishedAt: "2026-02-01T00:00:00Z",
    createdAt: "2026-01-30T00:00:00Z",
    updatedAt: "2026-02-01T00:00:00Z",
  },
];

export const announcements: Announcement[] = [
  {
    id: "announce-001",
    tenantId: tenants.school.id,
    title: "Bảo trì hệ thống ngày 05/02",
    content:
      "Hệ thống sẽ tạm ngưng hoạt động từ 2:00 - 4:00 sáng ngày 05/02/2026 để nâng cấp server.",
    type: "WARNING",
    priority: 1,
    isPinned: true,
    startsAt: "2026-02-03T00:00:00Z",
    endsAt: "2026-02-05T04:00:00Z",
    createdAt: "2026-02-02T00:00:00Z",
  },
  {
    id: "announce-002",
    tenantId: tenants.school.id,
    title: "Chúc mừng Top 10 tháng 1",
    content:
      "Xin chúc mừng 10 học sinh có thành tích xuất sắc nhất trong tháng 1/2026!",
    type: "SUCCESS",
    priority: 2,
    isPinned: false,
    startsAt: "2026-02-01T00:00:00Z",
    endsAt: "2026-02-07T00:00:00Z",
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "announce-003",
    tenantId: tenants.school.id,
    title: "Lịch nghỉ Tết Nguyên Đán",
    content:
      "Hệ thống vẫn hoạt động bình thường trong dịp Tết. Chúc các bạn một năm mới an khang!",
    type: "INFO",
    priority: 3,
    isPinned: false,
    startsAt: "2026-02-01T00:00:00Z",
    endsAt: "2026-02-20T00:00:00Z",
    createdAt: "2026-01-28T00:00:00Z",
  },
];

export const announcementReads: AnnouncementRead[] = [
  {
    id: "read-001",
    userId: "user-student",
    announcementId: "announce-002",
    readAt: "2026-02-01T10:00:00Z",
  },
];

export const events: Event[] = [
  {
    id: "event-001",
    tenantId: tenants.school.id,
    createdBy: "user-tenant-admin",
    title: "Workshop: Học Toán hiệu quả",
    description:
      "Hướng dẫn phương pháp học Toán hiệu quả cùng thầy giáo Nguyễn Văn A.",
    bannerUrl: "https://placehold.co/800x400/9b59b6/white?text=Math+Workshop",
    type: "WORKSHOP",
    maxParticipants: 50,
    location: "Online - Zoom",
    startsAt: "2026-02-10T14:00:00Z",
    endsAt: "2026-02-10T16:00:00Z",
    registrationDeadline: "2026-02-09T23:59:59Z",
    status: "OPEN",
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "event-002",
    tenantId: tenants.school.id,
    createdBy: "user-tenant-admin",
    title: "Giải vô địch Toán tháng 2",
    description:
      "Giải đấu Toán học quy mô lớn nhất tháng 2 với tổng giải thưởng 10,000 xu.",
    bannerUrl:
      "https://placehold.co/800x400/e74c3c/white?text=Math+Championship",
    type: "COMPETITION",
    maxParticipants: 200,
    location: "Online",
    startsAt: "2026-02-15T14:00:00Z",
    endsAt: "2026-02-15T17:00:00Z",
    registrationDeadline: "2026-02-14T23:59:59Z",
    status: "OPEN",
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "event-003",
    tenantId: tenants.school.id,
    createdBy: "user-tenant-admin",
    title: "Trao giải Top 10 tháng 1",
    description: "Buổi lễ vinh danh 10 học sinh xuất sắc nhất tháng 1/2026.",
    bannerUrl: "https://placehold.co/800x400/f39c12/white?text=Award+Ceremony",
    type: "SPECIAL",
    maxParticipants: null,
    location: "Online - YouTube Live",
    startsAt: "2026-02-05T19:00:00Z",
    endsAt: "2026-02-05T20:00:00Z",
    registrationDeadline: null,
    status: "OPEN",
    createdAt: "2026-01-30T00:00:00Z",
  },
];

export const eventRegistrations: EventRegistration[] = [
  {
    id: "reg-001",
    eventId: "event-001",
    userId: "user-student",
    status: "REGISTERED",
    registeredAt: "2026-02-02T10:00:00Z",
  },
];

export function getNewsById(id: string): News | undefined {
  return news.find((n) => n.id === id);
}

export function getNewsBySlug(slug: string): News | undefined {
  return news.find((n) => n.slug === slug);
}

const sortByPinnedThenDate = (a: News, b: News) => {
  if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
  return (
    new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
  );
};

export function getPublishedNews(): News[] {
  return news
    .filter((n) => n.status === "PUBLISHED")
    .sort(sortByPinnedThenDate);
}

export function getNewsByCategory(category: NewsCategory): News[] {
  return getPublishedNews().filter((n) => n.category === category);
}

const sortByPinnedThenPriority = (a: Announcement, b: Announcement) => {
  if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
  return a.priority - b.priority;
};

export function getActiveAnnouncements(): Announcement[] {
  const now = new Date();
  return announcements
    .filter((a) => {
      const starts = new Date(a.startsAt);
      const ends = a.endsAt ? new Date(a.endsAt) : null;
      return starts <= now && (!ends || ends >= now);
    })
    .sort(sortByPinnedThenPriority);
}

export function isAnnouncementRead(
  userId: string,
  announcementId: string,
): boolean {
  return announcementReads.some(
    (r) => r.userId === userId && r.announcementId === announcementId,
  );
}

export function getUnreadAnnouncementsCount(userId: string): number {
  const active = getActiveAnnouncements();
  return active.filter((a) => !isAnnouncementRead(userId, a.id)).length;
}

export function getEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}

export function getUpcomingEvents(): Event[] {
  const now = new Date();
  return events
    .filter((e) => e.status === "OPEN" && new Date(e.startsAt) > now)
    .sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
}

export function isUserRegisteredForEvent(
  userId: string,
  eventId: string,
): boolean {
  return eventRegistrations.some(
    (r) =>
      r.userId === userId && r.eventId === eventId && r.status !== "CANCELLED",
  );
}

export function getEventRegistrationCount(eventId: string): number {
  return eventRegistrations.filter(
    (r) => r.eventId === eventId && r.status !== "CANCELLED",
  ).length;
}

export function getUserEvents(
  userId: string,
): (EventRegistration & { event: Event })[] {
  return eventRegistrations
    .filter((r) => r.userId === userId)
    .map((r) => ({
      ...r,
      event: getEventById(r.eventId)!,
    }))
    .filter((r) => r.event);
}

export interface NewsCard {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  category: NewsCategory;
  categoryLabel: string;
  isPinned: boolean;
  publishedAt: string;
  slug: string;
}

const categoryLabels: Record<NewsCategory, string> = {
  EVENT: "Sự kiện",
  FEATURE: "Tính năng",
  COURSE: "Khóa học",
  PROMOTION: "Khuyến mãi",
};

export function getNewsCards(): NewsCard[] {
  return getPublishedNews().map((n) => ({
    id: n.id,
    title: n.title,
    excerpt: n.excerpt,
    thumbnail:
      n.thumbnailUrl || "https://placehold.co/800x400/333/white?text=News",
    category: n.category,
    categoryLabel: categoryLabels[n.category],
    isPinned: n.isPinned,
    publishedAt: n.publishedAt!,
    slug: n.slug,
  }));
}

export interface AnnouncementCard {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  typeLabel: string;
  isPinned: boolean;
  isRead: boolean;
  startsAt: string;
}

const typeLabels: Record<AnnouncementType, string> = {
  WARNING: "Cảnh báo",
  INFO: "Thông tin",
  SUCCESS: "Thành công",
};

export function getAnnouncementCards(userId: string): AnnouncementCard[] {
  return getActiveAnnouncements().map((a) => ({
    id: a.id,
    title: a.title,
    content: a.content,
    type: a.type,
    typeLabel: typeLabels[a.type],
    isPinned: a.isPinned,
    isRead: isAnnouncementRead(userId, a.id),
    startsAt: a.startsAt,
  }));
}

export interface EventCard {
  id: string;
  title: string;
  description: string;
  banner: string;
  type: EventType;
  typeLabel: string;
  location: string | null;
  startsAt: string;
  endsAt: string;
  registrationDeadline: string | null;
  participants: number;
  maxParticipants: number | null;
  isRegistered: boolean;
  canRegister: boolean;
}

const eventTypeLabels: Record<EventType, string> = {
  COMPETITION: "Thi đấu",
  WORKSHOP: "Workshop",
  SPECIAL: "Đặc biệt",
};

export function getEventCards(userId: string): EventCard[] {
  return getUpcomingEvents().map((e) => {
    const now = new Date();
    const deadline = e.registrationDeadline
      ? new Date(e.registrationDeadline)
      : null;
    const registrationCount = getEventRegistrationCount(e.id);
    const isRegistered = isUserRegisteredForEvent(userId, e.id);
    const isFull =
      e.maxParticipants !== null && registrationCount >= e.maxParticipants;
    const isPastDeadline = deadline !== null && deadline < now;

    return {
      id: e.id,
      title: e.title,
      description: e.description || "",
      banner:
        e.bannerUrl || "https://placehold.co/800x400/333/white?text=Event",
      type: e.type,
      typeLabel: eventTypeLabels[e.type],
      location: e.location,
      startsAt: e.startsAt,
      endsAt: e.endsAt,
      registrationDeadline: e.registrationDeadline,
      participants: registrationCount,
      maxParticipants: e.maxParticipants,
      isRegistered,
      canRegister: !isRegistered && !isFull && !isPastDeadline,
    };
  });
}
