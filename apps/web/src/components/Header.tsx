"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20">
        <button
          className="text-charcoal md:hidden"
          aria-label="Menu"
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

        <Link href="/admin/login" aria-label="Admin" className="text-charcoal md:hidden">
          <AdminIcon className="h-5 w-5" />
        </Link>
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
