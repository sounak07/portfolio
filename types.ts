export interface SocialLink {
  name: string;
  url: string;
  icon:
    | "github"
    | "linkedin"
    | "twitter"
    | "instagram"
    | "stackoverflow"
    | "topmate"
    | "mail";
}

export interface ExperienceItem {
  id: string;
  roles: string[];
  company: string;
  period: string;
  description: Array<Array<string>>;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content?: string; // Loaded asynchronously
}

export type ViewState = "home" | "blogs" | "blog-detail";
