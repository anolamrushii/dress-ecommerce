const STATS = [
  "Handmade in the Atelier",
  "Limited Runs · Numbered Pieces",
  "Complimentary Fittings",
  "Worldwide Shipping",
];

export default function StatsStrip() {
  return (
    <section className="border-b border-border bg-ivory">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-4 px-6 py-6 text-center font-body text-[0.65rem] uppercase tracking-[0.15em] text-charcoal/70 sm:grid-cols-4 sm:text-xs">
        {STATS.map((stat) => (
          <span key={stat}>{stat}</span>
        ))}
      </div>
    </section>
  );
}
