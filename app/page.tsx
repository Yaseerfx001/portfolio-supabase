import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import AboutSection from "@/components/AboutSection";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/content";

export default async function HomePage() {
  const content = await getContent();

  return (
    <>
      <Hero profile={content.profile} />
      <Reveal>
        <StatsBar stats={content.stats} />
      </Reveal>
      <Reveal>
        <AboutSection profile={content.profile} />
      </Reveal>
    </>
  );
}
