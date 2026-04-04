const GITHUB_API_URL = "https://api.github.com";
import { GithubRepo } from "@/types/github";

async function fetchWithTimeout(url: string, options: any = {}, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export async function getGithubUser() {
  const headers = { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` };

  const userRes = await fetchWithTimeout(`${GITHUB_API_URL}/users/HarishV14`, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!userRes.ok) {
    throw new Error("Failed to fetch GitHub user");
  }

  const user = await userRes.json();
  
  let totalContributions = 0;
  let currentStreak = 0;
  let longestStreak = 0;

  try {
    const streakRes = await fetchWithTimeout(
      `https://streak-stats.demolab.com/?user=HarishV14&type=json`, 
      { next: { revalidate: 3600 } }
    );

    if (streakRes.ok) {
      const streakData = await streakRes.json();
      totalContributions = streakData.totalContributions || 0;
      currentStreak = streakData.currentStreak?.length || 0;
      longestStreak = streakData.longestStreak?.length || 0;
    }
  } catch (e) {
    console.error("Failed to fetch streak data:", e);
  }

  return {
    ...user,
    totalContributions,
    currentStreak,
    longestStreak,
  };
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  const query = `
    query {
      user(login: "HarishV14") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GraphQL request failed: ${res.statusText}`);
    }

    const { data } = await res.json();
    if (!data?.user?.pinnedItems?.nodes) return [];

    return data.user.pinnedItems.nodes.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      language: repo.primaryLanguage?.name || "Unknown",
      stargazers_count: repo.stargazerCount || 0,
      forks_count: repo.forkCount || 0,
      html_url: repo.url,
    }));
  } catch (error) {
    console.error("Error fetching pinned repos from GraphQL:", error);
    // Fallback to REST if GraphQL fails
    try {
      const res = await fetchWithTimeout(
        `${GITHUB_API_URL}/users/HarishV14/repos?sort=updated&per_page=10`,
        { 
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
          next: { revalidate: 3600 } 
        }
      );
      if (!res.ok) return [];
      const repos = await res.json();
      if (!Array.isArray(repos)) return [];
      return repos
        .filter((repo: any) => repo && !repo.fork)
        .sort((a: any, b: any) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
        .slice(0, 4);
    } catch (e) {
      return [];
    }
  }
}

export async function getLatestCommit() {
  try {
    const headers = { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` };

    const res = await fetchWithTimeout(
      `${GITHUB_API_URL}/users/HarishV14/events/public`,
      { headers, next: { revalidate: 1800 } }
    );

    if (!res.ok) return null;

    const events = await res.json();
    if (!Array.isArray(events)) return null;

    const pushEvent = events.find((event: any) => event.type === "PushEvent");
    if (!pushEvent) return null;

    let message = "No commit message";
    const repo = pushEvent.repo.name;

    // GitHub's event API sometimes omits the commits array. 
    // In that case, we fetch the specific commit using the head SHA.
    if (pushEvent.payload?.commits && pushEvent.payload.commits.length > 0) {
      message = pushEvent.payload.commits[0].message;
    } else if (pushEvent.payload?.head) {
      try {
        const commitRes = await fetchWithTimeout(
          `${GITHUB_API_URL}/repos/${repo}/commits/${pushEvent.payload.head}`,
          { headers, next: { revalidate: 3600 } }
        );
        if (commitRes.ok) {
          const commitData = await commitRes.json();
          message = commitData.commit.message;
        }
      } catch (err) {
        console.error("Error fetching detailed commit info:", err);
      }
    }

    return {
      message: message || "Recent update",
      repo: repo,
      created_at: pushEvent.created_at,
    };
  } catch (e) {
    console.error("Error in getLatestCommit:", e);
    return null;
  }
}
