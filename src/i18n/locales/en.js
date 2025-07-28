// English translations
const en = {
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact'
  },
  hero: {
    name: 'David Fernández-Cuenca Marcos',
    role: 'Software Engineer at Indra',
    tagline: 'Critical systems and air traffic control specialist',
    cta: "Let's Talk"
  },
  about: {
    title: 'About Me',
    brief: 'Software engineer with over 10 years of experience in backend development, AI, and critical systems.',
    more: 'I have led projects in Python, Ada, and C, building APIs, microservices, and high-availability control systems. I enjoy optimizing code and enhancing user experiences with minimalist designs.',
    readMore: 'Read more',
    readLess: 'Read less'
  },
  skills: {
    title: 'Skills & Technologies',
    subtitle: 'A comprehensive overview of my technical expertise across different domains',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Tools',
      other: 'Other'
    },
    summary: {
      title: 'Technical Expertise',
      description: 'Over 10 years of experience across multiple technologies and domains'
    },
    nodejs: {
      name: 'Node.js',
      description: 'Backend development',
      details: 'Express, REST APIs, microservices'
    },
    python: {
      name: 'Python',
      description: 'Data processing',
      details: 'Django, Flask, data analysis'
    },
    ada: {
      name: 'Ada',
      description: 'Critical systems',
      details: 'Real-time systems, safety-critical software'
    },
    tailwind: {
      name: 'Tailwind CSS',
      description: 'Modern styling',
      details: 'Utility-first CSS framework'
    },
    react: {
      name: 'React',
      description: 'Frontend development',
      details: 'Component-based UI development'
    },
    git: {
      name: 'Git',
      description: 'Version control',
      details: 'GitHub, GitLab, collaborative development'
    },
    databases: {
      name: 'Databases',
      description: 'Data management',
      details: 'PostgreSQL, MongoDB, Redis'
    },
    cloud: {
      name: 'Cloud',
      description: 'Cloud platforms',
      details: 'AWS, Azure, Docker, Kubernetes'
    },
    ml: {
      name: 'Machine Learning',
      description: 'AI development',
      details: 'TensorFlow, scikit-learn, NLP'
    },
    security: {
      name: 'Security',
      description: 'Application security',
      details: 'OWASP, secure coding practices'
    },
    testing: {
      name: 'Testing',
      description: 'Quality assurance',
      details: 'Unit testing, integration testing'
    },
    mobile: {
      name: 'Mobile',
      description: 'Mobile development',
      details: 'React Native, mobile apps'
    }
  },
  projects: {
    title: 'Featured Projects',
    repositories: 'Repositories',
    stars: 'Stars',
    commits: 'Commits (30 days)',
    viewOnGitHub: 'View on GitHub →',
    loading: 'Loading projects...',
    details: 'Details'
  },
  contact: {
    title: 'Get in Touch',
    subtitle: 'Interested in collaborating or have questions?',
    contactInfo: 'Contact Information',
    email: 'Email *',
    location: 'Location',
    locationValue: 'Madrid, Spain',
    availability: 'Availability',
    availabilityValue: 'Open to new opportunities',
    followMe: 'Follow me on:',
    sendMessage: 'Send me a message',
    name: 'Name *',
    subject: 'Subject',
    message: 'Message *',
    send: 'Send Message',
    sending: 'Sending...',
    success: 'Message sent successfully! I\'ll get back to you soon.',
    error: 'Failed to send message. Please try again.',
    networkError: 'Network error. Please check your connection and try again.',
    rateLimitError: 'Too many requests. Please wait a moment and try again.',
    serverError: 'Server error. Please try again later.',
    placeholders: {
      name: 'Enter your name',
      email: 'Enter your email address',
      subject: 'Enter the subject of your message',
      message: 'Write your message here...'
    },
    validation: {
      nameRequired: 'Name is required',
      nameMinLength: 'Name must be at least 2 characters',
      nameMaxLength: 'Name cannot exceed 100 characters',
      namePattern: 'Name can only contain letters and spaces',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      subjectRequired: 'Subject is required',
      subjectMinLength: 'Subject must be at least 5 characters',
      subjectMaxLength: 'Subject cannot exceed 200 characters',
      messageRequired: 'Message is required',
      messageMinLength: 'Message must be at least 10 characters',
      messageMaxLength: 'Message cannot exceed 1000 characters'
    }
  },
  footer: {
    copyright: '© {year} David Fernández-Cuenca Marcos. All rights reserved.'
  }
};

// Make available globally
window.en = en; 