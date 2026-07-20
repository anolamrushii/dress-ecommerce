import Image from "next/image";
import { notFound } from "next/navigation";
import { ApiError, getDress } from "@/lib/api";
import ContactForm from "@/components/ContactForm";

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
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          {dress.images.length === 0 ? (
            <div className="col-span-2 flex aspect-[3/4] items-center justify-center bg-ivory text-charcoal/30">
              No images yet
            </div>
          ) : (
            dress.images.map((image, i) => (
              <div
                key={image.id}
                className={`relative aspect-[3/4] overflow-hidden bg-ivory ${
                  i === 0 ? "col-span-2" : ""
                }`}
              >
                <Image
                  src={image.image_url}
                  alt={image.alt_text ?? dress.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 45vw, 100vw"
                  priority={i === 0}
                />
              </div>
            ))
          )}
        </div>

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
