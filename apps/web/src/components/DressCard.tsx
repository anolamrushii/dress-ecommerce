import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Dress } from "@/lib/types";

export default function DressCard({ dress }: { dress: Dress }) {
  const cover = dress.images[0];
  const t = useTranslations("Common");

  return (
    <Link href={`/dress/${dress.slug}`} className="group block transition-opacity active:opacity-80">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory shadow-sm transition-shadow duration-300 group-hover:shadow-lg group-active:shadow-lg">
        {cover ? (
          <Image
            src={cover.image_url}
            alt={cover.alt_text ?? dress.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-charcoal/30">
            {t("noImage")}
          </div>
        )}
      </div>
      <div className="mt-3 text-center">
        <h3 className="font-heading text-lg text-charcoal">{dress.name}</h3>
        <p className="font-body text-sm text-gold-dark">
          {dress.price ? `$${dress.price}` : t("inquireForPrice")}
        </p>
      </div>
    </Link>
  );
}
