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
      className="relative flex flex-col items-center justify-center min-h-[90vh] py-12"
      containerClassName="flex flex-col items-center justify-center max-h-[800px]"
    >
      {/* Background Dots - Consistency with Hero */}
      <div 
        className="absolute inset-0 opacity-[0.06] -z-10 pointer-events-none"
        style={{ 
          backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* Main Glow matching site theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center z-10 mb-2 md:mb-6"
      >
        <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent/60 uppercase mb-2 block">
          Technical Expertise
        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2 leading-tight">
          My{" "}
          <span className="bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">
            Skills
          </span>
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
        className="relative flex items-center justify-center py-2 md:py-5"
      >
        <SkillSphere skills={skills} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center z-10 -mt-2"
      >
        <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Interactive Globe
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
