import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import Experience from "@/components/sections/Experience";
import Hobbies from "@/components/sections/Hobbies";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 01 — Hero */}
        <Hero />

        {/* 02 — À propos */}
        <About />

        {/* Divider */}
        <div className="px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <span className="rule-line" />
          </div>
        </div>

        {/* 04 — Projets */}
        <Projects />

        {/* 05 — Stack */}
        <Stack />

        {/* 06 — Expérience */}
        <Experience />

        {/* 07 — Centres d'intérêt */}
        <Hobbies />

        {/* 08 — Contact */}
        <Contact />
      </main>
    </>
  );
}
