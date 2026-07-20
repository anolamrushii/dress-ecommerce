import { getCollections } from "@/lib/api";
import CollectionCard from "@/components/CollectionCard";

export const metadata = { title: "Collections | Egzona Abazi" };

export default async function CollectionsPage() {
  const collections = await getCollections().catch(() => []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-center font-heading text-4xl text-charcoal">Collections</h1>

      {collections.length === 0 ? (
        <p className="mt-10 text-center font-body text-charcoal/60">
          No collections published yet. Please check back soon.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
}
