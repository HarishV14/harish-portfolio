"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "Tell me about your experience",
  "What technologies do you use?",
  "What projects have you worked on?",
  "How can I contact you?",
];

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 px-4 py-3 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none w-16 shadow-inner items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
        className="w-1.5 h-1.5 bg-purple-500 rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
        className="w-1.5 h-1.5 bg-purple-500/60 rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
        className="w-1.5 h-1.5 bg-purple-500/30 rounded-full"
      />
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function MessageBubble({ message, mounted }: { message: Message; mounted: boolean }) {
  const isUser = message.role === "user";

  const renderContent = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part.split("\n").map((line, j, arr) => (
        <span key={`${i}-${j}`}>
          {line}
          {j < arr.length - 1 && <br />}
        </span>
      ));
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col gap-1.5 max-w-[85%] ${isUser ? "self-end items-end" : "self-start items-start"}`}
    >
      <div
        className={`px-4 py-3 text-sm leading-relaxed rounded-2xl shadow-lg ${
          isUser
            ? "bg-purple-600 text-white rounded-br-none border border-white/10"
            : "bg-white/5 text-gray-300 rounded-tl-none border border-white/5"
        }`}
      >
        {renderContent(message.content)}
      </div>
      <span className="text-[10px] text-gray-500 font-medium px-1">
        {isUser ? "You" : "Assistant"} {mounted && `· ${message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
      </span>
    </motion.div>
  );
}

// ─── Chat Assistant ────────────────────────────────────────────────────────────

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [mounted, setMounted] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setMessages([{
      id: "init",
      role: "assistant",
      content: "Hey there! 👋 Ask me anything about Harish — his projects, skills, or experience.",
      timestamp: new Date(),
    }]);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isLoading, scrollToBottom]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setShowSuggestions(false);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();

      setMessages((prev) => [...prev, {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply ?? "Sorry, I encountered an error. Try again?",
        timestamp: new Date(),
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "I'm having trouble connecting right now.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative w-full max-w-md mx-auto lg:max-w-none"
    >
      <div className="absolute inset-0 bg-purple-500/10 blur-[60px] -z-10 rounded-3xl" />

      <div className="relative h-[520px] bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden shadow-purple-500/5">
        {!mounted ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
             <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col h-full"> 
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/5 shrink-0">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-[11px] font-bold border border-white/10 shadow-xl">
                  HV
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-white">Harish's Assistant</h4>
                <p className="text-[10px] text-green-400 font-medium tracking-wide uppercase">AI Online</p>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 custom-scrollbar touch-pan-y"
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} mounted={mounted} />
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start">
                  <TypingIndicator />
                </motion.div>
              )}
              
              <div className="h-2 shrink-0" />
            </div>

            {/* Footer */}
            <div className="p-4 bg-white/5 border-t border-white/5 space-y-4 shrink-0">
              {showSuggestions && (
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[10px] text-gray-300 transition-all font-medium"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage(input))}
                  placeholder="Ask me anything..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <FiSend size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
