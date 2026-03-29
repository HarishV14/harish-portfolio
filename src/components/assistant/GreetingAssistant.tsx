"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AssistantBubble from "./AssistantBubble";
import AssistantPanel from "./AssistantPanel";
import { useVisitor } from "@/context/VisitorContext";

export default function GreetingAssistant() {
  const { visitorName } = useVisitor();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if assistant was dismissed this session
    const isDismissed = sessionStorage.getItem("portfolioAssistantDismissed");
    if (isDismissed === "true") return;

    // Initial delay before showing the assistant bubble
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Auto-open if no name is stored
      if (!visitorName) {
        setIsOpen(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [visitorName]);

  const handleClose = () => {
    setIsOpen(false);
    // Persist dismissal for this session
    sessionStorage.setItem("portfolioAssistantDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <>
      <AssistantBubble onClick={() => setIsOpen(true)} isOpen={isOpen} />
      <AnimatePresence>
        {isOpen && <AssistantPanel onClose={handleClose} />}
      </AnimatePresence>
    </>
  );
}
