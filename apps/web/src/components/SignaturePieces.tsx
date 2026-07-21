import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DressCard from "@/components/DressCard";
import type { Dress } from "@/lib/types";

export default function SignaturePieces({ dresses }: { dresses: Dress[] }) {
  const t = useTranslations("SignaturePieces");

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 text-center md:py-24">
      <h2 className="font-heading text-3xl text-charcoal md:text-4xl">{t("heading")}</h2>
      <div className="mx-auto mt-4 h-px w-10 bg-gold" />
      <p className="mx-auto mt-4 max-w-md font-body text-sm text-charcoal/60">{t("subtext")}</p>

      {dresses.length > 0 ? (
        <div className="mt-12 grid grid-cols-2 gap-8 text-left md:grid-cols-4">
          {dresses.map((dress) => (
            <DressCard key={dress.id} dress={dress} />
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-12 max-w-2xl border border-border bg-white px-6 py-14 shadow-sm sm:px-14">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
            {t("comingSoon")}
          </p>
          <h3 className="mt-4 font-heading text-2xl text-charcoal">{t("comingSoonHeading")}</h3>
          <p className="mx-auto mt-4 max-w-md font-body text-sm text-charcoal/60">
            {t("comingSoonText")}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/collections"
              className="border border-gold px-6 py-3 text-center font-body text-xs uppercase tracking-widest text-gold-dark transition-colors hover:bg-gold hover:text-white"
            >
              {t("browseArchive")}
            </Link>
            <Link
              href="/contact"
              className="border border-border px-6 py-3 text-center font-body text-xs uppercase tracking-widest text-charcoal transition-colors hover:border-charcoal"
            >
              {t("requestPreview")}
            </Link>
          </div>
        </div>
      )}

      <div className="mt-12">
        <Link
          href="/collections"
          className="border border-gold px-8 py-3 font-body text-xs uppercase tracking-widest text-gold-dark transition-colors hover:bg-gold hover:text-white"
        >
          {t("exploreAll")}
        </Link>
      </div>
    </section>
  );
}
