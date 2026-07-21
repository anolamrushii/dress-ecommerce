import { useTranslations } from "next-intl";

export default function StatsStrip() {
  const t = useTranslations("Stats");
  const stats = [t("handmade"), t("limitedRuns"), t("fittings"), t("shipping")];

  return (
    <section className="border-b border-border bg-ivory">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-4 px-6 py-6 text-center font-body text-[0.65rem] uppercase tracking-[0.15em] text-charcoal/70 sm:grid-cols-4 sm:text-xs">
        {stats.map((stat) => (
          <span key={stat}>{stat}</span>
        ))}
      </div>
    </section>
  );
}
