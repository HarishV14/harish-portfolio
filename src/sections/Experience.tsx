"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { experiences } from "@/data/experience";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import ExperienceCard from "@/components/experience/ExperienceCard";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    if (scrollRef.current) {
      const container = scrollRef.current;
      // Measure the exact width of a single slide (first child)
      const slideWidth = container.scrollWidth / experiences.length;
      container.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const slideWidth = container.scrollWidth / experiences.length;
      const newIndex = Math.round(container.scrollLeft / slideWidth);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < experiences.length
      ) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <SectionWrapper
      id="experience"
      className="relative overflow-hidden pt-20 md:pt-28 pb-15 md:pb-20 md:min-h-screen flex flex-col justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col items-center"
      >
        {/* Section Header */}
        <div className="text-center mb-5 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-primary">Experience</span>
          </h2>
          <h3 className="text-lg md:text-xl text-white/80 font-medium mb-4">
            Building scalable products in a startup environment.
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-normal">
            Professional experience working on real-world platforms including
            EdTech systems and in-house OTT infrastructure.
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className="mb-4 flex justify-center px-4 w-full">
          <ExperienceTimeline
            experiences={experiences}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />
        </div>

        {/* Company Slider — each slide is exactly 100% of the container width */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          data-lenis-prevent
          className="flex overflow-x-auto snap-x snap-mandatory pb-4 w-full touch-pan-x"
          style={{ scrollbarWidth: "none", overscrollBehaviorX: "contain" }}
        >
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="min-w-full snap-center px-2 md:px-4 scroll-snap-stop-always"
            >
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
