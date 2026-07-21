export default function Testimonial() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-dark">
          In Their Words
        </p>
        <div className="mx-auto mt-4 h-px w-10 bg-gold" />
        <blockquote className="mt-6 font-heading text-2xl leading-snug text-charcoal md:text-3xl">
          &ldquo;She listened for an hour before she drew a single line. What
          arrived twelve weeks later was the dress I didn&apos;t know I&apos;d
          been describing my whole life.&rdquo;
        </blockquote>
        <p className="mt-6 font-body text-xs uppercase tracking-[0.15em] text-charcoal/50">
          Client Name · Bridal Commission
        </p>
      </div>
    </section>
  );
}
