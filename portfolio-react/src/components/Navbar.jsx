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