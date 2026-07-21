import Link from "next/link";

export default function PrivateAppointments() {
  return (
    <section className="bg-charcoal py-16 md:py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 text-center">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-gold-light">
          Private Appointments
        </p>
        <p className="mt-6 max-w-md font-body text-sm text-white/70">
          Fittings by appointment at the atelier in Prishtinë, and on request
          while traveling.
        </p>
        <Link
          href="/contact"
          className="mt-8 border border-white/70 px-8 py-3 font-body text-xs uppercase tracking-widest text-white transition-all duration-200 hover:bg-white hover:text-charcoal hover:shadow-lg sm:text-sm"
        >
          Request an Appointment
        </Link>
      </div>
    </section>
  );
}
