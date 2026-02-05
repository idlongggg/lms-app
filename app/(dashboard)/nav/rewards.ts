import { CoinsIcon, RedeemedIcon, ShopIcon } from "@/lib/constants/icons";
import type { NavTab } from "@/lib/nav";

export const NAV_REWARDS: NavTab = {
  key: "rewards",
  href: "/rewards",
  icon: ShopIcon,
  color: "preset02",
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
