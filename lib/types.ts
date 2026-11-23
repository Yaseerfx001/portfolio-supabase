// These types mirror the shape of data/content.json.
// If you add a field to the JSON, add it here too so the whole app stays typed.

export interface Profile {
  name: string;
  role: string;
  heroPhoto: string;
  aboutPhoto: string;
  shortIntro: string;
  shortAbout: string;
  longAbout: string;
  location: string;
  education: string;
  focusAreas: string;
  email: string;
  cvUrl: string;
}

export interface Stat {
  label: string;
  value: number;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  email: string;
  linktree: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  org: string;
  period: string;
  description: string;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  venue: string;
  description: string;
  link: string;
}

export interface CommunityItem {
  id: string;
  title: string;
  period: string;
  description: string;
}

export interface TalkItem {
  id: string;
  title: string;
  event: string;
  date: string;
  link: string;
}

export interface HonorItem {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface FooterContent {
  copyright: string;
}

export interface SiteContent {
  profile: Profile;
  stats: Stat[];
  social: SocialLinks;
  footer: FooterContent;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  blog: BlogPost[];
  research: ResearchItem[];
  community: CommunityItem[];
  talks: TalkItem[];
  honors: HonorItem[];
}
