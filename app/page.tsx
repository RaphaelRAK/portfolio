import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/sections/Hero";
import ServicesMarquee from "@/components/sections/ServicesMarquee";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Stack from "@/components/sections/Stack";
import Hobbies from "@/components/sections/Hobbies";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <ServicesMarquee />
        <Process />
        <About />
        <Experience />
        <Stack />
        <Hobbies />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
