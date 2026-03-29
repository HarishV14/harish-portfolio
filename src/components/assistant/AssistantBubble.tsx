"use client";

import { motion } from "framer-motion";

interface AssistantBubbleProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function AssistantBubble({ onClick, isOpen }: AssistantBubbleProps) {
  if (isOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl shadow-purple-500/20 ring-4 ring-purple-500/10 cursor-pointer"
      aria-label="Open assistant"
    >
      <span className="text-2xl animate-pulse">👋</span>
    </motion.button>
  );
}
