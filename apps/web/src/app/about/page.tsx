import AboutIntro from "@/components/about/AboutIntro";
import Manifesto from "@/components/about/Manifesto";
import Principles from "@/components/about/Principles";
import TheCraft from "@/components/about/TheCraft";
import HouseHistory from "@/components/about/HouseHistory";
import PrivateAppointments from "@/components/about/PrivateAppointments";

export const metadata = { title: "About | Egzona Abazi" };

export default function AboutPage() {
  return (
    <div>
      <AboutIntro />
      <Manifesto />
      <Principles />
      <TheCraft />
      <HouseHistory />
      <PrivateAppointments />
    </div>
  );
}
