import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { CertificationsSection } from "@/components/certifications-section";
import { AwardsSection } from "@/components/awards-section";
import { StatsSection } from "@/components/stats-section";
import { ResumeSection } from "@/components/resume-section";
import { ContactSection } from "@/components/contact-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ScrollProgress } from "@/components/effects/scroll-progress";

const Divider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
);

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <div className="relative">
        <AboutSection />
        <CtaSection />
        <ExperienceSection />
        <Divider />
        <ProjectsSection />
        <Divider />
        <SkillsSection />
        <Divider />
        <CertificationsSection />
        <Divider />
        <AwardsSection />
        <Divider />
        <StatsSection />
        <Divider />
        <ResumeSection />
        <Divider />
        <ContactSection />
      </div>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
