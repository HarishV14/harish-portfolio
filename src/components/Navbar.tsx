"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/navigation";
import { siteMetadata } from "@/data/site";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrollingManually, setIsScrollingManually] = useState(false);

  // Scroll spy logic with throttling
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      // Don't update active tab if we're currently scrolling via a click
      if (isScrollingManually) return;

      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        let currentActive = "";
        navLinks.forEach(link => {
          const id = link.href.substring(1);
          const section = document.getElementById(id);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              currentActive = id;
            }
          }
        });
        
        if (window.scrollY < 100) currentActive = "";
        setActiveTab(currentActive);
        timeoutId = null;
      }, 100); // 100ms throttle
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isScrollingManually]);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveTab(id);
    setIsScrollingManually(true);
    setMobileMenuOpen(false);

    // Dynamic import to avoid SSR issues with Lenis
    import("lenis").then((LenisModule) => {
        const section = document.getElementById(id);
        if (section) {
            const scrollOffset = 0; // Adjust if needed
            window.scrollTo({
                top: section.offsetTop - scrollOffset,
                behavior: "smooth"
            });
            
            // Allow scroll spy to take over after animation
            setTimeout(() => setIsScrollingManually(false), 1000);
        }
    });
  };

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto mt-2">
      {/* Pill Container */}
    <nav className="flex items-center justify-between gap-2 lg:gap-6 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg ring-1 ring-white/5">
        
        <Link 
          href="/" 
          onClick={(e) => { 
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveTab(""); 
          }} 
          className="text-lg font-bold text-white mr-2 lg:mr-4 whitespace-nowrap pl-2 sm:pl-0 hover:text-cyan-400 transition-colors"
        >
          {siteMetadata.title}
        </Link>

        {/* Desktop Links with Sliding Gradient */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeTab === id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, id)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/80 to-purple-500/80 rounded-full -z-10 shadow-lg shadow-cyan-500/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    style={{ willChange: "transform, opacity" }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>
        
        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href={siteMetadata.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-5 py-2 text-sm font-medium text-white border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 rounded-full transition-all whitespace-nowrap"
          >
            Resume
          </a>

          <button 
            className="lg:hidden text-gray-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors mr-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown matching pill aesthetic */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden absolute top-full left-0 right-0 mt-4 mx-auto p-3 rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-2xl flex flex-col gap-1.5 origin-top"
          >
             {navLinks.map((link) => {
                const id = link.href.substring(1);
                const isActive = activeTab === id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, id)}
                    className={`px-4 py-3 text-sm font-medium rounded-2xl transition-all text-center ${
                      isActive ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-white border border-cyan-500/30" : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </a>
                );
             })}
              <a
                href={siteMetadata.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl transition-all hover:brightness-110 shadow-lg shadow-cyan-500/20"
              >
                Download Resume
              </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
