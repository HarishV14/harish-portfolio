export const portfolioKnowledge = {
  profile: {
    name: "Harish V",
    title: "Software Developer",
    summary:
      "Harish V is a Software Developer with 1+ year of experience building scalable web applications for EdTech and OTT platforms. He specializes in Python, Django, and modern frontend technologies with experience in API development, authentication, and database optimization.",
    yearsOfExperience: "1.5+",
    location: "Salem, Tamil Nadu, India",
  },

  skills: {
    programming: ["Python"],
    backend: [
      "Django",
      "Django REST Framework",
      "REST APIs",
      "Authentication",
      "Role-Based Access Control",
    ],
    frontend: ["React.js", "Alpine.js", "Tailwind CSS"],
    database: ["PostgreSQL", "Citus"],
    tools: ["Git", "Zoom API", "WordPress"],
  },

  experience: [
    {
      role: "Software Developer",
      company: "Testpress",
      period: "Aug 2024 – Present",
      projects: [
        {
          name: "Testpress LMS",
          highlights: [
            "Implemented Multi-Factor Authentication (MFA) for admin panel security.",
            "Developed learner analytics module to track course enrollment and performance.",
          ],
        },
        {
          name: "Flimix OTT Platform",
          highlights: [
            "Built asset management system supporting bulk uploads and transcoding.",
            "Integrated TPStream live streaming.",
            "Integrated Zoom API for video conferencing.",
            "Developed viewer analytics and purchase tracking system.",
            "Implemented role-based access control for staff management.",
          ],
        },
        {
          name: "Flimix Studio Page Builder",
          highlights: [
            "Built schema-driven JSON layout configuration system.",
            "Developed runtime rendering engine for dynamic page generation.",
            "Created APIs for managing page configuration.",
            "Enabled non-developers to create landing pages.",
          ],
        },
        {
          name: "Database & Infrastructure",
          highlights: [
            "Worked on distributed database scaling using Citus.",
            "Contributed to Python 2 to Python 3 migration.",
          ],
        },
        {
          name: "WordPress",
          highlights: [
            "Developed and maintained company websites.",
            "Customized themes and plugins.",
          ],
        },
      ],
    },
  ],

  education: [
    {
      degree: "B.E Computer Science and Engineering",
      institution: "K.S.R College of Engineering",
      period: "2020 – 2024",
      cgpa: "8.4 / 10",
    },
  ],

  contact: {
    phone: "9952807662",
    email: "harishpc2003@gmail.com",
    location: "Salem, Tamil Nadu",
    github: "https://github.com/HarishV14",
    linkedin: "https://linkedin.com/in/harish-v-developer",
  },

  websites: ["https://tpstreams.com", "https://tpsentinel.com"],
};

export type PortfolioKnowledge = typeof portfolioKnowledge;
