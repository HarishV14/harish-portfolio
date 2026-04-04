"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import { educationData } from "@/data/education";

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <SectionWrapper 
      id="education" 
      className="scroll-mt-24 flex flex-col justify-center pt-18 md:pt-36 pb-10 md:min-h-screen overflow-hidden"
    >
      <div className="w-full flex flex-col items-center mb-6 md:mb-6 px-4">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent/60 uppercase mb-4 block text-center">
          My Learning Journey
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 text-center">
          <span className="bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">
            Education
          </span>
        </h2>
      </div>

      <div ref={containerRef} className="relative w-full max-w-5xl mx-auto px-4 md:px-8 flex-grow">
        {/* Central Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2">
          <motion.div 
            className="absolute top-0 w-full bg-gradient-to-b from-primary via-accent to-transparent origin-top"
            style={{ scaleY, left: 0, right: 0, bottom: 0 }}
          />
        </div>

        <div className="relative z-10 flex flex-col gap-6 md:gap-4 py-2">
          {educationData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={item.id}
                className={`flex flex-col md:flex-row items-center justify-between w-full
                  ${isEven ? "md:flex-row-reverse" : ""}
                `}
              >
                {/* Space on empty side for desktop */}
                <div className="hidden md:block md:w-5/12" />

                {/* Center Node */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-accent -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                >
                  <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                </motion.div>

                {/* Card */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`w-[calc(100%-3rem)] ml-10 md:ml-0 md:w-5/12 p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 hover:from-primary/50 hover:to-accent/50 transition-colors duration-500`}
                >
                  <div className="glass p-4 md:p-5 rounded-2xl h-full flex flex-col justify-center">
                    <div className="text-accent/80 text-[11px] font-semibold tracking-wider mb-1">
                      {item.year}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {item.degree}
                    </h3>
                    <p className="text-slate-300 text-xs md:text-sm mb-2">
                      {item.college}
                    </p>
                    {item.cgpa && (
                      <div className="text-[10px] md:text-xs text-primary/90 font-medium bg-primary/10 border border-primary/20 inline-flex items-center px-2 py-0.5 rounded-full w-fit">
                        CGPA: {item.cgpa}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
