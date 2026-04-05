"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  return (
    <SectionWrapper
      id="projects"
      className="relative pt-24 md:pt-32 pb-12 md:pb-20"
      containerClassName="relative z-10 max-w-7xl mx-auto"
    >
      {/* Background Section Gradient - Subtle Glow */}
      <div className="absolute top-1/4 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-accent/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 sm:mb-20"
      >
        <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent/60 uppercase mb-4 block">
          PORTFOLIO
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
          Projects
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          A curated selection of projects that made me confident in building software.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-20 flex justify-center"
      >
        <Link
          href="https://github.com/HarishV14"
          target="_blank"
          className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm sm:text-base font-medium"
        >
          Explore all projects on GitHub
          <FaExternalLinkAlt className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </motion.div>
      
    </SectionWrapper>
  );
}
