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
  lastCommit?: string;
}

export async function fetchGitHubRepoData(owner: string, repo: string): Promise<GitHubRepoData | null> {
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
    
    // Fetch latest commit (for this repo's last update)
    let lastCommit: string | undefined;
    if (owner === 'tofupilot' && repo === 'awesome-hardware-test') {
      try {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
          {
            headers,
            next: { revalidate: CACHE_DURATION }
          }
        );
        
        if (commitsResponse.ok) {
          const commitsData = await commitsResponse.json();
          if (commitsData.length > 0) {
            lastCommit = commitsData[0].commit.committer.date;
          }
        }
      } catch (error) {
        // Error fetching commits - that's ok
      }
    }
    
    return {
      stars: repoData.stargazers_count,
      lastRelease,
      contributors,
      license: repoData.license?.name,
      openIssues: repoData.open_issues_count,
      forks: repoData.forks_count,
      lastCommit
    };
  } catch (error) {
    console.error(`Error fetching GitHub data for ${owner}/${repo}:`, error);
    return null;
  }
}

// Simple function to get all GitHub stars for resources
export const getAllGitHubData = unstable_cache(
  async (): Promise<{ stars: Record<string, number | null>; repoData: { stars: number; contributors: number; lastCommit: string } | null }> => {
    try {
      const token = process.env.GITHUB_FETCH_STARS_TOKEN?.trim().replace(/^["']|["']$/g, '');
      const headers: HeadersInit = { 'Accept': 'application/vnd.github.v3+json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // Extract GitHub URLs from hardware data
      const githubUrls = hardwareTestData
        .filter(item => item.links.github)
        .map(item => ({ id: item.id, url: item.links.github! }));

      // Fetch stars for each resource
      const starsPromises = githubUrls.map(async ({ id, url }) => {
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) {
          console.error(`Invalid GitHub URL format for ${id}: ${url}`);
          return { id, stars: null };
        }

        try {
          const response = await fetch(`https://api.github.com/repos/${match[1]}/${match[2]}`, {
            headers, next: { revalidate: CACHE_DURATION }
          });
          
          if (!response.ok) {
            console.error(`GitHub API error for ${match[1]}/${match[2]}: ${response.status} ${response.statusText}`);
            return { id, stars: null };
          }
          
          const data = await response.json();
          return { id, stars: data.stargazers_count || null };
        } catch (error) {
          console.error(`Failed to fetch stars for ${match[1]}/${match[2]}:`, error);
          return { id, stars: null };
        }
      });

      // Fetch main repo data
      let repoData = null;
      try {
        const [repoResponse, commitsResponse, contributorsResponse] = await Promise.all([
          fetch('https://api.github.com/repos/tofupilot/awesome-hardware-test', { headers, next: { revalidate: CACHE_DURATION } }),
          fetch('https://api.github.com/repos/tofupilot/awesome-hardware-test/commits?per_page=1', { headers, next: { revalidate: CACHE_DURATION } }),
          fetch('https://api.github.com/repos/tofupilot/awesome-hardware-test/contributors?per_page=1', { headers, next: { revalidate: CACHE_DURATION } })
        ]);

        const repo = await repoResponse.json();
        const commits = await commitsResponse.json();
        const contributors = await contributorsResponse.json();

        repoData = {
          stars: repo.stargazers_count || 0,
          contributors: contributors.length || 0,
          lastCommit: commits[0]?.commit?.committer?.date || new Date().toISOString()
        };
      } catch (error) {
        console.error('Error fetching repo data:', error);
      }

      const results = await Promise.all(starsPromises);
      const stars = results.reduce((acc, { id, stars }) => ({ ...acc, [id]: stars }), {});

      return { stars, repoData };
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      return { stars: {}, repoData: null };
    }
  },
  ['github-data'],
  { revalidate: CACHE_DURATION, tags: ['github-data'] }
);

// Export for backward compatibility - just get stars
export async function getAllGitHubStars(): Promise<Record<string, number | null>> {
  const { stars } = await getAllGitHubData();
  return stars;
}