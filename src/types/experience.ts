export interface Highlight {
  title: string;
  description: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  tech: string[];
  highlights: Highlight[];
}
