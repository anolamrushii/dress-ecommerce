import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ScrollReveal";

export default function StatsStrip() {
  const t = useTranslations("Stats");
  const stats = [t("handmade"), t("limitedRuns"), t("fittings"), t("shipping")];

  return (
    <section className="border-b border-border bg-ivory">
      <ScrollReveal
        className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-6 text-center font-body text-[0.65rem] uppercase tracking-[0.15em] text-charcoal/70 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-3 sm:text-xs"
        y={16}
        stagger={0.08}
      >
        {stats.map((stat, i) => (
          <span
            key={stat}
            className={`flex w-full items-center justify-center gap-x-3 sm:w-auto sm:gap-x-5 ${
              i > 0 ? "border-t border-border pt-3 sm:border-t-0 sm:pt-0" : ""
            }`}
          >
            {i > 0 && <span aria-hidden="true" className="hidden h-px w-6 bg-border sm:block" />}
            <span>{stat}</span>
          </span>
        ))}
      </ScrollReveal>
    </section>
  );
}
