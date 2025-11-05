import Hero from "@/components/hero";
import MemeGenerator from "@/components/memeGenerator";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh px-12">
      <Navbar />

      {/* <Hero /> */}

      <MemeGenerator />
    </main>
  );
}
