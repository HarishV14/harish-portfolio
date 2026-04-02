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
  
  // Scale range: 0.35 (back) to 1.35 (front)
  const scale = 0.85 + (normZ * 0.5);
  // Opacity range: 0.1 (back) to 1.0 (front)
  const opacity = 0.55 + (normZ * 0.45);
  
  // Simplified styling for performance
  const brightness = normZ > 0.3 ? 1.1 : normZ < -0.3 ? 0.6 : 0.8;
  const grayscale = normZ < -0.3 ? 0.4 : 0;
  
  const floatDelay = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < skill.id.length; i++) {
        hash = skill.id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 2000) / 1000; 
  }, [skill.id]);

  const active = isHighlighted || isHovered;
  const isFront = z > radius * 0.5; // Changed threshold to be radius-dependent

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x: x - hitOffset,
        y: y - hitOffset,
        zIndex: Math.round(z + 1000),
        willChange: "transform, opacity",
      }}
      animate={{
        scale: isHovered ? scale * 1.25 : scale,
        opacity: isHovered ? 1 : opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
        mass: 0.5
      }}
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
      <motion.div
        animate={{
          y: [-1, 1, -1],
          filter: active ? `brightness(1.2) drop-shadow(0 0 12px ${skill.color}66)` : `brightness(${brightness}) grayscale(${grayscale})`
        }}
        transition={{
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay,
          },
          filter: { duration: 0.2 }
        }}
        className="flex flex-col items-center gap-2.5"
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
                    filter: isFront && !active ? `drop-shadow(0 0 6px ${skill.color}33)` : "none"
                }}
            />
        </div>

        {/* Text below - Simplified with opacity instead of AnimatePresence to avoid DOM flickers */}
        <div
          className="text-[10px] font-bold tracking-[0.15em] text-white/90 text-center uppercase whitespace-nowrap select-none transition-all duration-300"
          style={{ 
            opacity: isFront || isHovered ? 1 : 0,
            transform: `scale(${isFront || isHovered ? 1 : 0.8})`,
            marginTop: "4px"
          }}
        >
          {skill.name}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(SkillIcon);
