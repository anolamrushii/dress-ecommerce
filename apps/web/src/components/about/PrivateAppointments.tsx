import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PrivateAppointments() {
  const t = useTranslations("About.appointments");

  return (
    <section className="bg-charcoal py-16 md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 text-center">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-light">
          {t("eyebrow")}
        </p>
        <p className="mt-6 max-w-md font-body text-sm text-white/70">{t("text")}</p>
        <Link
          href="/contact"
          className="mt-8 border border-white/70 px-8 py-3 font-body text-xs uppercase tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-charcoal hover:shadow-lg sm:text-sm"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
