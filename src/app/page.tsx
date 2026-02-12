import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import AntigravityBackground from "@/components/AntigravityBackground";

export default function Home() {
  return (
    <main className="relative">
      <AntigravityBackground />
      <Hero />
      <Experience />
    </main>
  );
}
