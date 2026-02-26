import {
  LeaderboardIcon,
  ScheduleIcon,
  TournamentIcon,
} from "@/lib/constants/icons";
import { PERMISSIONS } from "@/lib/constants/permissions";
import type { NavTab } from "@/lib/nav";

export const NAV_TOURNAMENT: NavTab = {
  key: "tournament",
  href: "/tournament",
  icon: TournamentIcon,
  color: "preset02",
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
