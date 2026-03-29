"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiVolume2, FiVolumeX, FiArrowRight, FiExternalLink, FiDownload, FiMail } from "react-icons/fi";
import { useVisitor } from "@/context/VisitorContext";

interface AssistantPanelProps {
  onClose: () => void;
}

export default function AssistantPanel({ onClose }: AssistantPanelProps) {
  const { visitorName, setVisitorName, isMuted, setIsMuted } = useVisitor();
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState<"name" | "greeted">("name");

  useEffect(() => {
    if (visitorName) {
      setStep("greeted");
    }
  }, [visitorName]);

  const speak = (text: string) => {
    if (isMuted || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 0.8;
    utterance.rate = 1;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const handleStart = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    setVisitorName(inputValue.trim());
    setStep("greeted");
    const greetText = `Nice to meet you ${inputValue.trim()}! Welcome to Harish's portfolio.`;
    speak(greetText);
  };

  const handleSkip = () => {
    onClose();
  };

  const actions = [
    { name: "Explore My Work", href: "#experience", icon: FiExternalLink },
    { name: "Download Resume", href: "/document/Harish%20V%20Resume.pdf", icon: FiDownload, download: true },
    { name: "Contact Me", href: "#contact", icon: FiMail },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 50, opacity: 0, scale: 0.95 }}
      style={{ transformOrigin: "bottom right" }}
      className="fixed bottom-6 right-6 z-[9999] w-[calc(100vw-3rem)] sm:w-80 md:w-96 rounded-2xl glass border border-white/10 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center text-white text-xs">
            HV
          </div>
          <span className="font-semibold text-sm text-slate-200">Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isMuted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {step === "name" ? (
            <motion.div
              key="step-name"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  👋 Hi there!
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  I&apos;m Harish. I&apos;m excited to have you here. What should I call you?
                </p>
              </div>

              <form onSubmit={handleStart} className="space-y-4">
                <div className="relative group">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Your name..."
                    className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all outline-none"
                    autoFocus
                  />
                  <FiArrowRight
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-all ${
                      inputValue.trim() ? "text-indigo-400 opacity-100" : "text-slate-600 opacity-0"
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="h-10 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="h-10 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 rounded-xl shadow-lg shadow-purple-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Start
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="step-greeted"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">
                  Nice to meet you, <span className="text-indigo-400">{visitorName}</span>! ✨
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Welcome to my digital space. How can I help you navigate?
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {actions.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target={item.download ? "_blank" : undefined}
                    rel={item.download ? "noopener noreferrer" : undefined}
                    download={item.download}
                    whileHover={{ x: 6, backgroundColor: "rgba(255,255,255,0.08)" }}
                    onClick={() => !item.download && onClose()}
                    className="group flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 transition-all outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                        <item.icon size={16} />
                      </div>
                      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <FiArrowRight size={14} className="text-slate-600 group-hover:text-indigo-400 transition-all opacity-0 group-hover:opacity-100" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Accent */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600" />
    </motion.div>
  );
}
