import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ApiError, getCollection, getDresses } from "@/lib/api";
import DressCard from "@/components/DressCard";
import BackButton from "@/components/BackButton";

export default async function CollectionDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  let collection;
  try {
    collection = await getCollection(params.slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  const dresses = await getDresses().catch(() => []);
  const collectionDresses = dresses.filter((d) => d.collection_id === collection.id);
  const t = await getTranslations("CollectionDetail");

  const description =
    params.locale === "sq"
      ? collection.description_sq || collection.description_en
      : collection.description_en || collection.description_sq;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <BackButton />

      <div className="mt-6 text-center">
        {collection.season && (
          <p className="font-body text-xs uppercase tracking-widest text-gold-dark">
            {collection.season}
          </p>
        )}
        <h1 className="mt-2 font-heading text-4xl text-charcoal">{collection.name}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl font-body text-charcoal/70">{description}</p>
        )}
      </div>

      {collectionDresses.length === 0 ? (
        <p className="mt-12 text-center font-body text-charcoal/60">{t("noDresses")}</p>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {collectionDresses.map((dress) => (
            <DressCard key={dress.id} dress={dress} />
          ))}
        </div>
      )}
    </div>
  );
}
