"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import MagneticLink from "@/components/MagneticLink";
import { gsap } from "@/lib/gsap";

export default function HeroContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Hero");
  const tCommon = useTranslations("Common");

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-hero-item]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.2 },
      );
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative flex flex-1 flex-col justify-between px-6 pb-10 pt-8 md:px-12 md:py-10">
      <div
        data-hero-item
        className="flex items-start justify-center font-body text-[0.65rem] uppercase tracking-[0.2em] text-white/70 md:justify-between"
      >
        <span>{t("edition")}</span>
        <span className="hidden md:inline">{t("locations")}</span>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center px-2 text-center">
        <span data-hero-item className="font-body text-xs uppercase tracking-[0.25em] text-white/80">
          {tCommon("brand")}
        </span>
        <h1 data-hero-item className="mt-4 font-heading text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl">
          {t("headline")}
        </h1>
        <p data-hero-item className="mt-5 max-w-md font-body text-sm text-white/80 sm:max-w-xl sm:text-base">
          {t("subtext")}
        </p>

        <div data-hero-item className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <MagneticLink
            href="/collections"
            className="border border-white/70 px-8 py-3 text-center font-body text-xs uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-charcoal sm:text-sm"
          >
            {t("shopCollection")}
          </MagneticLink>
          <MagneticLink
            href="/about"
            className="px-8 py-3 text-center font-body text-xs uppercase tracking-widest text-white/90 transition-colors hover:text-gold-light sm:text-sm"
          >
            {t("theAtelier")}
          </MagneticLink>
        </div>
      </div>

      <div data-hero-item className="flex flex-col items-center gap-2 text-white/60">
        <span className="font-body text-[0.6rem] uppercase tracking-[0.3em]">{t("scroll")}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 animate-bounce"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
