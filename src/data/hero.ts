import { siteMetadata } from "./site";
export const heroData = {
  greeting: "Hi, I'm Harish 👋",
  roles: [
    "Software Developer",
    "Full Stack Engineer",
    "Django Developer",
    "React Developer",
    "WordPress Developer",
  ],
  description:
    "Building scalable web platforms with Django, React, and PostgreSQL. I craft professional digital experiences with clean architecture and modern tools.",
  ctas: [
    {
      name: "Explore My Work",
      href: "#experience",
    },
    {
      name: "View My Resume",
      href: siteMetadata.resumeUrl,
    },
  ],
  currentWork: {
    role: "Full-Stack Engineer",
    company: "Testpress",
    companyUrl: "https://testpress.tech",
    yearsExperience: "1.5+",
  },
  imageSrc: "/hero/HarishPhoto.PNG",
  imageAlt: "Harish V Portrait",
  socials: [
    {
      name: "GitHub",
      href: "https://github.com/HarishV14",
      icon: "FiGithub",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/harishv14",
      icon: "FiLinkedin",
    },
    {
      name: "Email",
      href: "mailto:harishpc2003@gmail.com",
      icon: "FiMail",
    },
  ],
};
