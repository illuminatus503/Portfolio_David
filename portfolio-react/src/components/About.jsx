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