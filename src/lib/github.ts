export interface GithubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    topics: string[];
}

export interface GithubContent {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
}

export async function getTopRepos(username: string): Promise<GithubRepo[]> {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&direction=desc&per_page=6`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error('Failed to fetch repos');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

export async function getRepoContents(username: string, repo: string, path: string): Promise<GithubContent[]> {
    try {
        const res = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch contents: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching repo contents:', error);
        return [];
    }
}
