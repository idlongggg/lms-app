import Link from "next/link";
import { Logo } from "./logo";

const footerLinks = {
  product: {
    title: "Sản phẩm",
    links: [
      { label: "Tính năng", href: "#features" },
      { label: "Giải đấu", href: "#tournaments" },
      { label: "Bảng giá", href: "#pricing" },
    ],
  },
  company: {
    title: "Công ty",
    links: [
      { label: "Về chúng tôi", href: "#about" },
      { label: "Blog", href: "/blog" },
      { label: "Liên hệ", href: "/contact" },
    ],
  },
  legal: {
    title: "Pháp lý",
    links: [
      { label: "Điều khoản", href: "/terms" },
      { label: "Bảo mật", href: "/privacy" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Nền tảng học tập trực tuyến với phong cách độc đáo và trải nghiệm
              gamification thú vị.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="mb-3 font-bold text-sm font-bold uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t-2 border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LMS. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
