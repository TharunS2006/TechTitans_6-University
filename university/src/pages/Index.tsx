import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { PlacementSection } from "@/components/home/PlacementSection";
import { GallerySection } from "@/components/home/GallerySection";
import { OverviewSection } from "@/components/home/OverviewSection";

const Index = () => {
  return (
    <Layout>
      <div className="w-full">
        <HeroSection />
        <StatsSection />
        <PlacementSection />
        <GallerySection />
        <OverviewSection />
      </div>
    </Layout>
  );
};

export default Index;