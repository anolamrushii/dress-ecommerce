import Link from "next/link";

export default function MadeToMeasure() {
  return (
    <section className="bg-charcoal py-16 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-light">
          Made to Measure
        </p>
        <div className="mt-4 h-px w-10 bg-gold" />
        <h2 className="mt-4 font-heading text-3xl text-white md:text-4xl">
          A dress fitted to you, from the first sketch.
        </h2>
        <p className="mt-4 max-w-md font-body text-sm text-white/70">
          Book a private fitting at the atelier and work directly with Egzona
          on fabric, silhouette, and fit.
        </p>
        <Link
          href="/contact"
          className="mt-8 border border-white/70 px-8 py-3 font-body text-xs uppercase tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-charcoal hover:shadow-lg sm:text-sm"
        >
          Book a Fitting
        </Link>
      </div>
    </section>
  );
}
