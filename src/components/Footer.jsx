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
      'py-6 text-center',
      'bg-primary-dark text-textMuted-dark',
      'bg-primary-light text-textMuted-light'
    )}>
      <div className="container mx-auto px-6">
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}

// Make Footer available globally
window.Footer = Footer; 