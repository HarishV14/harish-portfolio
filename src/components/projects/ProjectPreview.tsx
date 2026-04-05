"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectPreviewProps {
  image: string;
  title: string;
  gradient: string;
}

export default function ProjectPreview({ image, title, gradient }: ProjectPreviewProps) {
  return (
    <div 
      className={cn(
        "relative w-full aspect-video rounded-3xl overflow-hidden glass border border-white/10 shadow-sm transition-all duration-300 group mt-2 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br", 
        gradient
      )}
    >
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-0"></div>
      
      {/* Image container */}
      <div className="relative z-10 w-full h-full rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
        {/* Next.js Image Component */}
        <Image 
          src={image} 
          alt={`Project preview - ${title}`} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top" 
        />
      </div>
    </div>
  );
}
