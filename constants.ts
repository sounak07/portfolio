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
  repo: "backend-engineering",
  branch: "main",
  folder: "system_design_studies",
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
    slug: "kafka_for_dummies",
    title: "Kafka for Dummies",
    date: "Nov 29, 2025",
    excerpt: "A detailed deep dive into kafka and its components.",
    tags: ["Kafka", "distributed-logging"],
  },
];

export const MARKDOWN_CONTEN_FALLBACK = `
## Error

Error fetching blogs! Please try again later.
`;
