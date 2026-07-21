import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import HeroContent from "@/components/HeroContent";

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

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-gold-dark/45 to-charcoal/85" />

      <HeroContent />
    </section>
  );
}
