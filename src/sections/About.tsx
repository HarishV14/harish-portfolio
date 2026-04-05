"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";
import ChatAssistant from "@/components/ChatAssistant";
import { aboutData } from "@/data/about";

export default function About() {
  const { title, paragraphs } = aboutData;

  // Helper function to render text with highlighted keywords
  const renderParagraph = (text: string) => {
    const parts = text.split(/(<highlight>.*?<\/highlight>)/);
    return parts.map((part, index) => {
      if (part.startsWith("<highlight>") && part.endsWith("</highlight>")) {
        const keyword = part.replace(/<\/?highlight>/g, "");
        return (
          <span key={index} className="text-purple-400 font-semibold">
            {keyword}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <SectionWrapper id="about" className="relative overflow-hidden pt-24 md:pt-32 pb-12 md:pb-20">
      {/* Background Section Gradient - Subtle Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
        
        {/* Left Side: About Content */}
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              About
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
          </div>

          <div className="space-y-4 text-gray-300 text-lg leading-relaxed font-medium">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {renderParagraph(paragraph)}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Right Side: Chat Assistant UI */}
        <ChatAssistant />
      </div>
    </SectionWrapper>
  );
}
