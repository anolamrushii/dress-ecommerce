import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import BackButton from "@/components/BackButton";

export async function generateMetadata() {
  const t = await getTranslations("Contact");
  return { title: t("metaTitle") };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const tCommon = await getTranslations("Common");

  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <BackButton href="/" label={tCommon("backToHome")} />

      <h1 className="mt-6 text-center font-heading text-4xl text-charcoal">{t("heading")}</h1>
      <p className="mt-4 text-center font-body text-charcoal/70">{t("subtext")}</p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
