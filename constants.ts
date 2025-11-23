import { SocialLink, ExperienceItem, BlogPost } from "./types";

export const PROFILE = {
  name: "Sounak",
  title: "Senior Software Engineer",
  bio: "This is place holder",
  avatar: "https://github.com/sounak07.png",
  location: "Bengalurur, India",
  email: "sounakume@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1c03obFT7xnBEchVWsg5-4665kfU6RduT/view?usp=sharing",
};

export const GITHUB_CONFIG = {
  username: "sounak07",
  repo: "portfolio-v2",
  branch: "main",
  folder: "posts",
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/sounak07", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  {
    name: "StackOverflow",
    url: "https://stackoverflow.com",
    icon: "stackoverflow",
  },
  { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
  { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
  { name: "Topmate", url: "https://topmate.io", icon: "topmate" },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "1",
    role: "Senior Frontend Engineer",
    company: "TechNova Inc.",
    period: "2021 - Present",
    description: [
      "Led the migration of a legacy monolith to a micro-frontend architecture, improving deployment speed by 40%.",
      "Architected a cross-platform design system used by 5+ product teams.",
      "Mentored junior developers and established code quality standards.",
    ],
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
  },
  {
    id: "2",
    role: "Frontend Developer",
    company: "Creativ Studio",
    period: "2018 - 2021",
    description: [
      "Developed high-fidelity interactive dashboards for fintech clients.",
      "Optimized application bundle size, reducing initial load time by 2.5s.",
      "Implemented extensive unit and integration testing suites.",
    ],
    skills: ["Vue.js", "D3.js", "SCSS", "Jest"],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "react-server-components-deep-dive",
    title: "Understanding React Server Components",
    date: "Oct 15, 2023",
    excerpt:
      "A comprehensive guide to how RSCs change the mental model of data fetching in React applications.",
    tags: ["React", "Architecture"],
  },
  {
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS Patterns",
    date: "Sep 22, 2023",
    excerpt:
      "Tips and tricks for maintaining scalability in large Tailwind projects without CSS bloat.",
    tags: ["CSS", "Tailwind"],
  },
  {
    slug: "clean-code-typescript",
    title: "Clean Code Principles in TypeScript",
    date: "Aug 10, 2023",
    excerpt:
      "Applying SOLID principles to modern functional TypeScript codebases.",
    tags: ["TypeScript", "Clean Code"],
  },
];

export const DEMO_MARKDOWN_CONTENT = `
# Understanding React Server Components

React Server Components (RSC) represent a paradigm shift in how we build React applications. Unlike traditional Client Components, RSCs execute exclusively on the server.

## Why RSC?

1. **Zero Bundle Size**: Dependencies used in RSCs are not sent to the client.
2. **Direct Backend Access**: Query databases directly from your components.
3. **Automatic Code Splitting**: The client only downloads the code it needs.

## Code Example

\`\`\`tsx
// Server Component
import db from './database';

async function Note({ id }) {
  const note = await db.notes.get(id);
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.body}</p>
    </div>
  );
}
\`\`\`

## Conclusion

RSC allows us to blend the best of server-side rendering and client-side interactivity.
`;
