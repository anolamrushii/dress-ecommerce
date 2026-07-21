import { useTranslations } from "next-intl";

export default function Manifesto() {
  const t = useTranslations("About.manifesto");

  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
          {t("eyebrow")}
        </p>
        <blockquote className="mt-6 font-heading text-2xl leading-snug text-charcoal md:text-3xl">
          {t("quote")}
        </blockquote>
        <p className="mt-6 font-body text-xs uppercase tracking-[0.15em] text-charcoal/50">
          {t("attribution")}
        </p>
      </div>
    </section>
  );
}
