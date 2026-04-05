"use client";

import React from "react";
import { motion } from "framer-motion";
import SkillSphere from "@/components/skills/SkillSphere";
import { skills } from "@/data/skills";
import SectionWrapper from "@/components/SectionWrapper";

export default function Skills() {
  return (
    <SectionWrapper
      id="skills"
      className="relative flex flex-col items-center justify-start md:min-h-screen overflow-x-hidden pt-28 md:pt-32 pb-12 md:pb-16"
      containerClassName="flex flex-col items-center justify-start w-full h-full gap-10 sm:gap-10"
    >
      {/* Background Dots - Using standard opacity for broader compatibility */}
      <div 
        className="absolute inset-0 opacity-5 -z-10 pointer-events-none"
        style={{ 
          backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* Main Glow - Using Radial Gradients instead of Filter Blur for better performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20" 
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 70%)"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center z-10"
      >
        <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent/60 uppercase mb-2 block">
          Technical Expertise
        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2 leading-tight">
          Skills
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto text-xs md:text-sm leading-relaxed">
          Building powerful applications with modern stacks.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
        className="relative flex items-center justify-center flex-1"
      >
        <SkillSphere skills={skills} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center z-10"
      >
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Interactive Globe
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
