import { hardwareTestData } from './hardware-data';
import { unstable_cache } from 'next/cache';

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 3600;

async function fetchGitHubStars(owner: string, repo: string): Promise<number | null> {
  try {
    // Clean the token - remove any quotes or whitespace
    const token = process.env.GITHUB_TOKEN?.trim().replace(/^["']|["']$/g, '');
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers,
        // Next.js will cache this fetch for 1 hour
        next: { revalidate: CACHE_DURATION }
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch stars for ${owner}/${repo}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    console.error(`Error fetching stars for ${owner}/${repo}:`, error);
    return null;
  }
}

// This function is cached for 1 hour using Next.js's unstable_cache
export const getAllGitHubStars = unstable_cache(
  async (): Promise<Record<string, number>> => {
    try {
      // Extract GitHub URLs from hardware data
      const githubUrls = hardwareTestData
        .filter(item => item.links.github)
        .map(item => ({
          id: item.id,
          url: item.links.github!
        }));

      // Parse owner and repo from GitHub URLs and fetch stars
      const starPromises = githubUrls.map(async ({ id, url }) => {
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) return { id, stars: null };

        const [, owner, repo] = match;
        const stars = await fetchGitHubStars(owner, repo);
        return { id, stars };
      });

      // Fetch all stars in parallel
      const results = await Promise.all(starPromises);

      // Create a map of resource ID to star count
      const starsMap = results.reduce((acc, { id, stars }) => {
        if (stars !== null) {
          acc[id] = stars;
        }
        return acc;
      }, {} as Record<string, number>);

      return starsMap;
    } catch (error) {
      console.error('Error fetching GitHub stars:', error);
      return {};
    }
  },
  ['github-stars'], // Cache key
  {
    revalidate: CACHE_DURATION, // Revalidate after 1 hour
    tags: ['github-stars'] // Can be used to manually revalidate if needed
  }
);