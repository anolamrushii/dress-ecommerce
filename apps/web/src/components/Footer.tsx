export default function Footer() {
  return (
    <footer className="border-t border-gold-light/40 bg-ivory">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center">
        <p className="font-heading text-lg text-charcoal">Egzona Abazi</p>
        <p className="mt-2 font-body text-xs uppercase tracking-widest text-charcoal/60">
          &copy; {new Date().getFullYear()} Egzona Abazi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
