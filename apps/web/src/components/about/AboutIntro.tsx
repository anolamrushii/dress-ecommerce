import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const PORTRAIT_CANDIDATES = ["/images/designer-portrait.jpg", "/images/designer-portrait.png"];

function findPortrait(): string | null {
  for (const candidate of PORTRAIT_CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", candidate))) {
      return candidate;
    }
  }
  return null;
}

export default function AboutIntro() {
  const portrait = findPortrait();
  const t = useTranslations("About.intro");

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div className="order-2 flex flex-col justify-center md:order-1">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 font-heading text-4xl text-charcoal md:text-5xl">
            {t("heading")}
          </h1>
          <div className="mt-4 h-px w-10 bg-gold" />

          <p className="mt-6 font-body text-sm leading-relaxed text-charcoal/70">
            {t("paragraph1")}
          </p>
          <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/70">
            {t("paragraph2")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/collections"
              className="border border-gold px-6 py-3 text-center font-body text-xs uppercase tracking-widest text-gold-dark transition-colors hover:bg-gold hover:text-white"
            >
              {t("seeWork")}
            </Link>
            <Link
              href="/contact"
              className="border border-border px-6 py-3 text-center font-body text-xs uppercase tracking-widest text-charcoal transition-colors hover:border-charcoal"
            >
              {t("writeAtelier")}
            </Link>
          </div>
        </div>

        <div className="relative order-1 aspect-[4/5] w-full overflow-hidden bg-charcoal shadow-sm md:order-2">
          {portrait ? (
            <Image
              src={portrait}
              alt="Egzona Abazi"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, oklch(var(--color-charcoal)) 0%, oklch(var(--color-gold-dark)) 100%)",
              }}
            />
          )}
          <div className="absolute bottom-0 left-0 border border-gold-light bg-white px-5 py-3">
            <p className="font-body text-[0.6rem] uppercase tracking-[0.2em] text-charcoal/60">
              {t("inTheAtelier")}
            </p>
            <p className="mt-1 font-heading text-lg text-charcoal">
              {t("prishtina")}, {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
