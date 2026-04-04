import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { ContactData } from "@/types/contact";

export const contactData: ContactData = {
  title: "Let's Build Something Amazing",
  description:
    "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
  availabilityBadge: "Available for Opportunities",
  info: [
    {
      id: "email",
      label: "Email",
      value: "harishpc2003@gmail.com",
      icon: FiMail,
      href: "mailto:harishpc2003@gmail.com",
    },
    {
      id: "github",
      label: "GitHub",
      value: "HarishV14",
      icon: FiGithub,
      href: "https://github.com/HarishV14",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "harish-v-developer",
      icon: FiLinkedin,
      href: "https://www.linkedin.com/in/harish-v-developer/",
    },
    {
      id: "phone",
      label: "Phone",
      value: "+91 9952807662",
      icon: FiPhone,
      href: "tel:+919952807662",
    },
  ],
};
