import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/site/Hero";
import TeamsSection from "@/components/site/TeamsSection";
import JourneyDial from "@/components/site/JourneyDial";
import SolutionTabs from "@/components/site/SolutionTabs";
import MemoryArchitecture from "@/components/site/MemoryArchitecture";
import ImpactStats from "@/components/site/ImpactStats";
import TrustedMarquee from "@/components/site/TrustedMarquee";
import Testimonials from "@/components/site/Testimonials";
import DemoForm from "@/components/site/DemoForm";

export const Route = createFileRoute("/_site/")({
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
    <>
      <Hero />
      <TeamsSection />
      <JourneyDial />
      <SolutionTabs />
      <MemoryArchitecture />
      <ImpactStats />
      <TrustedMarquee />
      <Testimonials />
      <DemoForm />
    </>
  );
}