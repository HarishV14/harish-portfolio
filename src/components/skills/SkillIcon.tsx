"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skill } from "@/types/skills";

interface SkillIconProps {
  skill: Skill;
  x: number;
  y: number;
  z: number;
  radius: number;
  isHighlighted: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const SkillIcon: React.FC<SkillIconProps> = ({
  skill,
  x,
  y,
  z,
  radius,
  isHighlighted,
  isHovered,
  onHover,
}) => {
  // Derive icon size from sphere radius so icons never feel too large on mobile
  const iconSize = radius <= 100 ? 22 : radius <= 120 ? 26 : radius <= 140 ? 28 : 32;
  const hitOffset = iconSize / 2;
  // Normalize Z for depth effects (-radius to +radius)
  const normZ = z / radius; 
  
  // More aggressive depth effects for a "sphere" look
  // Scale range: 0.35 (back) to 1.35 (front)
  const scale = 0.85 + (normZ * 0.5);
  
  // Opacity range: 0.1 (back) to 1.0 (front)
  const opacity = 0.55 + (normZ * 0.45);
  
  // Filter for front/back icons
  const filter = normZ > 0.3 
    ? `brightness(1.1) contrast(1.1) drop-shadow(0 0 15px ${skill.color}33)` 
    : normZ < -0.3 
        ? "brightness(0.6) grayscale(0.4) blur(1px)" 
        : "brightness(0.8)";
  
  const floatDelay = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < skill.id.length; i++) {
        hash = skill.id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 2000) / 1000; 
  }, [skill.id]);

  const active = isHighlighted || isHovered;
  const isFront = z > 80; // Threshold for "looking front"

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x: x - hitOffset,
        y: y - hitOffset,
        zIndex: Math.round(z + 1000),
      }}
      animate={{
        scale: isHovered ? scale * 1.25 : scale,
        opacity: isHovered ? 1 : opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
      }}
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
      <motion.div
        animate={{
          y: [-1.5, 1.5, -1.5],
          filter: active ? `drop-shadow(0 0 20px ${skill.color}66)` : filter
        }}
        transition={{
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay,
          },
          filter: { duration: 0.3 }
        }}
        className="flex flex-col items-center gap-3"
      >
        <div 
            className="transition-transform duration-300"
            style={{ 
                transform: active ? "scale(1.15)" : "none",
            }}
        >
            <skill.icon 
                size={iconSize} 
                className="transition-colors duration-300"
                style={{ 
                    color: skill.color,
                    filter: isFront ? `drop-shadow(0 0 8px ${skill.color}44)` : "none"
                }}
            />
        </div>

        {/* Text below - Only visible for front icons or hovered ones */}
        <AnimatePresence>
          {(isFront || isHovered) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 5 }}
              className="text-[10px] font-bold tracking-[0.2em] text-white text-center uppercase whitespace-nowrap drop-shadow-sm select-none"
            >
              {skill.name}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(SkillIcon);
