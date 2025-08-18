// Footer Component
function Footer() {
  const { theme } = useAppContext();
  const { t } = useTranslation();

  // Helper function for dynamic theme classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };

  return (
    <footer className={getThemeClasses(
      'py-8 text-center',
      'bg-primary-dark text-textMuted-dark',
      'bg-primary-light text-textMuted-light'
    )}>
      <div className="container mx-auto px-6">
        <p className="mb-4">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        <p className="mb-6 text-sm opacity-80">{t('footer.madeWith')}</p>
        
        <div className="mb-6">
          <p className="text-sm mb-3 opacity-70">{t('footer.social')}</p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://linkedin.com/in/david-cuenca-marcos-03b7121b5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
              aria-label="LinkedIn"
            >
              💼 LinkedIn
            </a>
            <a 
              href="https://github.com/illuminatus503" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
              aria-label="GitHub"
            >
              🐙 GitHub
            </a>
            <a 
              href="https://x.com/illuminatus_503" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
              aria-label="X (Twitter)"
            >
              🐦 X (Twitter)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Make Footer available globally
window.Footer = Footer; 