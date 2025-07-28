// Import useTranslation hook
const { useTranslation } = await import('../i18n/useTranslation.js');

// About Component
function About() {
  const { theme } = useAppContext();
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper function for dynamic theme classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };

  return (
    <section id="about" className={getThemeClasses(
      'py-24',
      'bg-secondary-dark',
      'bg-secondary-light'
    )}>
      <div className="container mx-auto px-6">
        <h2 className={getThemeClasses(
          'text-3xl md:text-4xl font-display font-semibold mb-4',
          'text-textLight-dark',
          'text-textLight-light'
        )}>
          {t('about.title')}
        </h2>
        <p className={getThemeClasses(
          'text-lg mb-4',
          'text-textLight-dark',
          'text-textLight-light'
        )}>
          {t('about.brief')}
        </p>
        
        <div className={getThemeClasses(
          'p-4 rounded',
          'bg-primary-dark',
          'bg-primary-light'
        )}>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer text-accent font-medium hover:underline focus:outline-none"
            aria-expanded={isExpanded}
          >
            {isExpanded ? t('about.readLess') : t('about.readMore')}
          </button>
          
          {isExpanded && (
            <p className={getThemeClasses(
              'mt-2',
              'text-textMuted-dark',
              'text-textMuted-light'
            )}>
              {t('about.more')}
            </p>
          )}
        </div>
      </div>
    </section>
  );
} 