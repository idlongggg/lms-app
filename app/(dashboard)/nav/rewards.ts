import { CoinsIcon, RedeemedIcon, ShopIcon } from "@/lib/icons";
import type { NavTab } from "@/lib/nav";

export const NAV_REWARDS: NavTab = {
  key: "rewards",
  href: "/rewards",
  icon: ShopIcon,
  color: "preset06",
  hideInHeader: true,
  groups: [
    {
      items: [
        { key: "shop", href: "/rewards", icon: ShopIcon },
        { key: "myCoins", href: "/rewards/coins", icon: CoinsIcon },
        { key: "redeemed", href: "/rewards/redeemed", icon: RedeemedIcon },
      ],
    },
  ],
};
