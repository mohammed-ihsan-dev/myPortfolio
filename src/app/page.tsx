import { Navbar } from "@/features/Navbar";
import { Hero } from "@/features/Hero";
import { Projects } from "@/features/Projects";
import { About } from "@/features/About";
import { Skills } from "@/features/Skills";
import { Experience } from "@/features/Experience";
import { Education } from "@/features/Education";
import { Services } from "@/features/Services";
import { Contact } from "@/features/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col antialiased">
      {/* Fixed Header Navbar */}
      <Navbar />
      
      {/* Ordered Section Blocks */}
      <main className="flex-1">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Services />
        <Contact />
      </main>

      {/* Footer copyright */}
      <Footer />
    </div>
  );
}
