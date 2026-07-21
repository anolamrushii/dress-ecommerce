import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Collection } from "@/lib/types";

export default function CollectionCard({ collection }: { collection: Collection }) {
  const t = useTranslations("Common");

  return (
    <Link href={`/collections/${collection.slug}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory">
        {collection.cover_image_url ? (
          <Image
            src={collection.cover_image_url}
            alt={collection.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-charcoal/30">
            {t("noImage")}
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-heading text-2xl text-charcoal">{collection.name}</h3>
        {collection.season && (
          <p className="font-body text-xs uppercase tracking-widest text-gold-dark">
            {collection.season}
          </p>
        )}
      </div>
    </Link>
  );
}
