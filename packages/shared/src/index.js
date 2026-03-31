export const profile = {
  name: "David Fernandez-Cuenca Marcos",
  role: "Software Engineer",
  location: "Dusseldorf, Germany",
  summary:
    "Software engineer specialized in critical systems, backend platforms, AI-enabled products and product delivery.",
  contactEmail: "david.fdezcuenca@gmail.com",
  social: {
    github: "https://github.com/illuminatus503",
    linkedin: "https://linkedin.com/in/david-cuenca-marcos-03b7121b5",
    x: "https://x.com/illuminatus_503"
  }
};

export const skills = [
  { id: "critical-systems", name: "Critical systems", level: "expert" },
  { id: "backend", name: "Backend engineering", level: "expert" },
  { id: "react", name: "React", level: "advanced" },
  { id: "node", name: "Node.js", level: "advanced" },
  { id: "python", name: "Python", level: "expert" },
  { id: "postgres", name: "PostgreSQL", level: "advanced" }
];

export const seedProjects = [
  {
    id: "project-portfolio",
    title: "Portfolio platform",
    description:
      "Personal portfolio with a public website, admin workspace and content workflows.",
    technologies: ["React", "Node.js", "PostgreSQL", "Vercel"],
    githubUrl: "https://github.com/illuminatus503/Portfolio_David",
    liveUrl: "",
    featured: true,
    status: "active",
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-04-01T08:00:00.000Z"
  },
  {
    id: "project-atc",
    title: "Air traffic control systems",
    description:
      "Engineering work on resilient air traffic control systems with strict operational constraints.",
    technologies: ["Ada", "C", "PostgreSQL", "Critical systems"],
    githubUrl: "",
    liveUrl: "",
    featured: true,
    status: "active",
    createdAt: "2026-04-01T08:10:00.000Z",
    updatedAt: "2026-04-01T08:10:00.000Z"
  }
];

export const seedPosts = [
  {
    id: "post-ports-and-adapters",
    title: "Why ports and adapters fit product portfolios",
    excerpt:
      "A portfolio can stay simple in the UI and still keep clear backend boundaries.",
    content:
      "Ports and adapters let the product evolve without coupling the web app to storage, mail or auth details.",
    tags: ["architecture", "backend", "product"],
    published: true,
    createdAt: "2026-03-27T09:00:00.000Z",
    updatedAt: "2026-03-27T09:00:00.000Z"
  }
];

export const adminSeedUser = {
  id: "admin-1",
  username: "admin",
  email: "david.fdezcuenca@gmail.com",
  role: "admin"
};

export const apiConfig = {
  webPort: 4173,
  apiPort: 4174,
  apiBaseUrl: "http://127.0.0.1:4174",
  adminPath: "/studio-503",
  defaultJwtSecret: "dev-secret-change-me",
  defaultAdminPassword: "admin123"
};
