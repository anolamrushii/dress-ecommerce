import { notFound } from "next/navigation";
import { ApiError, getDress } from "@/lib/api";
import ContactForm from "@/components/ContactForm";
import DressGallery from "@/components/DressGallery";
import BackButton from "@/components/BackButton";

export default async function DressDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let dress;
  try {
    dress = await getDress(params.slug);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <BackButton />

      <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2">
        <DressGallery images={dress.images} name={dress.name} />

        <div>
          {dress.collection && (
            <p className="font-body text-xs uppercase tracking-widest text-gold-dark">
              {dress.collection.name}
            </p>
          )}
          <h1 className="mt-2 font-heading text-4xl text-charcoal">{dress.name}</h1>
          <p className="mt-3 font-body text-lg text-gold-dark">
            {dress.price ? `$${dress.price}` : "Inquire for price"}
          </p>

          {dress.description && (
            <p className="mt-6 font-body leading-relaxed text-charcoal/80">{dress.description}</p>
          )}

          <dl className="mt-6 space-y-2 font-body text-sm text-charcoal/70">
            {dress.fabric && (
              <div className="flex gap-2">
                <dt className="font-medium text-charcoal">Fabric:</dt>
                <dd>{dress.fabric}</dd>
              </div>
            )}
            {dress.sizes && dress.sizes.length > 0 && (
              <div className="flex gap-2">
                <dt className="font-medium text-charcoal">Sizes:</dt>
                <dd>{dress.sizes.join(", ")}</dd>
              </div>
            )}
          </dl>

          <div className="mt-10 border-t border-gold-light/40 pt-8">
            <h2 className="font-heading text-2xl text-charcoal">Inquire About This Dress</h2>
            <p className="mt-2 font-body text-sm text-charcoal/60">
              Send a message and Egzona&apos;s team will follow up with availability and pricing.
            </p>
            <div className="mt-6">
              <ContactForm dressId={dress.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
