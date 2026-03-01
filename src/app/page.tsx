import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { CompositionShowcase } from "@/components/landing/CompositionShowcase";
import { TrustSection } from "@/components/landing/TrustSection";
import { CTASection } from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Premium mesh backdrop (no particles) */}
      <div className="fixed inset-0 -z-10 bg-mesh-void bg-[length:200%_200%] animate-gradient-shift" />
      <div className="fixed inset-0 -z-10 opacity-[0.55] grid-bg" />

      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CompositionShowcase />
      <TrustSection />
      <CTASection />
    </div>
  );
}
