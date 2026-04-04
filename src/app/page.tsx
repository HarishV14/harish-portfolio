import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";
// import Projects from "@/sections/Projects";
import Education from "@/sections/Education";
import Github from "@/sections/Github";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Experience />
      {/* <Projects /> */}
      <Education />
      <Github />
      <Contact />
    </main>
  );
}
