"use client";

import { motion } from "framer-motion";
import { FiStar, FiGitBranch, FiBook } from "react-icons/fi";
import { GithubRepo } from "@/types/github";

interface GithubReposProps {
  repos: GithubRepo[];
}

export default function GithubRepos({ repos }: GithubReposProps) {
  // We'll show up to 6 repos if available to match the 2-column screenshot look
  const displayRepos = repos.slice(0, 6);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {displayRepos.map((repo, index) => (
        <motion.div
          key={repo.name}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -4, borderColor: "rgba(99, 102, 241, 0.4)" }}
          className="p-5 rounded-xl bg-[#0d1117]/40 border border-white/10 hover:bg-[#161b22]/60 transition-all duration-300 flex flex-col group cursor-pointer relative"
          onClick={() => window.open(repo.html_url, "_blank")}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <FiBook className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
              <h3 className="text-[15px] font-semibold text-primary group-hover:underline decoration-primary/30 underline-offset-4">
                {repo.name}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-slate-500 font-medium whitespace-nowrap">
                Public
              </span>
            </div>
          </div>
          
          <p className="text-[13px] text-slate-400 line-clamp-2 leading-relaxed mb-6 flex-1 pr-4">
            {repo.description || "No description provided for this repository."}
          </p>

          <div className="flex items-center gap-4 text-[12px] text-slate-500">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
                <span>{repo.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1 hover:text-yellow-500/80 transition-colors">
              <FiStar className="w-3.5 h-3.5" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-blue-500/80 transition-colors">
              <FiGitBranch className="w-3.5 h-3.5" />
              <span>{repo.forks_count}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
