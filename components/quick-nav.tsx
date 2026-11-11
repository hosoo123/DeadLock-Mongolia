"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "./language-provider";

const sections = {
  mn: [
    { href: "/#catalog", label: "Item", icon: "01" },
    { href: "/heroes", label: "Hero", icon: "02" },
    { href: "/counter", label: "Counter", icon: "03" },
    { href: "/pro", label: "Pro", icon: "04" },
    { href: "/crosshair", label: "Crosshair", icon: "05" },
  ],
  en: [
    { href: "/#catalog", label: "Items", icon: "01" },
    { href: "/heroes", label: "Heroes", icon: "02" },
    { href: "/counter", label: "Counter", icon: "03" },
    { href: "/pro", label: "Pro", icon: "04" },
    { href: "/crosshair", label: "Crosshair", icon: "05" },
  ],
};

// Mobile-only bottom bar (hidden on desktop, where the header nav is visible).
export function QuickNav() {
  const { language } = useLanguage();
  const pathname = usePathname();
  return (
    <nav className="quick-nav" aria-label={language === "en" ? "Sections" : "Хуудасны хэсгүүд"} data-no-translate>
      {sections[language].map((section) => (
        <a
          className="quick-nav-link"
          href={section.href}
          key={section.href}
          aria-current={pathname === section.href || pathname.startsWith(`${section.href}/`) ? "page" : undefined}
        >
          <span className="quick-nav-icon" aria-hidden="true">
            {section.icon}
          </span>
          <span>{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
