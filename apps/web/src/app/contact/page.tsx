import ContactForm from "@/components/ContactForm";
import BackButton from "@/components/BackButton";

export const metadata = { title: "Contact | Egzona Abazi" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <BackButton href="/" label="Back to Home" />

      <h1 className="mt-6 text-center font-heading text-4xl text-charcoal">Contact</h1>
      <p className="mt-4 text-center font-body text-charcoal/70">
        Have a question about a dress, sizing, or a custom order? Send a message below.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
