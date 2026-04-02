"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
}

export default function SectionWrapper({
  children,
  id,
  className,
  containerClassName,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={cn("scroll-mt-0", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Container className={containerClassName}>
        {children}
      </Container>
    </motion.section>
  );
}
