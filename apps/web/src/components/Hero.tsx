import Image from "next/image";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";

const HERO_IMAGE_CANDIDATES = ["/images/hero-banner.jpg", "/images/hero-banner.png"];

function findHeroImage(): string | null {
  for (const candidate of HERO_IMAGE_CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", candidate))) {
      return candidate;
    }
  }
  return null;
}

export default function Hero() {
  const heroImage = findHeroImage();

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-charcoal md:min-h-[92vh]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, oklch(var(--color-charcoal)) 0%, oklch(var(--color-gold-dark)) 55%, oklch(var(--color-gold-light)) 100%)",
        }}
      />

      {heroImage && (
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
          style={{ objectPosition: "50% 78%" }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60" />

      <div className="relative flex flex-1 flex-col justify-between px-6 py-8 md:px-12 md:py-10">
        <div className="flex items-start justify-between font-body text-[0.65rem] uppercase tracking-[0.2em] text-white/70">
          <span>Autumn / Winter — Édition N°07</span>
          <span className="hidden md:inline">Prishtinë · Milano</span>
        </div>

        <div className="mx-auto flex max-w-3xl flex-col items-center px-2 text-center">
          <span className="font-body text-xs uppercase tracking-[0.25em] text-white/80">
            Egzona Abazi
          </span>
          <h1 className="mt-4 font-heading text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl">
            Contemporary silhouettes, timeless craft.
          </h1>
          <p className="mt-5 max-w-md font-body text-sm text-white/80 sm:max-w-xl sm:text-base">
            A wardrobe drafted by hand, in limited runs — made to outlive the
            season it was born in.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href="/collections"
              className="border border-white/70 px-8 py-3 text-center font-body text-xs uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-charcoal sm:text-sm"
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 text-center font-body text-xs uppercase tracking-widest text-white/90 transition-colors hover:text-gold-light sm:text-sm"
            >
              The Atelier →
            </Link>
          </div>
        </div>

        <div className="h-2 md:h-0" />
      </div>
    </section>
  );
}
