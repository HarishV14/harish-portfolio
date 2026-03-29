"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface VisitorContextType {
  visitorName: string | null;
  setVisitorName: (name: string) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export function VisitorProvider({ children }: { children: React.ReactNode }) {
  const [visitorName, setVisitorNameState] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("portfolioVisitorName");
    if (savedName) {
      setVisitorNameState(savedName);
    }
  }, []);

  const setVisitorName = (name: string) => {
    localStorage.setItem("portfolioVisitorName", name);
    setVisitorNameState(name);
  };

  return (
    <VisitorContext.Provider value={{ visitorName, setVisitorName, isMuted, setIsMuted }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  const context = useContext(VisitorContext);
  if (context === undefined) {
    throw new Error("useVisitor must be used within a VisitorProvider");
  }
  return context;
}
