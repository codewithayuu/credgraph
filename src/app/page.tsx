import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { CompositionShowcase } from "@/components/landing/CompositionShowcase";
import { TrustSection } from "@/components/landing/TrustSection";
import { CTASection } from "@/components/landing/CTASection";
import { ParticleField } from "@/components/shared/ParticleField";

export default function HomePage() {
  return (
    <div className="page-container relative">
      <ParticleField className="fixed inset-0 z-0" particleCount={35} speed={0.2} />
      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CompositionShowcase />
        <TrustSection />
        <CTASection />
      </div>
    </div>
  );
}
