# Harish V - Portfolio

A premium, high-performance developer portfolio built with Next.js, TypeScript, and TailwindCSS. Designed to showcase projects, skills, and experience with a modern aesthetic and AI-integrated features.

## 🚀 Features

- **Dynamic Hero Section**: Engaging introduction with type animation and interactive background particles.
- **AI Chat Assistant**: Built-in professional assistant powered by **Groq SDK** and **LLama 3.1** to provide instant answers about Harish's background.
- **GitHub Integration**: Live activity tracking, including contribution calendar, real-time stats (streaks, total contributions), and pinned repositories.
- **Interactive Projects & Experience**: Smoothly animated cards and timeline showcasing technical expertise and professional growth.
- **Modern Tech Stack**: Leveraging the latest web technologies for speed, performance, and SEO.
- **Premium UX**: Custom cursor, Lenis smooth scrolling, and subtle Framer Motion animations for a high-end feel.
- **Responsive & Dark Mode**: Mobile-first design optimized for all screen sizes with a consistent, sophisticated dark theme.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Engine**: [Groq SDK](https://groq.com/) (LLama 3.1)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Background**: [@tsparticles/react](https://particles.js.org/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## 📂 Folder Structure

The project follows a strict modular architecture:
- `/src/app`: Page routes, API handlers, and Next.js layout configurations.
- `/src/components`: Reusable UI elements (buttons, cards, skeleton loaders).
- `/src/sections`: Major page segments (Hero, About, Projects, Github Activity, etc.).
- `/src/data`: Centralized data files for all portfolio content, ensuring easy updates.
- `/src/types`: Comprehensive TypeScript interfaces and type definitions.
- `/src/lib`: Logic for external API integrations (GitHub) and utility functions.

## 🚥 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HarishV14/harish-portfolio.git
   cd harish-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   GROQ_API_KEY=your_groq_api_key
   GITHUB_TOKEN=your_github_personal_access_token
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see the portfolio.

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by [Harish V](https://github.com/HarishV14)

