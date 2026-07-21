import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";
import MagneticLink from "@/components/MagneticLink";
import ScrollReveal from "@/components/ScrollReveal";

const PORTRAIT_CANDIDATES = ["/images/designer-portrait.jpg", "/images/designer-portrait.png"];

function findPortrait(): string | null {
  for (const candidate of PORTRAIT_CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", candidate))) {
      return candidate;
    }
  }
  return null;
}

export default function DesignerBio() {
  const portrait = findPortrait();
  const t = useTranslations("DesignerBio");

  const stats = [
    { value: "08", label: t("statYears") },
    { value: "120+", label: t("statCommissions") },
    { value: "100%", label: t("statHandmade") },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <ScrollReveal y={40} className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal shadow-sm">
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
          <div className="absolute bottom-0 right-0 border border-gold-light bg-white px-6 py-4 text-center">
            <p className="font-heading text-xl text-charcoal">EA</p>
            <p className="mt-1 font-body text-[0.6rem] uppercase tracking-[0.2em] text-charcoal/60">
              {t("estSince")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal y={40} delay={0.15} className="flex flex-col justify-center">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-heading text-3xl leading-tight text-charcoal md:text-4xl">
            {t("heading")}
          </h2>
          <div className="mt-4 h-px w-10 bg-gold" />

          <p className="mt-6 font-body text-sm leading-relaxed text-charcoal/70">
            {t("paragraph1")}
          </p>
          <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/70">
            {t("paragraph2")}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-2xl text-gold-dark">{stat.value}</p>
                <p className="mt-1 font-body text-[0.6rem] uppercase tracking-[0.15em] text-charcoal/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <MagneticLink
            href="/about"
            className="group mt-8 flex w-fit items-center gap-1 font-body text-xs uppercase tracking-widest text-charcoal transition-colors hover:text-gold"
          >
            {t("readHerStory")}
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </MagneticLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
