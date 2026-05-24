import Hero from "@/components/Hero";
import Latest from "@/components/Latest";
import Consultation from "@/components/Consultation";
import TopicsSection from "@/components/TopicsSection";

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#F7F4ED] text-[#1A2820]">
      <Hero />
      <Consultation />
      <Latest />
      <TopicsSection />
    </main>
  );
}
