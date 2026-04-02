import { Skill } from "@/types/skills";
import {
  SiPython,
  SiReact,
  SiTailwindcss,
  SiAlpinelinux,
  SiPostgresql,
  SiGit,
  SiWordpress,
  SiDjango,
  SiAndroid,
} from "react-icons/si";

export const skills: Skill[] = [
  {
    id: "python",
    name: "Python",
    icon: SiPython,
    color: "#3776AB",
    description: "Primary programming language"
  },
  {
    id: "django",
    name: "Django",
    icon: SiDjango,
    color: "#44B78B", // Vibrant Django Green
    description: "Python web framework"
  },
  {
    id: "react",
    name: "React.js",
    icon: SiReact,
    color: "#61DAFB",
    description: "Frontend UI library"
  },
  {
    id: "alpine",
    name: "Alpine.js",
    icon: SiAlpinelinux,
    color: "#8BC0D0",
    description: "Lightweight JS framework"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    description: "Utility-first CSS framework"
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4169E1",
    description: "Relational database"
  },
  {
    id: "citus",
    name: "Citus",
    icon: SiPostgresql, // Using Postgres icon as Citus is a Postgres extension
    color: "#2B5D95", 
    description: "Distributed PostgreSQL"
  },
  {
    id: "git",
    name: "Git",
    icon: SiGit,
    color: "#F05032",
    description: "Version control system"
  },
  {
    id: "wordpress",
    name: "WordPress",
    icon: SiWordpress,
    color: "#21759B",
    description: "Content Management System"
  },
  {
    id: "android",
    name: "Android",
    icon: SiAndroid,
    color: "#3DDC84",
    description: "Mobile development"
  }
];
