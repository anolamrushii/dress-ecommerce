import { getTranslations } from "next-intl/server";
import AboutIntro from "@/components/about/AboutIntro";
import Manifesto from "@/components/about/Manifesto";
import Principles from "@/components/about/Principles";
import TheCraft from "@/components/about/TheCraft";
import HouseHistory from "@/components/about/HouseHistory";
import PrivateAppointments from "@/components/about/PrivateAppointments";
import BackButton from "@/components/BackButton";

export async function generateMetadata() {
  const t = await getTranslations("About");
  return { title: t("metaTitle") };
}

export default async function AboutPage() {
  const tCommon = await getTranslations("Common");

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <BackButton href="/" label={tCommon("backToHome")} />
      </div>

      <AboutIntro />
      <Manifesto />
      <Principles />
      <TheCraft />
      <HouseHistory />
      <PrivateAppointments />
    </div>
  );
}
