import {
  CommunityIcon,
  DiscussionsIcon,
  ForumIcon,
  QuestionBankIcon,
} from "@/lib/constants/icons";
import type { NavTab } from "@/lib/nav";
import { PERMISSIONS } from "@/lib/constants/permissions";

export const NAV_COMMUNITY: NavTab = {
  key: "community",
  href: "/community",
  icon: CommunityIcon,
  color: "preset04",
  access: [
    PERMISSIONS.LESSON_READ,
    PERMISSIONS.PROGRESS_READ_OWN,
    PERMISSIONS.PROGRESS_READ_CHILD,
  ],
  groups: [
    {
      items: [
        { key: "forum", href: "/community", icon: ForumIcon },
        {
          key: "questionBank",
          href: "/community/questions",
          icon: QuestionBankIcon,
        },
        {
          key: "discussions",
          href: "/community/discussions",
          icon: DiscussionsIcon,
        },
      ],
    },
  ],
};
