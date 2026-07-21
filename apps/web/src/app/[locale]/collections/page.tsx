import { getTranslations } from "next-intl/server";
import { getCollections } from "@/lib/api";
import CollectionCard from "@/components/CollectionCard";
import BackButton from "@/components/BackButton";

export async function generateMetadata() {
  const t = await getTranslations("Collections");
  return { title: t("metaTitle") };
}

export default async function CollectionsPage() {
  const collections = await getCollections().catch(() => []);
  const t = await getTranslations("Collections");
  const tCommon = await getTranslations("Common");

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <BackButton href="/" label={tCommon("backToHome")} />

      <h1 className="mt-6 text-center font-heading text-4xl text-charcoal">{t("heading")}</h1>

      {collections.length === 0 ? (
        <p className="mt-10 text-center font-body text-charcoal/60">{t("empty")}</p>
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
