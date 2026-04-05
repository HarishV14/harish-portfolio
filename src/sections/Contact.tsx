"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactData } from "@/data/contact";
import SectionWrapper from "@/components/SectionWrapper";
import { FiCopy, FiCheck, FiSend } from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function Contact() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formState, setFormState] = useState<"idle" | "sending" | "success">("idle");

  const handleCopy = (id: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    const formData = new FormData(e.currentTarget);
    // Use environment variable for Web3Forms Access Key
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
      alert("Form submission is currently not configured. Please add the Access Key to your environment variables.");
      setFormState("idle");
      return;
    }
    
    formData.append("access_key", accessKey); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormState("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        console.error("Error", data);
        setFormState("idle");
        alert("Something went wrong. Please try again or use the direct email.");
      }
    } catch (error) {
      console.error("Submit Error", error);
      setFormState("idle");
      alert("Something went wrong. Please try again or use the direct email.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <SectionWrapper id="contact" className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT SIDE: Info */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-highlight/10 border border-highlight/20 text-highlight text-sm font-medium w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-highlight"></span>
                </span>
                {contactData.availabilityBadge}
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Contact
              </h2>
              <p className="text-lg text-slate-400 max-w-md pb-4">
                {contactData.description}
              </p>
            </motion.div>

            {/* Contact Cards Grid - Redesigned as compact pill cards */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {contactData.info.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="group relative flex items-center gap-3 bg-slate-900/40 backdrop-blur-md border border-white/5 hover:border-primary/40 p-2 pr-4 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                >
                  {/* Small Icon Wrapper */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon className="w-4 h-4" />
                  </div>
                  
                  {/* Value and Copy Logic */}
                  <div className="flex items-center gap-3">
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      {item.id === "phone" ? item.value : item.value}
                    </a>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Copy the full URL for social links, but keep email/phone clean
                        const copyValue = ["github", "linkedin"].includes(item.id) ? item.href : item.value;
                        handleCopy(item.id, copyValue);
                      }}
                      className="text-slate-500 hover:text-primary transition-colors flex items-center justify-center shrink-0"
                      title={`Copy ${item.label}`}
                    >
                      {copiedId === item.id ? (
                        <span className="flex items-center gap-1 text-[10px] text-highlight font-bold uppercase tracking-tighter">
                          <FiCheck className="w-3 h-3" />
                        </span>
                      ) : (
                        <FiCopy className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-300 ml-1">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Your Name"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white placeholder:text-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-300 ml-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Your Email"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white placeholder:text-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-300 ml-1">Message</label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  placeholder="How can I help you?"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-white placeholder:text-slate-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formState !== "idle"}
                className={cn(
                  "w-full group relative flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all duration-300 overflow-hidden",
                  formState === "idle" ? "bg-primary text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]" : "bg-slate-800 text-slate-400 cursor-not-allowed"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <AnimatePresence mode="wait">
                  {formState === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <span>Send Message</span>
                      <FiSend className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.div>
                  )}
                  {formState === "sending" && (
                    <motion.div
                      key="sending"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </motion.div>
                  )}
                  {formState === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-highlight"
                    >
                      <FiCheck className="w-6 h-6" />
                      <span>Message Sent!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>

            <AnimatePresence>
              {formState === "success" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 z-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-20 h-20 rounded-full bg-highlight/20 flex items-center justify-center text-highlight mb-4 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                  >
                    <FiCheck className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
                  <p className="text-slate-400">Your message has been sent successfully. I&apos;ll get back to you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
