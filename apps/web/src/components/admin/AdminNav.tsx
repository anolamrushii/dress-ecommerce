"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin/dashboard", label: "Dresses" },
  { href: "/admin/collections", label: "Collections" },
];

export default function AdminNav({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="inline-flex rounded-full border border-gold-light/60 bg-ivory/60 p-1">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`rounded-full px-4 py-2 font-body text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-colors sm:px-5 ${
                active ? "bg-charcoal text-white" : "text-charcoal/60 hover:text-charcoal"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
      <button
        onClick={onLogout}
        className="font-body text-[0.7rem] font-medium uppercase tracking-[0.14em] text-charcoal/50 transition-colors hover:text-gold-dark"
      >
        Log out
      </button>
    </div>
  );
}
