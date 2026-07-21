"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

function useNavLinks() {
  const t = useTranslations("Header");
  return {
    left: [
      { href: "/", label: t("home") },
      { href: "/collections", label: t("collections") },
    ],
    right: [
      { href: "/about", label: t("about") },
      { href: "/contact", label: t("contact") },
    ],
  };
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className="font-body text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors hover:text-gold"
      style={isActive ? { color: "oklch(var(--color-gold))" } : undefined}
    >
      {label}
    </Link>
  );
}

function AdminIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 5h16" />
      <path d="M4 12h16" />
      <path d="M4 19h16" />
    </svg>
  );
}

function LanguageSwitcher() {
  const pathname = usePathname();

  // Admin isn't part of the localized route tree, so switching locale on an
  // admin path would 404 — hide the switcher there.
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="flex items-center gap-1 font-body text-[0.65rem] font-medium uppercase tracking-widest text-charcoal/60">
      <Link href={pathname} locale="en" className="transition-colors hover:text-gold">
        EN
      </Link>
      <span aria-hidden="true">/</span>
      <Link href={pathname} locale="sq" className="transition-colors hover:text-gold">
        SQ
      </Link>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { left: LEFT_LINKS, right: RIGHT_LINKS } = useNavLinks();
  const tHeader = useTranslations("Header");
  const tCommon = useTranslations("Common");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20">
        <button
          className="text-charcoal md:hidden"
          aria-label={tHeader("menu")}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon />
        </button>

        <nav className="hidden gap-10 md:flex">
          {LEFT_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <Link href="/" className="text-center">
          <div className="font-heading text-2xl leading-none tracking-tight text-charcoal md:text-3xl">
            {tCommon("brand")}
          </div>
          <div className="mt-1 font-body text-[0.55rem] uppercase tracking-[0.22em] text-muted-foreground">
            {tCommon("tagline")}
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {RIGHT_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <LanguageSwitcher />
          <NextLink
            href="/admin/login"
            aria-label={tHeader("admin")}
            className="text-charcoal transition-colors hover:text-gold"
          >
            <AdminIcon className="h-5 w-5" />
          </NextLink>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <NextLink href="/admin/login" aria-label={tHeader("admin")} className="text-charcoal">
            <AdminIcon className="h-5 w-5" />
          </NextLink>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-border px-6 py-6 md:hidden">
          {[...LEFT_LINKS, ...RIGHT_LINKS].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
