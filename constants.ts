import {
  SocialLink,
  ExperienceItem,
  BlogPost,
  ShowcaseItem,
  ToolCategory,
} from "./types";

export const PROFILE = {
  name: "Sounak",
  title: "Senior Software Engineer",
  bio: "building distributed systems and customer-facing products; great teams; taking an org's engineering culture and unleveling them",
  avatar: "/static/images/IMG_1854.jpeg",
  location: "Bengalurur, India",
  email: "sounakume@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1c03obFT7xnBEchVWsg5-4665kfU6RduT/view?usp=sharing",
};

export const GITHUB_CONFIG = {
  username: "sounak07",
  repo: "backend-engineering",
  branch: "main",
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/sounak07", icon: "github" },
  { name: "Email", url: `mailto:${PROFILE.email}`, icon: "mail" },
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
  { name: "Topmate", url: "https://topmate.io/sounak_fyi", icon: "topmate" },
];

export const EXPERIENCES: Array<ExperienceItem> = [
  {
    id: "1",
    roles: ["Senior Software Engineer I"],
    type: "Fulltime",
    company: "Raft AI",
    logo: "https://cdn.prod.website-files.com/634dc126d92a901d43966284/634dc126d92a900da59662b6_Favicon.png",
    period: "Jul 2022 - Present",
    highlights: [
      "Built and scaled customer-facing backend systems powering high-volume workflows.",
      "Led architecture and execution for distributed services with strong reliability SLOs.",
      "Partnered with product and cross-functional teams to ship roadmap-critical features faster.",
    ],
  },
  {
    id: "2",
    roles: ["Software Engineer"],
    type: "Fulltime",
    company: "Hyperverge Inc.",
    logo: "https://cdn.hyperverge.co/wp-content/uploads/2025/08/favicon.png",
    period: "Jul 2020 – Jul 2022",
    highlights: [
      "Implemented performant identity and verification services used across enterprise clients.",
      "Improved core APIs and async processing paths to reduce latency and failure rates.",
      "Contributed to production observability and incident response playbooks for backend teams.",
    ],
  },
  {
    id: "3",
    roles: ["Software Engineering Intern"],
    type: "Internship",
    company: "Upscale AI",
    logo: "https://ui-avatars.com/api/?name=Upscale+AI&background=random&color=fff",
    period: "May 2020 – Jul 2020",
    highlights: [
      "Developed backend modules and tooling to support early product experiments.",
      "Worked on clean API contracts and integration flows with internal services.",
      "Delivered features in short cycles while learning production-grade engineering practices.",
    ],
  },
  {
    id: "4",
    roles: ["Software Engineering Intern"],
    type: "Internship",
    company: "Nineleaps",
    logo: "https://www.nineleaps.com/wp-content/themes/nineleaps/assets/images/favicon/apple-icon-72x72.png",
    period: "May 2019 – Jul 2019",
    highlights: [
      "Built proof-of-concept backend components for client-facing projects.",
      "Collaborated with senior engineers on code quality and review-driven development.",
      "Gained hands-on experience with agile delivery and engineering teamwork.",
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "OG Kafka",
    folder: "HLD",
    title: "Kafka for Dummies",
    date: "Nov 29, 2025",
    excerpt: "A detailed deep dive into kafka and its components.",
    tags: ["event-driven", "distributed-systems"],
  },
  {
    slug: "Chapter 3 - Storage and Retrieval",
    folder: "DDIA",
    title: "DDIA - Storage and Retrieval",
    date: "Jan 01, 2026",
    excerpt: "Notes for chapter 2 of DDIA",
    tags: ["databases"],
  },
  {
    slug: "solid",
    folder: "LLD",
    title: "SOLID principles in OOP",
    date: "Jan 03, 2026",
    excerpt: "Blog explains all the solid principles with examples",
    tags: ["oop"],
  },
  {
    slug: "design_patterns",
    folder: "LLD",
    title: "Design Patterns in OOP",
    date: "Jan 04, 2026",
    excerpt: "Blog explains all the design patterns in OOP with examples like Singleton, Factory, Observer etc.",
    tags: ["oop", "design-patterns"],
  },
];

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "1",
    title: "Backend Engineering Notes",
    description: "Open-source notes and practical references on backend engineering.",
    url: "https://github.com/sounak07/backend-engineering",
    kind: "project",
  },
  {
    id: "2",
    title: "Kafka for Dummies",
    description: "A deep dive post on Kafka fundamentals and architecture.",
    url: "/blog/OG Kafka",
    kind: "article",
  },
  {
    id: "3",
    title: "System Design Threads",
    description: "Short form thoughts on distributed systems and engineering decisions.",
    url: "https://x.com/sounak_08",
    kind: "x-post",
  },
  {
    id: "4",
    title: "Mentoring / Knowledge Sharing",
    description: "1:1 sessions, architecture reviews, and growth-focused engineering discussions.",
    url: "https://topmate.io/sounak_fyi",
    kind: "video",
  },
];

export const TOOLS_CATEGORIES: ToolCategory[] = [
  {
    id: "core-stack",
    title: "Core Stack",
    items: ["Java", "TypeScript", "Node.js", "Spring Boot", "Kafka", "Redis"],
  },
  {
    id: "databases",
    title: "Data & Databases",
    items: ["PostgreSQL", "MongoDB", "DynamoDB", "Elasticsearch", "ClickHouse"],
  },
  {
    id: "infra",
    title: "Infrastructure",
    items: ["Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions", "Nginx"],
  },
  {
    id: "daily-tools",
    title: "Daily Tools",
    items: ["IntelliJ", "VS Code", "Postman", "Grafana", "Datadog", "Sentry"],
  },
];

export const MARKDOWN_CONTEN_FALLBACK = `
## Error

Error fetching blogs! Please try again later.
`;
