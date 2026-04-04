export interface GithubRepo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export interface GithubUser {
  public_repos: number;
  totalContributions?: number;
  currentStreak?: number;
  longestStreak?: number;
}

export interface LatestCommit {
  message: string;
  repo: string;
  created_at: string;
}
