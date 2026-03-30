"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { heroData } from "@/data/hero";
import Container from "@/components/Container";
import Image from "next/image";
import { SiPython, SiDjango, SiReact, SiWordpress } from "react-icons/si";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useVisitor } from "@/context/VisitorContext";

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const iconVariants: Variants = {
  animate: (i: number) => ({
    y: [0, -12, 0],
    rotate: [0, 4, -4, 0],
    transition: {
      duration: 4 + i * 0.4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.6,
    },
  }),
};

// ─── Typing Animation Hook ────────────────────────────────────────────────────

function useTypingEffect(words: string[], speed = 80, pause = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : currentWord.slice(0, prev.length + 1)
        );
      }, isDeleting ? speed / 2 : speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, speed, pause]);

  return displayText;
}

// ─── Social Icon Map ──────────────────────────────────────────────────────────

const socialIconMap: Record<string, React.ElementType> = {
  FiGithub,
  FiLinkedin,
  FiMail,
};

// ─── Portrait Card with Mouse-Tilt ───────────────────────────────────────────

function PortraitCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className="relative w-full max-w-[280px] h-[380px] sm:w-72 md:w-[300px] md:h-[460px] select-none cursor-pointer"
    >
      {/* Animated gradient glow border */}
      <div className="absolute inset-0 rounded-2xl z-0 p-[2px]">
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            background: [
              "linear-gradient(135deg, #22d3ee, #818cf8, #a855f7)",
              "linear-gradient(225deg, #a855f7, #22d3ee, #818cf8)",
              "linear-gradient(315deg, #818cf8, #a855f7, #22d3ee)",
              "linear-gradient(45deg, #22d3ee, #818cf8, #a855f7)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ opacity: 0.7, filter: "blur(1px)" }}
        />
      </div>

      {/* Portrait image container */}
      <div className="absolute inset-[2px] rounded-2xl overflow-hidden z-10 bg-slate-800/50 backdrop-blur-sm border border-white/5">
        <Image
          src={heroData.imageSrc}
          alt={heroData.imageAlt}
          fill
          className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Subtle inner shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Floating Tech Icons */}
      {[
        { Icon: SiPython, color: "#3776AB", pos: "absolute -top-5 -left-5 w-12 h-12", custom: 0 },
        { Icon: SiDjango, color: "#44B78B", pos: "absolute top-1/4 -right-7 w-14 h-14", custom: 1 },
        { Icon: SiReact, color: "#61DAFB", pos: "absolute -bottom-5 left-1/4 w-12 h-12", custom: 2 },
        { Icon: SiWordpress, color: "#21759b", pos: "absolute bottom-10 -right-5 w-11 h-11", custom: 3 },
      ].map(({ Icon, color, pos, custom }) => (
        <motion.div
          key={custom}
          custom={custom}
          variants={iconVariants}
          animate="animate"
          className={`${pos} glass flex items-center justify-center rounded-xl z-20 shadow-lg`}
          style={{ color }}
          whileHover={{ scale: 1.2, rotate: 10 }}
        >
          <Icon size={custom === 1 ? 28 : 22} />
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function Hero() {
  const { visitorName } = useVisitor();
  const [mounted, setMounted] = useState(false);
  const typedText = useTypingEffect(heroData.roles, 75, 2200);

  useEffect(() => {
    setMounted(true);
  }, []);

  const personalizedGreeting = mounted && visitorName 
    ? `Hi ${visitorName}, I'm Harish 👋` 
    : heroData.greeting;

  const displayTypedText = mounted ? typedText : "";
  const displayGreeting = mounted ? personalizedGreeting : heroData.greeting;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-40 pb-16 overflow-hidden"
    >
      <Container className="w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-center">

          {/* ── Left Column ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Greeting badge */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-lg font-bold border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-lg shadow-cyan-500/10">
                {displayGreeting}
              </span>
            </motion.div>

            {/* Professional Status Line - Minimalist & Responsive */}
            <motion.div variants={itemVariants} className="mb-6 mt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 text-sm font-medium transition-all pointer-events-auto">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">Currently</span>
                </div>
                
                <div className="flex items-center gap-1.5 flex-wrap justify-center lg:justify-start">
                    <span className="text-indigo-400 whitespace-nowrap">{heroData.currentWork.role}</span>
                    <span className="text-slate-600">@</span>
                    <a 
                      href={heroData.currentWork.companyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-200 hover:text-indigo-400 transition-colors underline decoration-indigo-500/30 underline-offset-4"
                    >
                      {heroData.currentWork.company}
                    </a>
                    <span className="hidden sm:inline-block mx-1 text-slate-800 tracking-tighter">|</span>
                    <span className="text-indigo-300/80 text-[11px] font-semibold whitespace-nowrap">{heroData.currentWork.yearsExperience} Experience</span>
                </div>
            </motion.div>

            {/* Typing animated title */}
            <motion.h1
              variants={itemVariants}
              className="mb-6 text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight whitespace-nowrap"
            >
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                {displayTypedText}
              </span>
              <span className="inline-block w-[2px] sm:w-[3px] h-[0.9em] ml-1 bg-cyan-400 align-middle animate-pulse rounded-sm" />
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="max-w-lg mb-10 text-slate-400 text-lg leading-relaxed"
            >
              {heroData.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <motion.a
                href={heroData.ctas[0].href}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 text-base font-semibold text-white rounded-lg transition-all bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                {heroData.ctas[0].name}
              </motion.a>
              <motion.a
                href={heroData.ctas[1].href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 text-base font-semibold text-white rounded-lg transition-all border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
              >
                {heroData.ctas[1].name}
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              <span className="text-slate-500 text-sm">Find me on</span>
              <div className="flex items-center gap-3">
                {heroData.socials.map((social) => {
                  const Icon = socialIconMap[social.icon];
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target={social.name !== "Email" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors"
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Column ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Background glow blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(34,211,238,0.10) 50%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <PortraitCard />
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2">
          <motion.p
            className="text-xs text-slate-500 tracking-widest uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            Scroll
          </motion.p>
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-1.5">
            <motion.div
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
