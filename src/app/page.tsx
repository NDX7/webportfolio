import Hero from "@/components/Hero";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen">
      <div className="relative z-10">
        <Hero />
        <Experience />
      </div>
    </main>
  );
}
