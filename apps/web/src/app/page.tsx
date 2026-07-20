import Link from "next/link";
import { getDresses } from "@/lib/api";
import DressCard from "@/components/DressCard";

export default async function HomePage() {
  const dresses = await getDresses().catch(() => []);
  const featured = dresses.filter((d) => d.is_featured).slice(0, 4);

  return (
    <div>
      <section className="bg-ivory">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center">
          <h1 className="font-heading text-5xl text-charcoal md:text-6xl">Egzona Abazi</h1>
          <p className="mt-4 max-w-xl font-body text-charcoal/70">
            Timeless silhouettes, handcrafted detail. Explore the collections and
            inquire about a piece for your next occasion.
          </p>
          <Link
            href="/collections"
            className="mt-8 border border-gold px-8 py-3 font-body text-sm uppercase tracking-widest text-gold-dark transition-colors hover:bg-gold hover:text-white"
          >
            View Collections
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center font-heading text-3xl text-charcoal">Featured Dresses</h2>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            {featured.map((dress) => (
              <DressCard key={dress.id} dress={dress} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
