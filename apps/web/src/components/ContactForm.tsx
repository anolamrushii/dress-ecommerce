"use client";

import { useState, type FormEvent } from "react";
import { submitInquiry } from "@/lib/api";

export default function ContactForm({ dressId }: { dressId?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      await submitInquiry({
        dress_id: dressId ?? null,
        customer_name: name,
        email,
        message: message || null,
      });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="font-body text-charcoal">
        Thank you — your inquiry has been sent. Egzona&apos;s team will be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="customer_name" className="mb-1 block font-body text-sm text-charcoal">
          Name
        </label>
        <input
          id="customer_name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gold-light bg-white px-4 py-2 font-body text-charcoal focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block font-body text-sm text-charcoal">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gold-light bg-white px-4 py-2 font-body text-charcoal focus:border-gold focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block font-body text-sm text-charcoal">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gold-light bg-white px-4 py-2 font-body text-charcoal focus:border-gold focus:outline-none"
        />
      </div>

      {error && <p className="font-body text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 self-start bg-gold px-8 py-3 font-body text-sm uppercase tracking-widest text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
