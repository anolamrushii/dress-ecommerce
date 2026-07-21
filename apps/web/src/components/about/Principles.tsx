const PRINCIPLES = [
  {
    number: "01",
    title: "Line before ornament",
    description:
      "We draw the silhouette until it is right on the body. Everything else is added last, or not at all.",
  },
  {
    number: "02",
    title: "Small, numbered runs",
    description:
      "No piece is produced in more than a handful. Each garment is recorded in the atelier archive.",
  },
  {
    number: "03",
    title: "Fabric that ages well",
    description:
      "Silks, wools and laces chosen for how they behave in ten years, not ten minutes.",
  },
  {
    number: "04",
    title: "Finished by hand",
    description:
      "Every hem, every buttonhole, every bead. If it can be done by hand, it is.",
  },
];

export default function Principles() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 text-center md:py-24">
      <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
        Principles
      </p>
      <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl">
        How the atelier works
      </h2>
      <div className="mx-auto mt-4 h-px w-10 bg-gold" />

      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 text-left sm:grid-cols-2">
        {PRINCIPLES.map((principle) => (
          <div key={principle.number} className="border-t border-border pt-6">
            <p className="font-heading text-xl text-gold-dark">{principle.number}</p>
            <h3 className="mt-2 font-heading text-xl text-charcoal">{principle.title}</h3>
            <p className="mt-2 font-body text-sm text-charcoal/60">{principle.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
