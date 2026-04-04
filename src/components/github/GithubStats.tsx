"use client";

import { motion } from "framer-motion";
import { FiBox, FiGitCommit, FiZap, FiTarget } from "react-icons/fi";
import { GithubUser } from "@/types/github";

interface GithubStatsProps {
  user: GithubUser;
}

export default function GithubStats({ user }: GithubStatsProps) {
  const stats = [
    {
      label: "Contributions",
      value: user.totalContributions || 0,
      icon: <FiGitCommit className="w-3.5 h-3.5 text-emerald-400" />,
    },
    {
      label: "Curr Streak",
      value: `${user.currentStreak || 0}d`,
      icon: <FiZap className="w-3.5 h-3.5 text-yellow-400" />,
    },
    {
      label: "Longest Streak",
      value: `${user.longestStreak || 0}d`,
      icon: <FiTarget className="w-3.5 h-3.5 text-orange-400" />,
    },
    {
      label: "Repos",
      value: user.public_repos,
      icon: <FiBox className="w-3.5 h-3.5 text-indigo-400" />,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300 group shadow-lg shadow-black/20"
        >
          <span className="opacity-70 group-hover:opacity-100 transition-opacity">
            {stat.icon}
          </span>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[13px] font-bold text-white/90">
              {stat.value}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-[0.1em] text-slate-500">
              {stat.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
