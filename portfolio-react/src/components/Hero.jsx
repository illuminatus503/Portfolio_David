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