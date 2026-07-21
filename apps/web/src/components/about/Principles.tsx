import { useTranslations } from "next-intl";

export default function Principles() {
  const t = useTranslations("About.principles");

  const principles = [
    { number: "01", title: t("item1Title"), description: t("item1Text") },
    { number: "02", title: t("item2Title"), description: t("item2Text") },
    { number: "03", title: t("item3Title"), description: t("item3Text") },
    { number: "04", title: t("item4Title"), description: t("item4Text") },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 text-center md:py-24">
      <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
        {t("eyebrow")}
      </p>
      <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl">{t("heading")}</h2>
      <div className="mx-auto mt-4 h-px w-10 bg-gold" />

      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 text-left sm:grid-cols-2">
        {principles.map((principle) => (
          <div key={principle.number} className="border-t border-border pt-6">
            <p className="font-heading text-xl text-gold-dark">{principle.number}</p>
            <h3 className="mt-2 font-heading text-xl text-charcoal">{principle.title}</h3>
            <p className="mt-2 font-body text-sm text-charcoal/60">{principle.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
