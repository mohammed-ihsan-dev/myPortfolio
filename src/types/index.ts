export interface Project {
  id: string;
  title: string;
  category: string;
  liveDemo: string;
  github: string;
  highlights: string[];
  focus: string[];
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  technicalHighlights: string[];
  technologiesUsed: string[];
}

export interface DetailedProject {
  id: string;
  title: string;
  category: string;
  liveDemo: string;
  github: string;
  highlights: string[];
  technologiesUsed: string[];
  shortDesc: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string;
  gradient: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
