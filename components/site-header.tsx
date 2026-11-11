"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageSwitcher, useLanguage } from "./language-provider";
import { DISCORD_URL } from "@/lib/links";

const navCopy = {
  mn: [
    { href: "/#catalog", label: "Item" },
    { href: "/heroes", label: "Hero" },
    { href: "/counter", label: "Counter" },
    { href: "/pro", label: "Pro" },
    { href: "/crosshair", label: "Crosshair" },
    { href: "/guide", label: "Гарын авлага" },
  ],
  en: [
    { href: "/#catalog", label: "Items" },
    { href: "/heroes", label: "Heroes" },
    { href: "/counter", label: "Counter" },
    { href: "/pro", label: "Pro" },
    { href: "/crosshair", label: "Crosshair" },
    { href: "/guide", label: "Guide" },
  ],
};

export function SiteHeader() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const links = navCopy[language].map((link) => ({
    ...link,
    current: !link.href.includes("#") && (pathname === link.href || pathname.startsWith(`${link.href}/`)),
  }));

  return (
    <header className="site-header" data-no-translate>
      <div className="site-header-inner">
        <a className="brand" href="/" aria-label="Deadlock Mongolia">
          <span className="brand-mark" aria-hidden="true">
            DL
          </span>
          <span className="brand-text">
            <strong>Deadlock</strong>
            <small>Mongolia</small>
          </span>
        </a>

        <nav className="site-nav" aria-label={language === "en" ? "Main" : "Үндсэн цэс"}>
          {links.map((link) => (
            <a key={link.href} href={link.href} aria-current={link.current ? "page" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header-actions">
          <AccountButton />
          <LanguageSwitcher />
          <a
            className="header-discord"
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordIcon />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </header>
  );
}

type SessionInfo = { loggedIn: boolean; name?: string; avatar?: string | null };

/** Steam sign-in / avatar link. Asks /api/auth/session once per page load. */
function AccountButton() {
  const { language } = useLanguage();
  const [session, setSession] = useState<SessionInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/session", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { loggedIn: false }))
      .then((data: SessionInfo) => {
        if (!cancelled) setSession(data);
      })
      .catch(() => {
        if (!cancelled) setSession({ loggedIn: false });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!session) return <span className="header-account placeholder" aria-hidden="true" />;

  if (session.loggedIn) {
    return (
      <a className="header-account" href="/me" title={session.name}>
        {session.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.avatar} alt="" />
        ) : (
          <span className="header-account-initial">{session.name?.slice(0, 1) ?? "?"}</span>
        )}
        <span className="header-account-label">{language === "en" ? "My profile" : "Профайл"}</span>
      </a>
    );
  }

  return (
    <a className="header-account login" href="/me">
      <span className="header-account-label">{language === "en" ? "Sign in" : "Нэвтрэх"}</span>
    </a>
  );
}

export function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
      <path
        fill="currentColor"
        d="M20.3 4.4A19.6 19.6 0 0 0 15.4 3l-.6 1.3a18.2 18.2 0 0 0-5.6 0L8.6 3a19.5 19.5 0 0 0-4.9 1.5C.6 9.1-.3 13.7.1 18.2a19.8 19.8 0 0 0 6 3l1.3-2a12.8 12.8 0 0 1-2-1l.5-.4a14 14 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2a19.7 19.7 0 0 0 6-3c.5-5.2-.9-9.8-3.6-13.8ZM8 15.5c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.7 8 10.7s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Z"
      />
    </svg>
  );
}
