"use client";

import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { Project } from "@/types/project";
import ProjectPreview from "./ProjectPreview";
import TechStackTags from "./TechStackTags";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group relative flex flex-col glass rounded-[2rem] p-6 sm:p-8 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300 border border-white/5 hover:border-white/10"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-slate-400 text-xs sm:text-sm font-medium tracking-widest mb-2 uppercase flex items-center gap-2">
            <span className="text-white/40">{formattedIndex} —</span> {project.category}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>
        </div>
        
        {/* Optional Action Buttons Container */}
        <div className="flex flex-col xl:flex-row gap-3 shrink-0 ml-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.github && (
            <Link 
              href={project.github} 
              target="_blank" 
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:scale-105 transition-all"
              aria-label={`${project.title} GitHub Repository`}
            >
              <FaGithub className="w-4 h-4" />
              <span>Star</span>
            </Link>
          )}
          {project.demo && (
            <Link 
              href={project.demo} 
              target="_blank" 
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white font-semibold text-sm hover:bg-white/20 hover:scale-105 transition-all"
              aria-label={`${project.title} Live Demo`}
            >
              <FaExternalLinkAlt className="w-3.5 h-3.5" />
              <span>Live</span>
            </Link>
          )}
        </div>
      </div>

      <ProjectPreview 
        image={project.image} 
        title={project.title} 
        gradient={project.gradient} 
      />

      <div className="mt-auto">
        <TechStackTags tags={project.tech} />
      </div>

    </motion.div>
  );
}
