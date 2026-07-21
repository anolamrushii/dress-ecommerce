import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import { useTranslations } from "next-intl";

const CRAFT_IMAGES = ["/images/craft-1.jpg", "/images/craft-2.jpg", "/images/craft-3.jpg"];

function findCraftImages(): string[] {
  return CRAFT_IMAGES.filter((candidate) =>
    fs.existsSync(path.join(process.cwd(), "public", candidate)),
  );
}

export default function TheCraft() {
  const images = findCraftImages();
  const t = useTranslations("About.craft");

  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl">
              {t("heading")}
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm text-charcoal/60">{t("text")}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => {
            const src = images[i];
            return (
              <div key={i} className="relative aspect-[3/4] w-full overflow-hidden bg-charcoal">
                {src ? (
                  <Image
                    src={src}
                    alt={t("imageAlt")}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        i % 2 === 0
                          ? "linear-gradient(160deg, oklch(var(--color-charcoal)) 0%, oklch(var(--color-gold-dark)) 100%)"
                          : "linear-gradient(200deg, oklch(var(--color-gold-dark)) 0%, oklch(var(--color-charcoal)) 100%)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
