"use client";

import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";

export default function GithubCalendarCard() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number | "last">("last");

  const years = ["last", currentYear, currentYear - 1, currentYear - 2];

  useEffect(() => {
    setMounted(true);
    // Initial load timer
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // When year changes, trigger loading state
  useEffect(() => {
    if (mounted) {
      setLoading(true);
      // Give the library enough time to re-mount and fetch
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedYear, mounted]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full relative p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300 shadow-xl overflow-hidden group"
    >
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Year Selector Pills - Wrap in mounted check to prevent hydration mismatch */}
        <div className="flex flex-wrap items-center justify-center gap-2 min-h-[30px]">
          {mounted && years.map((year) => (
            <button
              key={year}
              disabled={loading}
              onClick={() => setSelectedYear(year as any)}
              className={`px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full border transition-all duration-300 ${
                selectedYear === year
                  ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                  : "bg-white/5 border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300 disabled:opacity-50"
              }`}
            >
              {year === "last" ? "Recent" : year}
            </button>
          ))}
        </div>

        <div className="w-full relative overflow-x-auto custom-scrollbar pb-2 flex justify-center min-h-[160px]">
          {loading && (
             <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0b0b0f]/20 backdrop-blur-[2px] transition-all duration-300">
               <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-3 shadow-[0_0_15px_rgba(99,102,241,0.2)]" />
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70 animate-pulse">
                  Syncing Activity
               </p>
             </div>
          )}

          {mounted ? (
            <div className={`transition-opacity duration-500 ${loading ? 'opacity-20 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              <GitHubCalendar
                key={`calendar-${selectedYear}`}
                username="HarishV14"
                year={selectedYear}
                colorScheme="dark"
                fontSize={12}
                blockSize={12}
                blockMargin={4}
                theme={{
                  dark: ["#161b22", "#1e293b", "#3b82f6", "#6366f1", "#818cf8"],
                }}
              />
            </div>
          ) : (
            <div className="w-[850px] max-w-full h-32 flex flex-wrap gap-1 items-center justify-center">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-sm bg-white/5 animate-pulse" />
              ))}
            </div>
          )}
        </div>
        
        <p className="text-xs font-medium text-slate-500 tracking-wide text-center">
          Contributions in <span className="text-primary">{selectedYear === "last" ? "the past year" : selectedYear}</span>
        </p>
      </div>
      
      {/* Decorative background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-cyan-600/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </motion.div>
  );
}
