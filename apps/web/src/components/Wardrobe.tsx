import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/types";

export default function Wardrobe({ collections }: { collections: Collection[] }) {
  if (collections.length === 0) return null;

  return (
    <section className="bg-ivory py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
              The Wardrobe
            </p>
            <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl">
              Three ways to be dressed by Egzona.
            </h2>
          </div>
          <Link
            href="/collections"
            className="font-body text-xs uppercase tracking-widest text-charcoal transition-colors hover:text-gold"
          >
            View All →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {collections.slice(0, 3).map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-charcoal shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              {collection.cover_image_url ? (
                <Image
                  src={collection.cover_image_url}
                  alt={collection.name}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-gold-dark" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                {collection.season && (
                  <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-white/80">
                    {collection.season}
                  </p>
                )}
                <p className="mt-1 font-heading text-2xl">{collection.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
