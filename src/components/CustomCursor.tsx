"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  
  // Smooth springs for outer ring for highly polished trailing effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const cursorScaleSpring = useSpring(cursorScale, springConfig);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      // Identify interactive elements dynamically without binding strict React events directly
      const isPointer = window.getComputedStyle(target).cursor === 'pointer' || target.closest('a') || target.closest('button');
      cursorScale.set(isPointer ? 1.5 : 1);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted) return null;

  return (
    <>
      {/* Outer cyan ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-cyan-400 rounded-full pointer-events-none z-[9999] opacity-0 md:opacity-100 hidden md:block"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          x: cursorXSpring,
          y: cursorYSpring,
          scale: cursorScaleSpring,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Inner orange dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-orange-500 rounded-full pointer-events-none z-[9999] opacity-0 md:opacity-100 hidden md:block"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          x: cursorX, // Immediate follow
          y: cursorY, // Immediate follow
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
