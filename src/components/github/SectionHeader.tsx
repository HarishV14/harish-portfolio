"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  label?: string;
}

export default function SectionHeader({ title, subtitle, label }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16 space-y-3"
    >
      <span className="text-[10px] md:text-sm font-bold tracking-[0.4em] text-accent/60 uppercase mb-2 block">
        {label || "Open Source activity"}
      </span>
      <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white mb-2 leading-tight">
        <span className="bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <p className="text-slate-400 max-w-xl mx-auto text-xs md:text-sm leading-relaxed">
        {subtitle}
      </p>
    </motion.div>
  );
}
