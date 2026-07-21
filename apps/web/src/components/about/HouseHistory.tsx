import { useTranslations } from "next-intl";

export default function HouseHistory() {
  const t = useTranslations("About.house");

  const milestones = [
    { year: "2012", title: t("m1Title"), description: t("m1Text") },
    { year: "2016", title: t("m2Title"), description: t("m2Text") },
    { year: "2019", title: t("m3Title"), description: t("m3Text") },
    { year: "2022", title: t("m4Title"), description: t("m4Text") },
    { year: t("m5Year"), title: t("m5Title"), description: t("m5Text") },
  ];

  return (
    <section className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
      <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
        {t("eyebrow")}
      </p>
      <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl">{t("heading")}</h2>
      <div className="mx-auto mt-4 h-px w-10 bg-gold" />

      <div className="mt-12 text-left">
        {milestones.map((milestone) => (
          <div
            key={milestone.year}
            className="grid grid-cols-1 gap-2 border-t border-border py-6 sm:grid-cols-[7rem_1fr] sm:gap-6"
          >
            <p className="font-heading text-2xl text-gold-dark">{milestone.year}</p>
            <div>
              <h3 className="font-heading text-lg text-charcoal">{milestone.title}</h3>
              <p className="mt-1 font-body text-sm text-charcoal/60">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
