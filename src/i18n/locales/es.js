// Spanish translations
const es = {
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    skills: 'Habilidades',
    projects: 'Proyectos',
    contact: 'Contacto'
  },
  hero: {
    name: 'David Fernández-Cuenca Marcos',
    role: 'Ingeniero de Software en Indra',
    tagline: 'Especialista en sistemas críticos y control de tráfico aéreo',
    cta: 'Conectemos'
  },
  about: {
    title: 'Sobre mí',
    brief: 'Ingeniero de software con más de 10 años de experiencia en desarrollo backend, sistemas críticos y tecnologías emergentes.',
    more: 'He liderado proyectos complejos en Python, Ada y C, desarrollando APIs robustas, microservicios escalables y sistemas de control de alta disponibilidad para el sector aeronáutico. Mi experiencia incluye machine learning, optimización de rendimiento y arquitecturas distribuidas. Me apasiona crear soluciones elegantes y eficientes que resuelvan problemas reales.',
    readMore: 'Leer más',
    readLess: 'Leer menos'
  },
  skills: {
    title: 'Habilidades y Tecnologías',
    subtitle: 'Una visión completa de mi experiencia técnica en diferentes dominios',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Herramientas',
      other: 'Otros'
    },
    summary: {
      title: 'Experiencia Técnica',
      description: 'Más de 10 años de experiencia en múltiples tecnologías y dominios'
    },
    nodejs: {
      name: 'Node.js',
      description: 'Desarrollo backend',
      details: 'Express, APIs REST, microservicios'
    },
    python: {
      name: 'Python',
      description: 'Procesamiento de datos',
      details: 'Django, Flask, análisis de datos'
    },
    ada: {
      name: 'Ada',
      description: 'Sistemas críticos',
      details: 'Sistemas en tiempo real, software de seguridad crítica'
    },
    tailwind: {
      name: 'Tailwind CSS',
      description: 'Estilos modernos',
      details: 'Framework CSS utility-first'
    },
    react: {
      name: 'React',
      description: 'Desarrollo frontend',
      details: 'Desarrollo de UI basado en componentes'
    },
    git: {
      name: 'Git',
      description: 'Control de versiones',
      details: 'GitHub, GitLab, desarrollo colaborativo'
    },
    databases: {
      name: 'Bases de Datos',
      description: 'Gestión de datos',
      details: 'PostgreSQL, MongoDB, Redis'
    },
    cloud: {
      name: 'Cloud',
      description: 'Plataformas cloud',
      details: 'AWS, Azure, Docker, Kubernetes'
    },
    ml: {
      name: 'Machine Learning',
      description: 'Desarrollo de IA',
      details: 'TensorFlow, scikit-learn, NLP'
    },
    security: {
      name: 'Seguridad',
      description: 'Seguridad de aplicaciones',
      details: 'OWASP, prácticas de codificación segura'
    },
    testing: {
      name: 'Testing',
      description: 'Aseguramiento de calidad',
      details: 'Testing unitario, testing de integración'
    },
    mobile: {
      name: 'Mobile',
      description: 'Desarrollo móvil',
      details: 'React Native, aplicaciones móviles'
    }
  },
  projects: {
    title: 'Proyectos Destacados',
    repositories: 'Repositorios',
    stars: 'Estrellas',
    commits: 'Commits (30 días)',
    viewOnGitHub: 'Ver en GitHub →',
    loading: 'Cargando proyectos...',
    details: 'Detalles'
  },
  contact: {
    title: 'Ponte en Contacto',
    subtitle: '¿Interesado en colaborar o tienes preguntas?',
    contactInfo: 'Información de Contacto',
    email: 'Email *',
    location: 'Ubicación',
    locationValue: 'Madrid, España',
    availability: 'Disponibilidad',
    availabilityValue: 'Abierto a nuevas oportunidades',
    followMe: 'Sígueme en:',
    sendMessage: 'Envíame un mensaje',
    name: 'Nombre *',
    subject: 'Asunto',
    message: 'Mensaje *',
    send: 'Enviar Mensaje',
    sending: 'Enviando...',
    success: '¡Mensaje enviado con éxito! Te responderé pronto.',
    error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
    networkError: 'Error de red. Por favor, verifica tu conexión e inténtalo de nuevo.',
    rateLimitError: 'Demasiadas solicitudes. Por favor, espera un momento e inténtalo de nuevo.',
    serverError: 'Error del servidor. Por favor, inténtalo más tarde.',
    placeholders: {
      name: 'Escribe tu nombre',
      email: 'Escribe tu dirección de email',
      subject: 'Escribe el asunto de tu mensaje',
      message: 'Escribe tu mensaje aquí...'
    },
    validation: {
      nameRequired: 'El nombre es obligatorio',
      nameMinLength: 'El nombre debe tener al menos 2 caracteres',
      nameMaxLength: 'El nombre no puede exceder 100 caracteres',
      namePattern: 'El nombre solo puede contener letras y espacios',
      emailRequired: 'El email es obligatorio',
      emailInvalid: 'Por favor, introduce un email válido',
      subjectRequired: 'El asunto es obligatorio',
      subjectMinLength: 'El asunto debe tener al menos 5 caracteres',
      subjectMaxLength: 'El asunto no puede exceder 200 caracteres',
      messageRequired: 'El mensaje es obligatorio',
      messageMinLength: 'El mensaje debe tener al menos 10 caracteres',
      messageMaxLength: 'El mensaje no puede exceder 1000 caracteres'
    }
  },
  footer: {
    copyright: '© {year} David Fernández-Cuenca Marcos. Todos los derechos reservados.'
  }
};

// Make available globally
window.es = es; 