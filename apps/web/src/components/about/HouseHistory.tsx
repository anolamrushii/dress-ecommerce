const MILESTONES = [
  {
    year: "2012",
    title: "Formation",
    description: "Studies in fashion design between Prishtinë and Milan.",
  },
  {
    year: "2016",
    title: "The atelier opens",
    description: "First private commissions — evening and bridal, by referral only.",
  },
  {
    year: "2019",
    title: "First édition",
    description: "The debut ready-to-wear capsule, presented in a single evening.",
  },
  {
    year: "2022",
    title: "Couture line",
    description: "Introduction of made-to-measure with a three-fitting protocol.",
  },
  {
    year: "Today",
    title: "Numbered pieces",
    description: "Sold internationally, still finished by the same hands.",
  },
];

export default function HouseHistory() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
      <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
        The House
      </p>
      <h2 className="mt-3 font-heading text-3xl text-charcoal md:text-4xl">
        A short history
      </h2>
      <div className="mx-auto mt-4 h-px w-10 bg-gold" />

      <div className="mt-12 text-left">
        {MILESTONES.map((milestone) => (
          <div
            key={milestone.year}
            className="grid grid-cols-1 gap-2 border-t border-border py-6 sm:grid-cols-[7rem_1fr] sm:gap-6"
          >
            <p className="font-heading text-2xl text-gold-dark">{milestone.year}</p>
            <div>
              <h3 className="font-heading text-lg text-charcoal">{milestone.title}</h3>
              <p className="mt-1 font-body text-sm text-charcoal/60">
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
