import { getCollections, getDresses } from "@/lib/api";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import SignaturePieces from "@/components/SignaturePieces";
import Wardrobe from "@/components/Wardrobe";
import DesignerBio from "@/components/DesignerBio";
import Testimonial from "@/components/Testimonial";
import MadeToMeasure from "@/components/MadeToMeasure";

export default async function HomePage() {
  const [dresses, collections] = await Promise.all([
    getDresses().catch(() => []),
    getCollections().catch(() => []),
  ]);
  const featured = dresses.filter((d) => d.is_featured).slice(0, 4);

  return (
    <div>
      <Hero />
      <StatsStrip />
      <SignaturePieces dresses={featured} />
      <Wardrobe collections={collections} />
      <DesignerBio />
      <MadeToMeasure />
      <Testimonial />
    </div>
  );
}
