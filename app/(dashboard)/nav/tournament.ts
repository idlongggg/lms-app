import { LeaderboardIcon, ScheduleIcon, TournamentIcon } from "@/lib/icons";
import type { NavTab } from "@/lib/nav";
import { PERMISSIONS } from "@/lib/permissions";

export const NAV_TOURNAMENT: NavTab = {
  key: "tournament",
  href: "/tournament",
  icon: TournamentIcon,
  color: "preset03",
  access: [PERMISSIONS.TOURNAMENT_READ, PERMISSIONS.TOURNAMENT_JOIN],
  groups: [
    {
      items: [
        { key: "arena", href: "/tournament", icon: TournamentIcon },
        { key: "schedule", href: "/tournament/schedule", icon: ScheduleIcon },
        {
          key: "leaderboard",
          href: "/tournament/leaderboard",
          icon: LeaderboardIcon,
        },
      ],
    },
  ],
};
