"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Skill } from "@/types/skills";
import SkillIcon from "./SkillIcon";

interface SkillSphereProps {
  skills: Skill[];
}

const SkillSphere: React.FC<SkillSphereProps> = ({ skills }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(180); // Reduced radius
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [highlightedSkillId, setHighlightedSkillId] = useState<string | null>(null);

  // Initial tilt and slower rotation
  const rotation = useRef({ x: -0.15, y: 0.1 }); 
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 480) setRadius(100);
      else if (width < 640) setRadius(120);
      else if (width < 1024) setRadius(140);
      else setRadius(155); 
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    lastMousePos.current = { x: clientX, y: clientY };
    if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;

    rotation.current.y += deltaX * 0.005;
    rotation.current.x -= deltaY * 0.005;

    lastMousePos.current = { x: clientX, y: clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const points = useMemo(() => {
    const samples = skills.length;
    const offset = 2 / samples;
    const increment = Math.PI * (3 - Math.sqrt(5));

    return skills.map((skill, i) => {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      return {
        skill,
        initialX: Math.cos(phi) * r,
        initialY: y,
        initialZ: Math.sin(phi) * r,
      };
    });
  }, [skills]);

  // Higher density wireframe values
  const wireframeValues = useMemo(() => {
    const lines = 12;
    return Array.from({ length: lines }, (_, i) => ({
      ry: Math.round(400 * Math.sin((i + 1) * Math.PI / (lines + 1)) * 1000) / 1000,
      rx: Math.round(400 * Math.sin((i + 1) * Math.PI / (lines + 1)) * 1000) / 1000,
      rotate: Math.round(i * (180 / lines) * 1000) / 1000,
    }));
  }, []);


  const [positions, setPositions] = useState<{ skill: Skill; x: number; y: number; z: number }[]>([]);

  useEffect(() => {
    let aniFrame: number;
    const updatePositions = () => {
      if (!isDragging.current) {
        rotation.current.y += 0.0035; // Increased from 0.002
        rotation.current.x += 0.0015; // Increased from 0.001
      }

      const cosX = Math.cos(rotation.current.x);
      const sinX = Math.sin(rotation.current.x);
      const cosY = Math.cos(rotation.current.y);
      const sinY = Math.sin(rotation.current.y);

      let maxZ = -Infinity;
      let closestSkillId = null;

      const newPositions = points.map((p) => {
        const x1 = p.initialX * cosY - p.initialZ * sinY;
        const z1 = p.initialX * sinY + p.initialZ * cosY;
        const y2 = p.initialY * cosX - z1 * sinX;
        const z2 = p.initialY * sinX + z1 * cosX;

        const x = x1 * radius;
        const y = y2 * radius;
        const z = z2 * radius;

        if (z > maxZ) {
          maxZ = z;
          closestSkillId = p.skill.id;
        }

        return { skill: p.skill, x, y, z };
      });

      setPositions(newPositions);
      setHighlightedSkillId(closestSkillId);
      aniFrame = requestAnimationFrame(updatePositions);
    };

    aniFrame = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(aniFrame);
  }, [points, radius]);

  const handleHover = (id: string | null) => {
    setHoveredSkillId(id);
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
      style={{ 
        width: radius * 2.4, 
        height: radius * 2.4,
        perspective: 1500
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* Enhanced Globe Wireframe */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
            transform: `rotateX(${rotation.current.x}rad) rotateY(${rotation.current.y}rad)`,
            transformStyle: "preserve-3d",
            transition: "opacity 0.5s ease-out"
        }}
      >
        <svg viewBox="0 0 1000 1000" className="w-full h-full text-[#6366f1]">
          {/* Main circles for clarity */}
          <circle cx="500" cy="500" r="400" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="500" cy="500" r="380" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          
          {/* Intersection Points for "Detailing" */}
          <circle cx="500" cy="100" r="3" fill="currentColor" />
          <circle cx="500" cy="900" r="3" fill="currentColor" />
          <circle cx="100" cy="500" r="3" fill="currentColor" />
          <circle cx="900" cy="500" r="3" fill="currentColor" />

          {/* Horizontal lines */}
          {wireframeValues.map(({ ry }, i) => (
            <ellipse 
              key={`h-${i}`}
              cx="500" cy="500" 
              rx="400"
              ry={ry}
              fill="none" 
              stroke="currentColor" 
              strokeWidth={i % 4 === 0 ? "1.2" : "0.5"} 
              strokeDasharray={i % 4 === 0 ? "none" : "3 6"}
            />
          ))}
          
          {/* Vertical lines */}
          {wireframeValues.map(({ rotate }, i) => (
            <ellipse 
              key={`v-${i}`}
              cx="500" cy="500" 
              rx={400}
              ry="400" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={i % 4 === 0 ? "1.2" : "0.5"} 
              strokeDasharray={i % 4 === 0 ? "none" : "3 6"}
              transform={`rotate(${rotate}, 500, 500)`}
            />
          ))}
        </svg>
      </div>

      {/* Structured Detailing rather than just blur */}
      <div 
        className="absolute inset-0 rounded-full border border-[#6366f1]/20 pointer-events-none"
        style={{ transform: "scale(1.05)" }}
      />
      <div 
        className="absolute inset-0 rounded-full border border-[#6366f1]/10 pointer-events-none"
        style={{ transform: "scale(1.1)" }}
      />

      <div 
        className="absolute inset-0 rounded-full blur-[80px] opacity-[0.1] pointer-events-none -z-10"
        style={{ 
          background: "radial-gradient(circle, #6366f1 0%, #a855f7 30%, transparent 70%)"
        }}
      />
      
      {/* Container for icons */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {positions.map((pos) => (
          <SkillIcon
            key={pos.skill.id}
            skill={pos.skill}
            x={pos.x}
            y={pos.y}
            z={pos.z}
            radius={radius}
            isHighlighted={pos.skill.id === highlightedSkillId && hoveredSkillId === null}
            isHovered={pos.skill.id === hoveredSkillId}
            onHover={handleHover}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(SkillSphere);
