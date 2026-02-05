import { ProfileIcon, SettingsIcon } from "@/lib/constants/icons";
import type { NavTab } from "@/lib/nav";

export const NAV_PROFILE: NavTab = {
  key: "profile",
  href: "/profile",
  icon: ProfileIcon,
  color: "preset01",
  hideInHeader: true,
  groups: [
    {
      items: [
        { key: "profile", href: "/profile", icon: ProfileIcon },
        { key: "settings", href: "/profile/settings", icon: SettingsIcon },
      ],
    },
  ],
};
