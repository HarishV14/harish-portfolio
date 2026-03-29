import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import BackgroundParticles from "@/components/BackgroundParticles";
import GreetingAssistant from "@/components/assistant/GreetingAssistant";
import { VisitorProvider } from "@/context/VisitorContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "Modern developer portfolio built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-background text-foreground" suppressHydrationWarning>
        <VisitorProvider>
          <BackgroundParticles />
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            {children}
            <GreetingAssistant />
          </SmoothScroll>
        </VisitorProvider>
      </body>
    </html>
  );
}
