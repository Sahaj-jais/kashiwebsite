import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { HistorySection } from "@/components/history-section";
import { CulturalSection } from "@/components/cultural-section";
import { ExploreSection } from "@/components/explore-section";
import { GuidesSection } from "@/components/guides-section";
import { GallerySection } from "@/components/gallery-section";
import { MapSection } from "@/components/map-section";
import { BlogSection } from "@/components/blog-section";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <HistorySection />
        <CulturalSection />
        <ExploreSection />
        <GuidesSection />
        <GallerySection />
        <MapSection />
        <BlogSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
