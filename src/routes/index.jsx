import { createFileRoute } from "@tanstack/react-router";
import SiteHeader from "@/components/site/SiteHeader";
import Hero from "@/components/site/Hero";
import TeamsSection from "@/components/site/TeamsSection";
import JourneyRail from "@/components/site/JourneyRail";
import SolutionTabs from "@/components/site/SolutionTabs";
import WorkflowGrid from "@/components/site/WorkflowGrid";
import MemoryArchitecture from "@/components/site/MemoryArchitecture";
import ImpactStats from "@/components/site/ImpactStats";
import TrustedMarquee from "@/components/site/TrustedMarquee";
import Testimonials from "@/components/site/Testimonials";
import DemoForm from "@/components/site/DemoForm";
import SiteFooter from "@/components/site/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARTISO — Shaping the Future of Fashion" },
      {
        name: "description",
        content:
          "ARTISO is the Agentic Operating System for fashion creatives: brand DNA, archive, design development, tech packs, campaigns and merchandising in one connected intelligence layer.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#121212]">
      <SiteHeader />
      <main>
        <Hero />
        <TeamsSection />
        <JourneyRail />
        <SolutionTabs />
        <WorkflowGrid />
        <MemoryArchitecture />
        <ImpactStats />
        <TrustedMarquee />
        <Testimonials />
        <DemoForm />
      </main>
      <SiteFooter />
    </div>
  );
}