export interface Project {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  gradient: string;
  github?: string;
  demo?: string;
}
