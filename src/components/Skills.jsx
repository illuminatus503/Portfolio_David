// Import useTranslation hook
const { useTranslation } = await import('../i18n/useTranslation.js');

// Skills Component
function Skills() {
  const { theme } = useAppContext();
  const { t } = useTranslation();

  // Helper function for dynamic theme classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };

  const skills = [
    {
      icon: '🚀',
      name: t('skills.nodejs.name'),
      description: t('skills.nodejs.description'),
      details: t('skills.nodejs.details')
    },
    {
      icon: '🐍',
      name: t('skills.python.name'),
      description: t('skills.python.description'),
      details: t('skills.python.details')
    },
    {
      icon: '⚡',
      name: t('skills.ada.name'),
      description: t('skills.ada.description'),
      details: t('skills.ada.details')
    },
    {
      icon: '🎨',
      name: t('skills.tailwind.name'),
      description: t('skills.tailwind.description'),
      details: t('skills.tailwind.details')
    },
    {
      icon: '⚛️',
      name: t('skills.react.name'),
      description: t('skills.react.description'),
      details: t('skills.react.details')
    },
    {
      icon: '🔧',
      name: t('skills.git.name'),
      description: t('skills.git.description'),
      details: t('skills.git.details')
    },
    {
      icon: '🗄️',
      name: t('skills.databases.name'),
      description: t('skills.databases.description'),
      details: t('skills.databases.details')
    },
    {
      icon: '☁️',
      name: t('skills.cloud.name'),
      description: t('skills.cloud.description'),
      details: t('skills.cloud.details')
    },
    {
      icon: '🤖',
      name: t('skills.ml.name'),
      description: t('skills.ml.description'),
      details: t('skills.ml.details')
    },
    {
      icon: '🔒',
      name: t('skills.security.name'),
      description: t('skills.security.description'),
      details: t('skills.security.details')
    },
    {
      icon: '📊',
      name: t('skills.testing.name'),
      description: t('skills.testing.description'),
      details: t('skills.testing.details')
    },
    {
      icon: '📱',
      name: t('skills.mobile.name'),
      description: t('skills.mobile.description'),
      details: t('skills.mobile.details')
    }
  ];

  return (
    <section id="skills" className={getThemeClasses(
      'py-24',
      'bg-primary-dark',
      'bg-primary-light'
    )}>
      <div className="container mx-auto px-6">
        <h2 className={getThemeClasses(
          'text-3xl md:text-4xl font-display font-semibold mb-8',
          'text-textLight-dark',
          'text-textLight-light'
        )}>
          {t('skills.title')}
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className={getThemeClasses(
                'skill-card p-6 rounded-lg text-center hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300',
                'bg-secondary-dark hover:shadow-indigo-500/25',
                'bg-secondary-light hover:shadow-indigo-500/25'
              )}
            >
              <div className="text-3xl mb-3">{skill.icon}</div>
              <p className="font-semibold text-accent mb-1">{skill.name}</p>
              <p className={getThemeClasses(
                'text-sm',
                'text-textMuted-dark',
                'text-textMuted-light'
              )}>
                {skill.description}
              </p>
              <div className={getThemeClasses(
                'mt-2 text-xs',
                'text-textMuted-dark',
                'text-textMuted-light'
              )}>
                {skill.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 