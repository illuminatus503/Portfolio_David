// Mock data for development without backend
window.mockData = {
  projects: [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Personal portfolio built with React and Node.js, featuring a modern design, responsive layout, and admin panel for content management.",
      technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "JWT"],
      github_url: "https://github.com/illuminatus503/portfolio",
      live_url: "https://davidfdezcuenca.com",
      featured: true,
      created_at: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Air Traffic Control System",
      description: "Critical system for managing air traffic control operations, built with Ada and C for maximum reliability and performance.",
      technologies: ["Ada", "C", "PostgreSQL", "Real-time Systems"],
      github_url: null,
      live_url: null,
      featured: true,
      created_at: "2023-06-20T14:30:00Z"
    },
    {
      id: 3,
      title: "ML Prediction Engine",
      description: "Machine learning system for predictive analytics using Python and TensorFlow.",
      technologies: ["Python", "TensorFlow", "scikit-learn", "FastAPI", "Docker"],
      github_url: "https://github.com/illuminatus503/ml-engine",
      live_url: null,
      featured: false,
      created_at: "2023-12-01T09:15:00Z"
    }
  ],
  
  blogPosts: [
    {
      id: 1,
      title: "Building Scalable Web Applications with React and Node.js",
      excerpt: "Learn how to create modern, scalable web applications using React on the frontend and Node.js on the backend.",
      content: "In this comprehensive guide, we'll explore the best practices for building scalable web applications using React and Node.js...",
      tags: ["React", "Node.js", "Web Development", "Scalability"],
      published: true,
      created_at: "2024-01-10T12:00:00Z",
      image_url: null
    },
    {
      id: 2,
      title: "Developing Critical Systems with Ada",
      excerpt: "An introduction to developing safety-critical systems using the Ada programming language.",
      content: "Ada is a programming language designed for developing reliable, maintainable, and efficient software...",
      tags: ["Ada", "Critical Systems", "Safety", "Programming"],
      published: true,
      created_at: "2023-11-15T16:45:00Z",
      image_url: null
    }
  ]
};

// Export for use in components
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.mockData;
}
