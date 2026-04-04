"use client";

import { motion } from "framer-motion";
import { Experience } from "@/types/experience";
import { cn } from "@/lib/utils";

interface ExperienceTimelineProps {
  experiences: Experience[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function ExperienceTimeline({
  experiences,
  activeIndex,
  onSelect,
}: ExperienceTimelineProps) {
  return (
    <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
      {experiences.map((exp, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className="flex items-center gap-3 snap-center whitespace-nowrap focus:outline-none group transition-all"
          >
            <div className="relative flex items-center justify-center w-4 h-4">
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]"
                    : "bg-white/20 group-hover:bg-white/40"
                )}
              />
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 rounded-full border border-primary/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
            <span
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                isActive
                  ? "text-primary shadow-primary/20 drop-shadow-sm"
                  : "text-gray-400 group-hover:text-gray-200"
              )}
            >
              {exp.company}
            </span>
          </button>
        );
      })}
    </div>
  );
}
