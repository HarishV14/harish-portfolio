import { getGithubUser, getGithubRepos, getLatestCommit } from "@/lib/github";
import { GithubRepo, GithubUser, LatestCommit } from "@/types/github";
import GithubCalendarCard from "@/components/github/GithubCalendarCard";
import GithubStats from "@/components/github/GithubStats";
import GithubRepos from "@/components/github/GithubRepos";
import SectionHeader from "@/components/github/SectionHeader";
import SectionWrapper from "@/components/SectionWrapper";
import { FiGithub, FiAlertCircle } from "react-icons/fi";

export default async function Github() {
  let user: GithubUser | null = null;
  let repos: GithubRepo[] = [];
  let commit: LatestCommit | null = null;
  let error = false;

  try {
    const [userData, reposData, commitData] = await Promise.all([
      getGithubUser(),
      getGithubRepos(),
      getLatestCommit(),
    ]);
    user = userData;
    repos = reposData;
    commit = commitData;
  } catch (err) {
    console.error("Error fetching GitHub data:", err);
    error = true;
  }

  return (
    <SectionWrapper id="github" className="pt-24 md:pt-36 pb-24 scroll-mt-24 relative overflow-hidden">
      {/* Background Dots */}
      <div 
        className="absolute inset-0 opacity-5 -z-10 pointer-events-none"
        style={{ 
          backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }}
      />

      <SectionHeader
        label="Technical Journey"
        title="Github Activity"
        subtitle="A live snapshot of my coding journey, open-source contributions, and featured libraries."
      />

      {error || !user ? (
        <div className="flex flex-col items-center justify-center space-y-6 py-12 px-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="p-4 rounded-full bg-yellow-500/10 text-yellow-500">
            <FiAlertCircle className="w-8 h-8" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-white">GitHub Activity Unavailable</h3>
            <p className="text-slate-400 max-w-md mx-auto text-sm">
              Unable to fetch live data. Please check your connection or view my profile manually.
            </p>
          </div>
          <a
            href="https://github.com/HarishV14"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-all shadow-lg"
          >
            <FiGithub className="w-5 h-5" />
            View GitHub Profile
          </a>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Quick Stats Pills */}
          <div className="flex justify-center -mt-8">
             <GithubStats user={user} />
          </div>
          
          {/* Activity Graph Section with Integrated Commit Pulse */}
          <div className="space-y-6 pt-8 md:pt20">
            <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
              <div className="text-center md:text-left">
                <span className="text-[10px] font-bold tracking-[0.3em] text-accent/60 uppercase mb-2 block">
                  Activity Graph
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-none">
                  Contribution Pipeline
                </h3>
              </div>

              {commit && (
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-primary/40 transition-colors max-w-xs md:max-w-md">
                  <div className="relative flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping absolute" />
                    <div className="w-2 h-2 rounded-full bg-primary relative" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-bold text-primary uppercase tracking-wider">Latest Activity</span>
                       <span className="text-[9px] text-slate-500 truncate">{commit.repo.split('/').pop()}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 truncate italic leading-tight group-hover:text-white transition-colors">
                      "{commit.message}"
                    </p>
                  </div>
                </div>
              )}
            </header>
            <GithubCalendarCard />
          </div>

          {/* Top Repositories Section */}
          <div className="space-y-6 pt-4">
            <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
              <div className="text-center md:text-left">
                <span className="text-[10px] font-bold tracking-[0.3em] text-accent/60 uppercase mb-2 block">
                  Featured Projects
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-none">
                  Pinned Repositories
                </h3>
              </div>
              <a 
                href="https://github.com/HarishV14?tab=repositories" 
                target="_blank" 
                rel="noreferrer"
                className="text-[10px] uppercase font-bold tracking-widest text-primary hover:text-accent transition-colors flex items-center gap-2"
              >
                View Full Archive →
              </a>
            </header>
            <GithubRepos repos={repos} />
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
