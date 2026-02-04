import { AnnouncementsIcon, EventsIcon, NewsIcon } from "@/lib/icons";
import type { NavTab } from "@/lib/nav";

export const NAV_NEWS: NavTab = {
  key: "news",
  href: "/news",
  icon: NewsIcon,
  color: "preset05",
  groups: [
    {
      items: [
        { key: "latestNews", href: "/news", icon: NewsIcon },
        {
          key: "announcements",
          href: "/news/announcements",
          icon: AnnouncementsIcon,
        },
        { key: "events", href: "/news/events", icon: EventsIcon },
      ],
    },
  ],
};
