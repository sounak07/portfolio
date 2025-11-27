import { SocialLink, ExperienceItem, BlogPost } from "./types";

export const PROFILE = {
  name: "Sounak",
  title: "Senior Software Engineer",
  bio: "Hi I’m Sounak, I have a passion for backend distributed systems, love to work at customer facing products. I have deep expertise in data structures, algorithms, OOP, and design patterns—and I really love building teams, taking an orgs engineering culture and unleveling them.",
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
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sounak08",
    icon: "linkedin",
  },
  {
    name: "StackOverflow",
    url: "https://stackoverflow.com/users/7905119/sounak07",
    icon: "stackoverflow",
  },
  { name: "X", url: "https://x.com/sounak_08", icon: "twitter" },
  {
    name: "Instagram",
    url: "https://instagram.com/_reactivist_",
    icon: "instagram",
  },
  { name: "Topmate", url: "https://topmate.io/sounak_fyi", icon: "topmate" },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "1",
    roles: ["Senior Software Engineer I", "Software Engineer II"],
    company: "Raft AI",
    period: "Jul 2022 - Nov 2025",
    description: [
      ["Working in Gen3, Finance Improvements"],
      [
        "Designed and developed the Cargowise Ref Service from scratch, implementing an EAV pattern, async workflows with celery.",
        "Spearheaded Statements Integration, enhancing customer visibility and reducing payment delays by 30%.",
        "Established test automation, code standards, CI/CD pipelines, Helm charts, and telemetry with Datadog and Sentry enhancing observability.",
      ],
    ],
    skills: ["React", "TypeScript", "Python", "k8s", "GCP", "PostgresQL"],
  },
  {
    id: "2",
    roles: ["Software Engineer", "Software Engineer Intern"],
    company: "Hyperverge Inc.",
    period: "Jan 2021 – Jul 2022",
    description: [
      [
        "Designed and developed Sim-SaaS, a CPU based vector similarity search service from scratch using FastApi.",
        "Assisted in development and scaling of FRaaS, a face digitization and face recognition service.",
        "Revamped the entire backend for Orion’s aggregator using Typescript, making the service highly Generic and configurable.",
      ],
      [
        "Conceptualized, designed and built a prototype to demonstrate 1:N face search deployed on AWS EC2 with AWS Auto Scaling enabled using Terraform leading to multiple clients onboarding.",
      ],
    ],
    skills: ["React", "TypeScript", "node", "AWS", "PostgresQL", "MongoDB"],
  },
  {
    id: "3",
    roles: ["Software Engineer Intern"],
    company: "Upscale.ai",
    period: "May 2020 – July 2020",
    description: [
      [
        "Conceptualized, designed and built a prototype to demonstrate 1:N face search deployed on AWS EC2 with AWS Auto Scaling enabled using Terraform leading to multiple clients onboarding.",
      ],
    ],
    skills: ["React", "TypeScript", "node", "AWS", "PostgresQL", "MongoDB"],
  },
  {
    id: "4",
    roles: ["Software Engineer Intern"],
    company: "Nineleaps",
    period: "Jun 2019 – Aug 2019",
    description: [
      [
        "Designed and developed reusable React components that enhanced the performance and user experience for a platform that lets customers design their Apartment on a 3D scale.",
      ],
    ],
    skills: ["React", "TypeScript", "javascript"],
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
