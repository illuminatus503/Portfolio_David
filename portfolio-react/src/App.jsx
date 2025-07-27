// Main App Component
const { useState, useEffect, createContext, useContext } = React;

// Context for theme and language
const AppContext = createContext();

// Custom hook for context
const useAppContext = () => useContext(AppContext);

// App Component
function App() {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme and language from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('lang');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.className = `theme-${theme}`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply language
  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const contextValue = {
    theme,
    setTheme,
    language,
    setLanguage,
    mobileMenuOpen,
    setMobileMenuOpen
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-primary text-textLight">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

// Navbar Component
function Navbar() {
  const { theme, setTheme, language, setLanguage, mobileMenuOpen, setMobileMenuOpen } = useAppContext();

  const translations = {
    es: {
      home: 'Inicio',
      about: 'Sobre mí',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto'
    },
    en: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact'
    }
  };

  const t = translations[language];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-primary/90 backdrop-blur-md border-b border-secondary">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="text-2xl font-display font-semibold hover:text-accent transition"
          >
            {t.home}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection('about')} className="nav-link">{t.about}</button>
            <button onClick={() => scrollToSection('skills')} className="nav-link">{t.skills}</button>
            <button onClick={() => scrollToSection('projects')} className="nav-link">{t.projects}</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">{t.contact}</button>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 bg-secondary rounded hover:bg-secondary/80 transition"
              aria-label="Toggle language"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1 bg-secondary rounded hover:bg-secondary/80 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded hover:bg-secondary/50 transition"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-secondary">
            <div className="flex flex-col space-y-2 pt-4">
              <button onClick={() => scrollToSection('about')} className="text-left py-2 hover:text-accent transition">{t.about}</button>
              <button onClick={() => scrollToSection('skills')} className="text-left py-2 hover:text-accent transition">{t.skills}</button>
              <button onClick={() => scrollToSection('projects')} className="text-left py-2 hover:text-accent transition">{t.projects}</button>
              <button onClick={() => scrollToSection('contact')} className="text-left py-2 hover:text-accent transition">{t.contact}</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Component
function Hero() {
  const { language } = useAppContext();

  const translations = {
    es: {
      name: 'David Fernández-Cuenca Marcos',
      role: 'Ingeniero de Software en Indra',
      tagline: 'Especialista en sistemas críticos y control de tráfico aéreo',
      cta: 'Conectemos'
    },
    en: {
      name: 'David Fernández-Cuenca Marcos',
      role: 'Software Engineer at Indra',
      tagline: 'Critical systems and air traffic control specialist',
      cta: "Let's Talk"
    }
  };

  const t = translations[language];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-6 pt-20 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Profile Image */}
      <img 
        src="https://avatars.githubusercontent.com/u/22548652?v=4" 
        alt="David Fernández-Cuenca Marcos - Foto de perfil" 
        className="w-32 h-32 rounded-full mb-4 ring-2 ring-accent relative z-10" 
        loading="lazy" 
      />
      
      {/* Content */}
      <h1 className="text-4xl md:text-6xl font-display font-semibold mb-2 relative z-10">
        {t.name}
      </h1>
      <p className="text-xl md:text-2xl opacity-80 mb-4 relative z-10">
        {t.role}
      </p>
      <p className="italic text-lg md:text-xl opacity-70 mb-8 cursor relative z-10">
        {t.tagline}
      </p>
      
      {/* CTA Button */}
      <button
        onClick={scrollToContact}
        className="px-8 py-3 border-2 border-accent rounded-full hover:bg-accent hover:text-white transition focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 relative z-10"
        aria-label="Ir a la sección de contacto"
      >
        {t.cta}
      </button>
    </section>
  );
}

// About Component
function About() {
  const { language } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const translations = {
    es: {
      title: 'Sobre mí',
      brief: 'Ingeniero de software con más de 10 años de experiencia en desarrollo backend, sistemas críticos y tecnologías emergentes.',
      more: 'He liderado proyectos complejos en Python, Ada y C, desarrollando APIs robustas, microservicios escalables y sistemas de control de alta disponibilidad para el sector aeronáutico. Mi experiencia incluye machine learning, optimización de rendimiento y arquitecturas distribuidas. Me apasiona crear soluciones elegantes y eficientes que resuelvan problemas reales.',
      readMore: 'Leer más',
      readLess: 'Leer menos'
    },
    en: {
      title: 'About Me',
      brief: 'Software engineer with over 10 years of experience in backend development, AI, and critical systems.',
      more: 'I have led projects in Python, Ada, and C, building APIs, microservices, and high-availability control systems. I enjoy optimizing code and enhancing user experiences with minimalist designs.',
      readMore: 'Read more',
      readLess: 'Read less'
    }
  };

  const t = translations[language];

  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
          {t.title}
        </h2>
        <p className="text-lg mb-4">
          {t.brief}
        </p>
        
        <div className="bg-primary p-4 rounded">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer text-accent font-medium hover:underline focus:outline-none"
            aria-expanded={isExpanded}
          >
            {isExpanded ? t.readLess : t.readMore}
          </button>
          
          {isExpanded && (
            <p className="mt-2 text-textMuted">
              {t.more}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// Skills Component
function Skills() {
  const { language } = useAppContext();

  const translations = {
    es: {
      title: 'Habilidades Técnicas'
    },
    en: {
      title: 'Skills'
    }
  };

  const t = translations[language];

  const skills = [
    {
      icon: '🚀',
      name: 'Node.js',
      description: language === 'es' ? 'Backend & APIs REST' : 'Backend & REST APIs',
      details: 'Express, Fastify'
    },
    {
      icon: '🐍',
      name: 'Python',
      description: language === 'es' ? 'Automatización & ML' : 'Automation & ML',
      details: 'Django, Flask, TensorFlow'
    },
    {
      icon: '⚡',
      name: 'Ada & C',
      description: language === 'es' ? 'Sistemas críticos' : 'Critical systems',
      details: 'Embedded, Real-time'
    },
    {
      icon: '🎨',
      name: 'Tailwind CSS',
      description: language === 'es' ? 'Diseño rápido' : 'Rapid design',
      details: 'Responsive, Utility-first'
    },
    {
      icon: '⚛️',
      name: 'React',
      description: language === 'es' ? 'Interfaces dinámicas' : 'Dynamic interfaces',
      details: 'Hooks, Context, Redux'
    },
    {
      icon: '🔧',
      name: 'Git & CI/CD',
      description: language === 'es' ? 'Control de versiones' : 'Version control',
      details: 'GitHub Actions, Jenkins'
    },
    {
      icon: '🗄️',
      name: 'Databases',
      description: 'SQL & NoSQL',
      details: 'PostgreSQL, MongoDB, Redis'
    },
    {
      icon: '☁️',
      name: 'Cloud & DevOps',
      description: language === 'es' ? 'Infraestructura' : 'Infrastructure',
      details: 'AWS, Docker, Kubernetes'
    },
    {
      icon: '🤖',
      name: 'Machine Learning',
      description: language === 'es' ? 'IA & Análisis' : 'AI & Analytics',
      details: 'Neural Networks, NLP'
    },
    {
      icon: '🔒',
      name: 'Security',
      description: language === 'es' ? 'Ciberseguridad' : 'Cybersecurity',
      details: 'OAuth, JWT, HTTPS'
    },
    {
      icon: '📊',
      name: 'Testing',
      description: language === 'es' ? 'Calidad de código' : 'Code quality',
      details: 'Jest, PyTest, TDD'
    },
    {
      icon: '📱',
      name: 'Mobile',
      description: language === 'es' ? 'Desarrollo móvil' : 'Mobile development',
      details: 'React Native, Flutter'
    }
  ];

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">
          {t.title}
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="skill-card bg-secondary p-6 rounded-lg text-center hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl mb-3">{skill.icon}</div>
              <p className="font-semibold text-accent mb-1">{skill.name}</p>
              <p className="text-textMuted text-sm">{skill.description}</p>
              <div className="mt-2 text-xs text-textMuted">{skill.details}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Component
function Projects() {
  const { language } = useAppContext();
  const [githubData, setGithubData] = useState({
    repos: 0,
    stars: 0,
    commits: 0
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const translations = {
    es: {
      title: 'Proyectos Destacados',
      repositories: 'Repositorios',
      stars: 'Estrellas',
      commits: 'Commits (30 días)',
      viewOnGitHub: 'Ver en GitHub →',
      loading: 'Cargando proyectos...'
    },
    en: {
      title: 'Featured Projects',
      repositories: 'Repositories',
      stars: 'Stars',
      commits: 'Commits (30 days)',
      viewOnGitHub: 'View on GitHub →',
      loading: 'Loading projects...'
    }
  };

  const t = translations[language];

  const featuredProjects = [
    {
      title: 'LeetCode‑Exercises',
      brief: language === 'es' ? 'Colección de soluciones a problemas de algoritmos y estructuras de datos.' : 'Algorithm and data structure problem solutions in Python.',
      more: language === 'es' ? 'Más de 200 ejercicios resueltos con análisis de complejidad temporal y espacial, optimizaciones y explicaciones detalladas de las estrategias utilizadas.' : 'Includes 200+ solved exercises with complexity analysis and optimizations.',
      tags: ['Python', 'Algorithms', 'Data Structures'],
      url: 'https://github.com/illuminatus503/LeetCode-Exercises'
    },
    {
      title: 'Basic‑Data‑Structures',
      brief: language === 'es' ? 'Implementaciones educativas de estructuras de datos fundamentales.' : 'Data structure implementations in Python, C++, and Ada.',
      more: language === 'es' ? 'Implementaciones completas en Python, C++ y Ada de listas, pilas, colas, árboles y grafos, con ejemplos prácticos y documentación detallada.' : 'Covering lists, stacks, queues, trees, and graphs with usage examples.',
      tags: ['Python', 'C++', 'Ada'],
      url: 'https://github.com/illuminatus503/Basic-Data-Structures'
    },
    {
      title: 'valet',
      brief: language === 'es' ? 'Suite de utilidades y herramientas de automatización para desarrollo.' : '"Valet, your truthful servant"—main utilities repo.',
      more: language === 'es' ? 'Herramientas CLI, scripts de automatización y librerías internas utilizadas en proyectos empresariales para optimizar flujos de trabajo de desarrollo.' : 'Contains automation scripts, CLI tools, and internal libraries for enterprise projects.',
      tags: ['CLI', 'Automation', 'Utilities'],
      url: 'https://github.com/illuminatus503/valet'
    },
    {
      title: 'AARN23.BachChorales',
      brief: language === 'es' ? 'Proyecto de machine learning para análisis musical.' : 'ML/NN course project on Bach chorales.',
      more: language === 'es' ? 'Sistema de clasificación de corales de Bach utilizando redes neuronales profundas y análisis avanzado de características musicales.' : 'Classifies Bach chorales using deep neural networks and musical feature analysis.',
      tags: ['Machine Learning', 'Neural Networks', 'Music Analysis'],
      url: 'https://github.com/illuminatus503/AARN23.BachChorales'
    }
  ];

  // Load GitHub data
  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        const username = 'illuminatus503';
        
        // Load user stats
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Load repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const reposData = await reposResponse.json();
        
        let totalStars = 0;
        const dynamicProjects = [];
        
        reposData.forEach(repo => {
          totalStars += repo.stargazers_count || 0;
          if (!repo.fork && repo.description) {
            dynamicProjects.push({
              name: repo.name,
              description: repo.description,
              language: repo.language || 'Other',
              stars: repo.stargazers_count || 0,
              forks: repo.forks_count || 0,
              url: repo.html_url,
              topics: repo.topics || []
            });
          }
        });
        
        setGithubData({
          repos: userData.public_repos || 0,
          stars: totalStars,
          commits: 0 // Would need additional API call for commits
        });
        
        setProjects(dynamicProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error loading GitHub data:', error);
        setLoading(false);
      }
    };

    loadGitHubData();
  }, []);

  return (
    <section id="projects" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">
          {t.title}
        </h2>
        
        {/* GitHub Stats */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-accent mb-2">{githubData.repos}</div>
            <p className="text-textMuted">{t.repositories}</p>
          </div>
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-accent mb-2">{githubData.stars}</div>
            <p className="text-textMuted">{t.stars}</p>
          </div>
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-accent mb-2">{githubData.commits}</div>
            <p className="text-textMuted">{t.commits}</p>
          </div>
        </div>
        
        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <div key={index} className="project-card bg-primary rounded-lg shadow overflow-hidden hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-textMuted mb-2">{project.brief}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <details className="bg-secondary p-3 rounded">
                  <summary className="cursor-pointer text-accent hover:underline">
                    {language === 'es' ? 'Detalles' : 'Details'}
                  </summary>
                  <p className="mt-2 text-textMuted">{project.more}</p>
                </details>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-accent hover:underline"
                >
                  {t.viewOnGitHub}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dynamic GitHub Projects */}
        {loading ? (
          <div className="text-center py-8">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-textMuted">{t.loading}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="project-card bg-primary rounded-lg shadow overflow-hidden hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-textMuted">
                      <span>⭐ {project.stars}</span>
                      <span>🔀 {project.forks}</span>
                    </div>
                  </div>
                  <p className="text-textMuted mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                      {project.language}
                    </span>
                    {project.topics.slice(0, 3).map((topic, topicIndex) => (
                      <span key={topicIndex} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-accent hover:underline"
                  >
                    {t.viewOnGitHub}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Contact Component
function Contact() {
  const { language } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translations = {
    es: {
      title: 'Contacto',
      subtitle: '¿Interesado en colaborar o tienes alguna pregunta?',
      contactInfo: 'Información de Contacto',
      email: 'Email',
      location: 'Ubicación',
      locationValue: 'Madrid, España',
      availability: 'Disponibilidad',
      availabilityValue: 'Abierto a nuevas oportunidades',
      followMe: 'Sígueme en:',
      sendMessage: 'Envíame un mensaje',
      name: 'Nombre *',
      subject: 'Asunto *',
      message: 'Mensaje *',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado con éxito! Te responderé pronto.',
      error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
    },
    en: {
      title: 'Get in Touch',
      subtitle: 'Interested in collaborating or have questions?',
      contactInfo: 'Contact Information',
      email: 'Email',
      location: 'Location',
      locationValue: 'Madrid, Spain',
      availability: 'Availability',
      availabilityValue: 'Open to new opportunities',
      followMe: 'Follow me on:',
      sendMessage: 'Send me a message',
      name: 'Name *',
      subject: 'Subject *',
      message: 'Message *',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Message sent successfully! I\'ll get back to you soon.',
      error: 'Error sending message. Please try again.'
    }
  };

  const t = translations[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormStatus({ type: 'success', message: t.success });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus({ type: 'error', message: t.error });
    } finally {
      setIsSubmitting(false);
      
      // Hide status after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: '', message: '' });
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8 text-center">
          {t.title}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">{t.contactInfo}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent text-xl">📧</span>
                </div>
                <div>
                  <p className="font-medium">{t.email}</p>
                  <a href="mailto:david.fernandez-cuenca@example.com" className="text-accent hover:underline">
                    david.fernandez-cuenca@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent text-xl">📍</span>
                </div>
                <div>
                  <p className="font-medium">{t.location}</p>
                  <p className="text-textMuted">{t.locationValue}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent text-xl">💼</span>
                </div>
                <div>
                  <p className="font-medium">{t.availability}</p>
                  <p className="text-textMuted">{t.availabilityValue}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <h4 className="font-medium mb-4">{t.followMe}</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://linkedin.com/in/david-cuenca-marcos-03b7121b5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-accent/20 transition"
                  aria-label="LinkedIn"
                >
                  <span className="text-xl">💼</span>
                </a>
                <a 
                  href="https://github.com/illuminatus503" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-accent/20 transition"
                  aria-label="GitHub"
                >
                  <span className="text-xl">🐙</span>
                </a>
                <a 
                  href="https://twitter.com/david_cuenca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-accent/20 transition"
                  aria-label="Twitter"
                >
                  <span className="text-xl">🐦</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-secondary p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">{t.sendMessage}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">{t.name}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-lg focus:outline-none focus:border-accent transition"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">{t.email}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-lg focus:outline-none focus:border-accent transition"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">{t.subject}</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-lg focus:outline-none focus:border-accent transition"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">{t.message}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-lg focus:outline-none focus:border-accent transition resize-none"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-accent text-white py-3 px-6 rounded-lg hover:bg-accent/90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t.sending : t.send}
              </button>
            </form>
            
            {formStatus.message && (
              <div className={`mt-4 text-center ${formStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {formStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-primary py-6 text-center text-textMuted">
      <div className="container mx-auto px-6">
        <p>© {new Date().getFullYear()} David Fernández-Cuenca Marcos. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root')); 