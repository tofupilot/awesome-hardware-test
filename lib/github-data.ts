import { hardwareTestData } from './hardware-data';
import { unstable_cache } from 'next/cache';

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 3600;

interface GitHubRepoData {
  stars: number;
  lastRelease?: string;
  contributors?: number;
  license?: string;
  openIssues?: number;
  forks?: number;
}

async function fetchGitHubRepoData(owner: string, repo: string): Promise<GitHubRepoData | null> {
  try {
    const token = process.env.GITHUB_FETCH_STARS_TOKEN?.trim().replace(/^["']|["']$/g, '');
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('No GitHub token found, API rate limits will apply');
    }
    
    // Fetch repo data
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers,
        next: { revalidate: CACHE_DURATION }
      }
    );

    if (!repoResponse.ok) {
      console.error(`Failed to fetch repo data for ${owner}/${repo}: ${repoResponse.status}`);
      return null;
    }

    const repoData = await repoResponse.json();
    
    // Fetch latest release
    let lastRelease: string | undefined;
    try {
      const releaseResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
        {
          headers,
          next: { revalidate: CACHE_DURATION }
        }
      );
      
      if (releaseResponse.ok) {
        const releaseData = await releaseResponse.json();
        lastRelease = releaseData.published_at ? new Date(releaseData.published_at).toISOString().split('T')[0] : undefined;
      }
    } catch (error) {
      // No releases or error fetching releases - that's ok
    }
    
    // Fetch contributors count
    let contributors: number | undefined;
    try {
      const contributorsResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1`,
        {
          headers,
          next: { revalidate: CACHE_DURATION }
        }
      );
      
      if (contributorsResponse.ok) {
        // Get total count from Link header
        const linkHeader = contributorsResponse.headers.get('Link');
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match) {
            contributors = parseInt(match[1]);
          }
        } else {
          // If no pagination, count the results
          const contributorsData = await contributorsResponse.json();
          contributors = contributorsData.length;
        }
      }
    } catch (error) {
      // Error fetching contributors - that's ok
    }
    
    return {
      stars: repoData.stargazers_count,
      lastRelease,
      contributors,
      license: repoData.license?.name,
      openIssues: repoData.open_issues_count,
      forks: repoData.forks_count
    };
  } catch (error) {
    console.error(`Error fetching GitHub data for ${owner}/${repo}:`, error);
    return null;
  }
}

// This function is cached for 1 hour using Next.js's unstable_cache
export const getAllGitHubData = unstable_cache(
  async (): Promise<Record<string, GitHubRepoData>> => {
    try {
      // Extract GitHub URLs from hardware data
      const githubUrls = hardwareTestData
        .filter(item => item.links.github)
        .map(item => ({
          id: item.id,
          url: item.links.github!
        }));

      // Parse owner and repo from GitHub URLs and fetch data
      const dataPromises = githubUrls.map(async ({ id, url }) => {
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) return { id, data: null };

        const [, owner, repo] = match;
        const data = await fetchGitHubRepoData(owner, repo);
        return { id, data };
      });

      // Fetch all data in parallel
      const results = await Promise.all(dataPromises);

      // Create a map of resource ID to GitHub data
      const dataMap = results.reduce((acc, { id, data }) => {
        if (data !== null) {
          acc[id] = data;
        }
        return acc;
      }, {} as Record<string, GitHubRepoData>);

      // Force object serialization to avoid caching issues
      return JSON.parse(JSON.stringify(dataMap));
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      return {};
    }
  },
  ['github-data'], // Cache key
  {
    revalidate: CACHE_DURATION, // Revalidate after 1 hour
    tags: ['github-data'] // Can be used to manually revalidate if needed
  }
);

// Export for backward compatibility - just get stars
export async function getAllGitHubStars(): Promise<Record<string, number>> {
  const allData = await getAllGitHubData();
  const starsMap: Record<string, number> = {};
  
  for (const [id, data] of Object.entries(allData)) {
    starsMap[id] = data.stars;
  }
  
  return starsMap;
}