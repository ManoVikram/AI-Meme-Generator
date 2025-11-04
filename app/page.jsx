import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh px-12">
      <Navbar />

      <Hero />
    </main>
  );
}
