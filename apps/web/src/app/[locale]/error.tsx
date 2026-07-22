"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <h1 className="font-heading text-3xl text-charcoal">{t("heading")}</h1>
      <p className="mt-4 font-body text-sm text-charcoal/70">{t("text")}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="border border-charcoal px-8 py-3 font-body text-xs uppercase tracking-widest text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
        >
          {t("retry")}
        </button>
        <Link
          href="/"
          className="border border-border px-8 py-3 text-center font-body text-xs uppercase tracking-widest text-charcoal transition-colors hover:border-charcoal"
        >
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
