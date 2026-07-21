import AboutIntro from "@/components/about/AboutIntro";
import Manifesto from "@/components/about/Manifesto";
import Principles from "@/components/about/Principles";
import TheCraft from "@/components/about/TheCraft";
import HouseHistory from "@/components/about/HouseHistory";
import PrivateAppointments from "@/components/about/PrivateAppointments";
import BackButton from "@/components/BackButton";

export const metadata = { title: "About | Egzona Abazi" };

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <BackButton href="/" label="Back to Home" />
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
