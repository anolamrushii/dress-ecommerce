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

export default function AboutIntro() {
  const portrait = findPortrait();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div className="order-2 flex flex-col justify-center md:order-1">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
            The Designer
          </p>
          <h1 className="mt-3 font-heading text-4xl text-charcoal md:text-5xl">
            Egzona Abazi
          </h1>
          <div className="mt-4 h-px w-10 bg-gold" />

          <p className="mt-6 font-body text-sm leading-relaxed text-charcoal/70">
            Egzona Abazi is a fashion designer known for elegant, handcrafted
            dresses that blend timeless silhouettes with modern detail. Every
            piece in the collection is designed with meticulous attention to
            fabric, fit, and finish.
          </p>
          <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/70">
            From evening gowns to bridal pieces, each dress is created to be
            worn for life&apos;s most memorable occasions. Browse the
            collections to find a piece that speaks to you, and reach out with
            any questions — the team is happy to help with sizing, fabric,
            and availability.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/collections"
              className="border border-gold px-6 py-3 text-center font-body text-xs uppercase tracking-widest text-gold-dark transition-colors hover:bg-gold hover:text-white"
            >
              See the Work
            </Link>
            <Link
              href="/contact"
              className="border border-border px-6 py-3 text-center font-body text-xs uppercase tracking-widest text-charcoal transition-colors hover:border-charcoal"
            >
              Write to the Atelier
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
              In the Atelier
            </p>
            <p className="mt-1 font-heading text-lg text-charcoal">
              Prishtinë, {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
