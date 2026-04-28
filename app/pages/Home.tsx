import Navbar from '../../components/layout/navbar';
import CyberBackground from '../../components/layout/cyberBackground';
import HeroSection from '../../components/hero/HeroSection';
import StatusPanel from '../../components/status/Status';
import ActivityGraph from '../../components/status/ActivityGraph';
import MissionGrid from '../../components/missions/missionGrid';
import RetroContactCard from '../../components/contact/retro-contact-card';
import CodeFooter from '../../components/layout/CoderFooter';

export default function Home() {
  return (
    <div className="text-white bg-black min-h-screen">
      <CyberBackground />
      <Navbar />
      <main>
        <HeroSection />
        <StatusPanel />
        <ActivityGraph />
        <MissionGrid />
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
  );
}