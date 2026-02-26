import { CoursesIcon, LearningIcon } from "@/lib/constants/icons";
import { PERMISSIONS } from "@/lib/constants/permissions";
import type { NavTab } from "@/lib/nav";

export const NAV_LEARNING: NavTab = {
  key: "learning",
  href: "/learning",
  icon: LearningIcon,
  color: "preset01",
  access: [
    PERMISSIONS.LESSON_READ,
    PERMISSIONS.PROGRESS_READ,
    PERMISSIONS.PROGRESS_READ_OWN,
    PERMISSIONS.PROGRESS_READ_CHILD,
  ],
  groups: [
    {
      items: [
        { key: "learning", href: "/learning", icon: LearningIcon },
        { key: "allCourses", href: "/learning/courses", icon: CoursesIcon },
      ],
    },
  ],
};
