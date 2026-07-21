import Image from "next/image";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";

const PORTRAIT_CANDIDATES = ["/images/designer-portrait.jpg", "/images/designer-portrait.png"];

function findPortrait(): string | null {
  for (const candidate of PORTRAIT_CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", candidate))) {
      return candidate;
    }
  }
  return null;
}

const STATS = [
  { value: "08", label: "Years in Practice" },
  { value: "120+", label: "Bespoke Commissions" },
  { value: "100%", label: "Made by Hand" },
];

export default function DesignerBio() {
  const portrait = findPortrait();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal shadow-sm">
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
              Est. 2016
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
            The Designer
          </p>
          <h2 className="mt-3 font-heading text-3xl leading-tight text-charcoal md:text-4xl">
            A single perfect line — that is the whole practice.
          </h2>
          <div className="mt-4 h-px w-10 bg-gold" />

          <p className="mt-6 font-body text-sm leading-relaxed text-charcoal/70">
            Egzona Abazi is a fashion designer known for elegant, handcrafted
            dresses that blend timeless silhouettes with modern detail. Every
            piece is drafted, cut, and finished in the atelier — never
            sub-contracted, never rushed.
          </p>
          <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/70">
            The result is a wardrobe you can keep for a lifetime: silhouettes
            that hold their shape, seams you can wear inside-out, fabrics that
            age the way they should.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-2xl text-gold-dark">{stat.value}</p>
                <p className="mt-1 font-body text-[0.6rem] uppercase tracking-[0.15em] text-charcoal/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="group mt-8 flex w-fit items-center gap-1 font-body text-xs uppercase tracking-widest text-charcoal transition-colors hover:text-gold"
          >
            Read Her Story
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
