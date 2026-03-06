export interface ProjectSection {
  title: string;
  content: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  category: string;
  overview: string;
  problem: string;
  research: string;
  process: string;
  wireframes: string;
  finalDesign: string;
  prototype: string;
  results: string;
  sections?: ProjectSection[];
}

export const projects: Project[] = [];
