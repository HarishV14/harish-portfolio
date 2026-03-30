import { portfolioKnowledge } from "@/data/portfolioKnowledge";

type Intent =
  | "skills"
  | "experience"
  | "education"
  | "contact"
  | "about"
  | "projects"
  | "unknown";

function detectIntent(message: string): Intent {
  const lower = message.toLowerCase();

  if (/\b(skill|tech|technolog(y|ie)|stack|language|framework|tool|use|know|built with)s?\b/.test(lower)) return "skills";
  if (/\b(experience|work|job|career|role|position|compan(y|ie)|testpress|employment|year)s?\b/.test(lower)) return "experience";
  if (/\b(project|build|built|develop|created|flimix|lms|ott|stream|page builder)s?\b/.test(lower)) return "projects";
  if (/\b(education|degree|college|university|cgpa|study|graduate|engineering)s?\b/.test(lower)) return "education";
  if (/\b(contact|email|id|phone|reach|linkedin|github|social|location|hire|connect|message)\b/.test(lower)) return "contact";
  if (/\b(who|about|yourself|profile|background|tell me|introduce|summary)\b/.test(lower)) return "about";

  return "unknown";
}

export function getFallbackResponse(message: string): string {
  const intent = detectIntent(message);
  const { profile, skills, experience, education, contact } = portfolioKnowledge;

  switch (intent) {
    case "about":
      return `${profile.summary}\n\nHe is currently based in ${profile.location} and has ${profile.yearsOfExperience} year of professional experience.`;

    case "skills": {
      const allSkills = [
        `**Programming:** ${skills.programming.join(", ")}`,
        `**Backend:** ${skills.backend.join(", ")}`,
        `**Frontend:** ${skills.frontend.join(", ")}`,
        `**Database:** ${skills.database.join(", ")}`,
        `**Tools:** ${skills.tools.join(", ")}`,
      ];
      return `Here are Harish's core technical skills:\n\n${allSkills.join("\n")}`;
    }

    case "experience": {
      const exp = experience[0];
      return `Harish is currently working as a **${exp.role}** at **${exp.company}** (${exp.period}).\n\nHe has worked across multiple products including the **Testpress LMS**, **Flimix OTT Platform**, and the **Flimix Studio Page Builder**. Ask me about any specific project for more details!`;
    }

    case "projects": {
      const exp = experience[0];
      const projectList = exp.projects
        .map((p) => `• **${p.name}** — ${p.highlights[0]}`)
        .join("\n");
      return `Here are some of the key projects Harish has worked on at ${exp.company}:\n\n${projectList}\n\nFeel free to ask about any specific project for more details!`;
    }

    case "education": {
      const edu = education[0];
      return `Harish completed his **${edu.degree}** from **${edu.institution}** (${edu.period}) with a CGPA of **${edu.cgpa}**.`;
    }

    case "contact":
      return `You can reach Harish through:\n\n📧 **Email:** ${contact.email}\n📍 **Location:** ${contact.location}\n🌐 **GitHub:** ${contact.github}\n💼 **LinkedIn:** ${contact.linkedin}\n\nFeel free to connect — he's open to exciting opportunities!`;

    default:
      return "I can help answer questions about Harish's experience, skills, projects, or contact information. Try asking something like \"What technologies does Harish use?\" or \"Tell me about his experience.\"";
  }
}
