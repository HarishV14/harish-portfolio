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

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      let currentActive = "";
      
      // Iterate via bounding sizes against viewport dynamically
      navLinks.forEach(link => {
        const id = link.href.substring(1);
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Allow active tab when section scrolls into the top 250px (accounting for sticky nav)
          if (rect.top <= 250) {
            currentActive = id;
          }
        }
      });
      // Clear tab context if scrolled completely to the top Hero
      if (window.scrollY < 50) currentActive = "";
      
      setActiveTab(currentActive);
    };

    // Attach passive listener for better performance with Lenis
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Execute initialization
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto mt-2">
      {/* Pill Container */}
      <nav className="flex items-center justify-between sm:justify-center gap-2 lg:gap-6 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg">
        
        <Link 
          href="/" 
          onClick={() => { window.scrollTo(0, 0); setActiveTab(""); }} 
          className="text-lg font-bold text-white mr-2 lg:mr-4 whitespace-nowrap pl-2 sm:pl-0"
        >
          {siteMetadata.title}
        </Link>

        {/* Desktop Links with Sliding Gradient */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeTab === id;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActiveTab(id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                  isActive ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>
        
        {/* Right Actions */}
        <div className="flex items-center gap-3 ml-auto sm:ml-2">
          <a
            href={siteMetadata.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-5 py-2 text-sm font-medium text-white border border-white/10 hover:bg-white/10 rounded-full transition-colors whitespace-nowrap"
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
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 mt-4 mx-auto p-4 rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl flex flex-col gap-2 origin-top"
          >
             {navLinks.map((link) => {
                const id = link.href.substring(1);
                const isActive = activeTab === id;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setActiveTab(id);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors text-center ${
                      isActive ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30" : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
             })}
              <a
                href={siteMetadata.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl transition-opacity hover:opacity-90 shadow-lg shadow-cyan-500/25"
              >
                Download Resume
              </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
