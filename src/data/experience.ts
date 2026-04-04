import { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    company: "Testpress",
    role: "Software Developer",
    duration: "Aug 2024 — Present",
    location: "Coimbatore, Tamil Nadu",
    tech: ["Django", "React", "PostgreSQL", "REST APIs", "WordPress"],
    highlights: [
      {
        title: "Flimix Studio Page Builder(OTT)",
        description:
          "Developed schema-driven page builder SDK capable of generating landing pages dynamically.",
      },
      {
        title: "OTT Platform Analytics",
        description:
          "Engineered OTT analytics for tracking user behavior, revenue, and content performance metrics.",
      },
      {
        title: "OTT Role Management",
        description:
          "Developed a granular RBAC system to manage secure content access and administrative workflows.",
      },
      {
        title: "OTT Platform Asset Management",
        description:
          "Built asset management module with bulk uploads and media organization workflows for the in-house OTT infrastructure.",
      },
       {
        title: "Database Scaling",
        description:
          "Contributed to distributed PostgreSQL scaling using Citus and supported Python 2 to Python 3 migration.",
      },
      {
        title: "LMS Platform Security",
        description:
          "Implemented Multi-Factor Authentication for the admin panel to improve platform security.",
      },
      {
        title: "LMS Learner Analytics",
        description:
          "Designed and developed analytics module to track course enrollment and learner performance.",
      },
      {
        title: "WordPress Development",
        description:
          "Built and maintained company websites using custom themes and plugin optimizations.",
      },
    ],
  },
];
