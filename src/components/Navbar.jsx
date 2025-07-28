// Import useTranslation hook
const { useTranslation } = await import('../i18n/useTranslation.js');

// Navbar Component
function Navbar() {
  const { theme, setTheme, language, setLanguage, mobileMenuOpen, setMobileMenuOpen } = useAppContext();
  const { t } = useTranslation();

  // Helper function for dynamic theme classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };

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
    <nav className={getThemeClasses(
      'fixed inset-x-0 top-0 z-50 backdrop-blur-md border-b transition-colors duration-300',
      'bg-primary-dark/90 border-secondary-dark',
      'bg-primary-light/90 border-secondary-light'
    )}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className={getThemeClasses(
              'text-2xl font-display font-semibold transition-colors duration-200 hover:text-accent',
              'text-textLight-dark',
              'text-textLight-light'
            )}
          >
            {t('nav.home')}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {[
              { id: 'about', label: t('nav.about') },
              { id: 'skills', label: t('nav.skills') },
              { id: 'projects', label: t('nav.projects') },
              { id: 'contact', label: t('nav.contact') }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                className={getThemeClasses(
                  'nav-link transition-colors duration-200 hover:text-accent',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={getThemeClasses(
                'px-3 py-1 rounded transition-colors duration-200',
                'bg-secondary-dark text-textLight-dark hover:bg-secondary-dark/80',
                'bg-secondary-light text-textLight-light hover:bg-secondary-light/80'
              )}
              aria-label="Toggle language"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={getThemeClasses(
                'px-3 py-1 rounded transition-colors duration-200',
                'bg-secondary-dark text-textLight-dark hover:bg-secondary-dark/80',
                'bg-secondary-light text-textLight-light hover:bg-secondary-light/80'
              )}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={getThemeClasses(
                'md:hidden p-2 rounded transition-colors duration-200',
                'text-textLight-dark hover:bg-secondary-dark/50',
                'text-textLight-light hover:bg-secondary-light/50'
              )}
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
          <div className={getThemeClasses(
            'md:hidden mt-4 pb-4 border-t transition-colors duration-300',
            'border-secondary-dark',
            'border-secondary-light'
          )}>
            <div className="flex flex-col space-y-2 pt-4">
              {[
                { id: 'about', label: t('nav.about') },
                { id: 'skills', label: t('nav.skills') },
                { id: 'projects', label: t('nav.projects') },
                { id: 'contact', label: t('nav.contact') }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className={getThemeClasses(
                    'text-left py-2 transition-colors duration-200 hover:text-accent',
                    'text-textLight-dark',
                    'text-textLight-light'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 