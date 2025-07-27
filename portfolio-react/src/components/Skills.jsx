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