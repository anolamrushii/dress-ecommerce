import DressCard from "@/components/DressCard";
import MagneticLink from "@/components/MagneticLink";
import ScrollReveal from "@/components/ScrollReveal";
import type { Dress } from "@/lib/types";

export default function SignaturePieces({ dresses }: { dresses: Dress[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 text-center md:py-24">
      <ScrollReveal>
        <h2 className="font-heading text-3xl text-charcoal md:text-4xl">Signature Pieces</h2>
        <div className="mx-auto mt-4 h-px w-10 bg-gold" />
        <p className="mx-auto mt-4 max-w-md font-body text-sm text-charcoal/60">
          A selection from the current édition — cut, draped and finished in the
          studio this season.
        </p>
      </ScrollReveal>

      {dresses.length > 0 ? (
        <ScrollReveal className="mt-12 grid grid-cols-2 gap-8 text-left md:grid-cols-4" stagger={0.1}>
          {dresses.map((dress) => (
            <DressCard key={dress.id} dress={dress} />
          ))}
        </ScrollReveal>
      ) : (
        <ScrollReveal className="mx-auto mt-12 max-w-2xl border border-border bg-white px-6 py-14 shadow-sm sm:px-14">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
            Coming Soon
          </p>
          <h3 className="mt-4 font-heading text-2xl text-charcoal">
            The new édition is being finished by hand
          </h3>
          <p className="mx-auto mt-4 max-w-md font-body text-sm text-charcoal/60">
            Signature pieces will appear here once released. In the meantime,
            browse the archive or write to the atelier for a private preview.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <MagneticLink
              href="/collections"
              className="border border-gold px-6 py-3 text-center font-body text-xs uppercase tracking-widest text-gold-dark transition-colors hover:bg-gold hover:text-white"
            >
              Browse Archive
            </MagneticLink>
            <MagneticLink
              href="/contact"
              className="border border-border px-6 py-3 text-center font-body text-xs uppercase tracking-widest text-charcoal transition-colors hover:border-charcoal"
            >
              Request a Preview
            </MagneticLink>
          </div>
        </ScrollReveal>
      )}

      <div className="mt-12">
        <MagneticLink
          href="/collections"
          className="inline-block border border-gold px-8 py-3 font-body text-xs uppercase tracking-widest text-gold-dark transition-colors hover:bg-gold hover:text-white"
        >
          Explore All Collections
        </MagneticLink>
      </div>
    </section>
  );
}
