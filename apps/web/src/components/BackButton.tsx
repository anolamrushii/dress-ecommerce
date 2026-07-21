"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";

const ARROW = (
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
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const CLASSNAME =
  "inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.14em] text-charcoal/60 transition-colors hover:text-gold-dark";

export default function BackButton({
  href,
  label,
}: {
  /** When set, navigates to this path instead of going back in browser history. */
  href?: string;
  label?: string;
}) {
  const router = useRouter();
  const t = useTranslations("Common");
  const resolvedLabel = label ?? t("back");

  if (href) {
    return (
      <Link href={href} className={CLASSNAME}>
        {ARROW}
        {resolvedLabel}
      </Link>
    );
  }

  return (
    <button onClick={() => router.back()} className={CLASSNAME}>
      {ARROW}
      {resolvedLabel}
    </button>
  );
}
