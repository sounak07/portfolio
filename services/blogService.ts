import { MARKDOWN_CONTEN_FALLBACK, GITHUB_CONFIG } from "../constants";

export const fetchBlogContent = async (
  slug: string,
  folder: string
): Promise<string> => {
  try {
    const { username, repo, branch } = GITHUB_CONFIG;
    const url = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${folder}/${slug}.md`;

    const response = await fetch(url);

    if (response.ok) {
      return await response.text();
    } else {
      console.warn(
        `Failed to fetch from GitHub (${url}). Status: ${response.status}`
      );
      const localResponse = await fetch(`/${folder}/${slug}.md`);
      if (localResponse.ok) {
        return await localResponse.text();
      }

      throw new Error("Content not found");
    }
  } catch (error) {
    console.warn(
      "Error fetching blog post, falling back to demo content for preview:",
      error
    );
    return MARKDOWN_CONTEN_FALLBACK;
  }
};
