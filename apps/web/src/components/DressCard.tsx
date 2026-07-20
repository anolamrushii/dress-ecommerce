import Image from "next/image";
import Link from "next/link";
import type { Dress } from "@/lib/types";

export default function DressCard({ dress }: { dress: Dress }) {
  const cover = dress.images[0];

  return (
    <Link href={`/dress/${dress.slug}`} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory">
        {cover ? (
          <Image
            src={cover.image_url}
            alt={cover.alt_text ?? dress.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-charcoal/30">
            No image
          </div>
        )}
      </div>
      <div className="mt-3 text-center">
        <h3 className="font-heading text-lg text-charcoal">{dress.name}</h3>
        <p className="font-body text-sm text-gold-dark">
          {dress.price ? `$${dress.price}` : "Inquire for price"}
        </p>
      </div>
    </Link>
  );
}
