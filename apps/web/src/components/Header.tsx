"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialLinks from "./SocialLinks";

const LEFT_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
];

const RIGHT_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`font-body text-xs uppercase tracking-[0.18em] transition-colors hover:text-gold ${
        isActive ? "font-semibold" : "font-medium text-charcoal"
      }`}
      style={isActive ? { color: "oklch(58% 0.16 71)" } : undefined}
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

function CloseIcon() {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const MOBILE_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

  function closeMenu() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20">
        <button
          className={`relative z-[60] -m-2 p-2 text-charcoal transition-opacity duration-300 md:hidden ${
            menuOpen ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
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
            Egzona Abazi
          </div>
          <div className="mt-1 font-body text-[0.55rem] uppercase tracking-[0.22em] text-muted-foreground">
            Fashion Designer
          </div>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {RIGHT_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <Link
            href="/admin/login"
            aria-label="Admin"
            className="text-charcoal transition-colors hover:text-gold"
          >
            <AdminIcon className="h-5 w-5" />
          </Link>
        </div>

        <Link href="/admin/login" aria-label="Admin" className="-m-2 p-2 text-charcoal md:hidden">
          <AdminIcon className="h-5 w-5" />
        </Link>
      </div>
      </header>

      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory transition-opacity duration-500 ease-in-out md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
        {...(!menuOpen ? { inert: "" } : {})}
      >
        <button
          className="absolute right-6 top-5 -m-2 p-2 text-charcoal transition-transform duration-300 hover:rotate-90"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          <CloseIcon />
        </button>

        <span
          className={`font-body text-xs uppercase tracking-[0.3em] text-charcoal/50 transition-all duration-500 ease-out ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionDelay: menuOpen ? "80ms" : "0ms" }}
        >
          Egzona Abazi
        </span>

        <nav className="mt-8 flex w-64 flex-col divide-y divide-border">
          {MOBILE_LINKS.map((link, i) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={isActive ? "page" : undefined}
                className={`group flex items-center justify-center gap-3 py-4 font-heading text-2xl transition-all duration-500 ease-out hover:text-gold ${
                  isActive ? "font-semibold" : "text-charcoal"
                } ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                style={{
                  transitionDelay: menuOpen ? `${160 + i * 80}ms` : "0ms",
                  color: isActive ? "oklch(58% 0.16 71)" : undefined,
                }}
              >
                <span
                  className="font-body text-[0.6rem] tracking-widest transition-colors group-hover:text-gold"
                  style={{ color: isActive ? "oklch(58% 0.16 71 / 0.6)" : "oklch(var(--color-charcoal) / 0.35)" }}
                >
                  0{i + 1}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          onClick={closeMenu}
          className={`mt-9 border border-charcoal px-8 py-3 text-center font-body text-xs uppercase tracking-[0.2em] text-charcoal transition-all duration-500 ease-out hover:bg-charcoal hover:text-ivory ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{ transitionDelay: menuOpen ? "480ms" : "0ms" }}
        >
          Book a Private Fitting
        </Link>

        <SocialLinks
          className={`mt-10 flex items-center gap-6 transition-all duration-500 ease-out ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          iconClassName="text-charcoal/60 transition-colors hover:text-gold"
        />
      </div>
    </>
  );
}
