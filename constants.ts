import { SocialLink, ExperienceItem, BlogPost } from "./types";

export const PROFILE = {
  name: "Sounak",
  title: "Senior Software Engineer",
  bio: "Hi I’m Sounak, I have a passion for distributed systems, love to work at customer facing products.",
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

export const EXPERIENCES: Array<ExperienceItem> = [
  {
    id: "1",
    roles: ["Senior Software Engineer I"],
    type: "Fulltime",
    company: "Raft AI",
    logo: "https://cdn.prod.website-files.com/634dc126d92a901d43966284/634dc126d92a900da59662b6_Favicon.png",
    period: "Jul 2022 - Present",
  },
  {
    id: "2",
    roles: ["Software Engineer"],
    type: "Fulltime",
    company: "Hyperverge Inc.",
    logo: "https://cdn.hyperverge.co/wp-content/uploads/2025/08/favicon.png",
    period: "Jul 2020 – Jul 2022",
  },
  {
    id: "3",
    roles: ["Software Engineering Intern"],
    type: "Internship",
    company: "Upscale AI",
    logo: "https://ui-avatars.com/api/?name=Upscale+AI&background=random&color=fff",
    period: "May 2020 – Jul 2020",
  },
  {
    id: "4",
    roles: ["Software Engineering Intern"],
    type: "Internship",
    company: "Nineleaps",
    logo: "https://www.nineleaps.com/wp-content/themes/nineleaps/assets/images/favicon/apple-icon-72x72.png",
    period: "May 2019 – Jul 2019",
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
