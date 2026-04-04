"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Experience } from "@/types/experience";
import HighlightCard from "./HighlightCard";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const highlightScrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Experience Header */}
      <div className="glass p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-0.5">
              {experience.role}
            </h3>
            <div className="text-lg text-primary font-medium">
              {experience.company}
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end text-sm text-gray-400 shrink-0">
            <span className="flex items-center gap-1.5 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {experience.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {experience.location}
            </span>
          </div>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {experience.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-white/10 text-gray-200 rounded-full border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs md:text-sm font-semibold text-white/90 tracking-wide uppercase">
            Realtime Projects &amp; Key Contributions
          </h4>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            Scroll to explore
          </span>
        </div>

        {/* Scrollable row — plain div, no Framer Motion wrapping the scroll container */}
        <div
          ref={highlightScrollRef}
          data-lenis-prevent
          className="flex gap-4 overflow-x-auto py-4 px-1 touch-pan-x"
          style={{ scrollbarWidth: "none", overscrollBehaviorX: "contain" }}
        >
          {experience.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              /* each card is fixed-width so the row overflows and becomes scrollable */
              className="min-w-[280px] max-w-[280px] md:min-w-[300px] md:max-w-[300px] shrink-0"
            >
              <HighlightCard {...highlight} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
