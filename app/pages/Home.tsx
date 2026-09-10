import Navbar from '@/components/layout/navbar';
import CyberBackground from '@/components/layout/cyberBackground';
import HeroSection from '@/components/hero/HeroSection';
import FeaturedBannerSlot from '@/components/missions/featured-banner-slot';
import BuildforgeServicesSection from '@/components/services/buildforge-services-section';
import StatusPanel from '@/components/status/Status';
import ActivityGraph from '@/components/status/ActivityGraph';
import MissionGrid from '@/components/missions/missionGrid';
import RetroContactCard from '@/components/contact/retro-contact-card';
import CodeFooter from '@/components/layout/CoderFooter';
import { SectionBoundary } from '@/components/errors/section-boundary';

export default function Home() {
  return (
    <div className="text-white bg-black min-h-screen">
      <CyberBackground />
      <Navbar />
      <div className="overflow-x-hidden">
        <main>
          <HeroSection />
          <FeaturedBannerSlot />
          <SectionBoundary section="servicios">
            <BuildforgeServicesSection />
          </SectionBoundary>
          <SectionBoundary section="estado del núcleo">
            <StatusPanel />
          </SectionBoundary>
          <SectionBoundary section="actividad GitHub">
            <ActivityGraph />
          </SectionBoundary>
          <SectionBoundary section="misiones">
            <MissionGrid />
          </SectionBoundary>
          <section
            id="contacto"
            className="scroll-mt-24"
            aria-label="Contacto"
          >
            <RetroContactCard />
          </section>
        </main>
        <CodeFooter />
      </div>
    </div>
  );
}
