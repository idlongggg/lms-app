import { CoursesIcon, LearningIcon } from "@/lib/icons";
import type { NavTab } from "@/lib/nav";
import { PERMISSIONS } from "@/lib/permissions";

export const NAV_LEARNING: NavTab = {
  key: "learning",
  href: "/learning",
  icon: LearningIcon,
  color: "preset02",
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
