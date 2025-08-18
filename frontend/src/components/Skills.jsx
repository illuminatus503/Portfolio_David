// Skills Component - Optimized version
function Skills() {
  const { theme } = useAppContext();
  // Use global translation function directly, not the hook
  const t = window.t;

  // Memoize translations to avoid re-renders
  const translations = React.useMemo(() => ({
    title: t('skills.title'),
    categories: {
      frontend: t('skills.categories.frontend'),
      backend: t('skills.categories.backend'),
      tools: t('skills.categories.tools'),
      other: t('skills.categories.other')
    },
    skills: {
      nodejs: {
        name: t('skills.nodejs.name'),
        description: t('skills.nodejs.description'),
        details: t('skills.nodejs.details')
      },
      python: {
        name: t('skills.python.name'),
        description: t('skills.python.description'),
        details: t('skills.python.details')
      },
      ada: {
        name: t('skills.ada.name'),
        description: t('skills.ada.description'),
        details: t('skills.ada.details')
      },
      java: {
        name: t('skills.java.name'),
        description: t('skills.java.description'),
        details: t('skills.java.details')
      },
      cpp: {
        name: t('skills.cpp.name'),
        description: t('skills.cpp.description'),
        details: t('skills.cpp.details')
      },
      sql: {
        name: t('skills.sql.name'),
        description: t('skills.sql.description'),
        details: t('skills.sql.details')
      },
      cobol: {
        name: t('skills.cobol.name'),
        description: t('skills.cobol.description'),
        details: t('skills.cobol.details')
      },
      fortran: {
        name: t('skills.fortran.name'),
        description: t('skills.fortran.description'),
        details: t('skills.fortran.details')
      },
      tailwind: {
        name: t('skills.tailwind.name'),
        description: t('skills.tailwind.description'),
        details: t('skills.tailwind.details')
      },
      react: {
        name: t('skills.react.name'),
        description: t('skills.react.description'),
        details: t('skills.react.details')
      },
      git: {
        name: t('skills.git.name'),
        description: t('skills.git.description'),
        details: t('skills.git.details')
      },
      databases: {
        name: t('skills.databases.name'),
        description: t('skills.databases.description'),
        details: t('skills.databases.details')
      },
      cloud: {
        name: t('skills.cloud.name'),
        description: t('skills.cloud.description'),
        details: t('skills.cloud.details')
      },
      ml: {
        name: t('skills.ml.name'),
        description: t('skills.ml.description'),
        details: t('skills.ml.details')
      },
      security: {
        name: t('skills.security.name'),
        description: t('skills.security.description'),
        details: t('skills.security.details')
      },
      testing: {
        name: t('skills.testing.name'),
        description: t('skills.testing.description'),
        details: t('skills.testing.details')
      },
      mobile: {
        name: t('skills.mobile.name'),
        description: t('skills.mobile.description'),
        details: t('skills.mobile.details')
      }
    }
  }), []); // Empty dependency array - translations won't change during component lifecycle

  // State for active category and hover effects
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [hoveredSkill, setHoveredSkill] = React.useState(null);

  // Helper function for dynamic theme classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };

  // Organized skills by category
  const skillsByCategory = React.useMemo(() => ({
    frontend: [
      { key: 'react', icon: '⚛️', category: 'frontend' },
      { key: 'tailwind', icon: '🎨', category: 'frontend' }
    ],
    backend: [
      { key: 'nodejs', icon: '🚀', category: 'backend' },
      { key: 'python', icon: '🐍', category: 'backend' },
      { key: 'ada', icon: '⚡', category: 'backend' },
      { key: 'java', icon: '☕', category: 'backend' },
      { key: 'cpp', icon: '⚙️', category: 'backend' },
      { key: 'sql', icon: '🗄️', category: 'backend' },
      { key: 'cobol', icon: '💾', category: 'backend' },
      { key: 'fortran', icon: '🔬', category: 'backend' }
    ],
    tools: [
      { key: 'git', icon: '🔧', category: 'tools' },
      { key: 'testing', icon: '📊', category: 'tools' },
      { key: 'security', icon: '🔒', category: 'tools' }
    ],
    other: [
      { key: 'cloud', icon: '☁️', category: 'other' },
      { key: 'ml', icon: '🤖', category: 'other' },
      { key: 'mobile', icon: '📱', category: 'other' }
    ]
  }), []);

  // Get all skills for current filter
  const filteredSkills = React.useMemo(() => {
    if (activeCategory === 'all') {
      return Object.values(skillsByCategory).flat();
    }
    return skillsByCategory[activeCategory] || [];
  }, [activeCategory, skillsByCategory]);

  // Categories for filter
  const categories = [
    { key: 'all', label: 'All Skills' },
    { key: 'frontend', label: translations.categories.frontend },
    { key: 'backend', label: translations.categories.backend },
    { key: 'tools', label: translations.categories.tools },
    { key: 'other', label: translations.categories.other }
  ];

  return (
    <section id="skills" className={getThemeClasses(
      'py-24',
      'bg-primary-dark',
      'bg-primary-light'
    )}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={getThemeClasses(
            'text-3xl md:text-4xl font-display font-semibold mb-4',
            'text-textLight-dark',
            'text-textLight-light'
          )}>
            {translations.title}
          </h2>
          <p className={getThemeClasses(
            'text-lg max-w-2xl mx-auto',
            'text-textMuted-dark',
            'text-textMuted-light'
          )}>
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={getThemeClasses(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                activeCategory === category.key
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-secondary-dark text-textLight-dark hover:bg-secondary-dark/80',
                activeCategory === category.key
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-secondary-light text-textLight-light hover:bg-secondary-light/80'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => {
            const skillData = translations.skills[skill.key];
            const isHovered = hoveredSkill === skill.key;
            
            return (
              <div 
                key={skill.key}
                onMouseEnter={() => setHoveredSkill(skill.key)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={getThemeClasses(
                  `skill-card p-6 rounded-xl text-center transition-all duration-300 cursor-pointer transform ${
                    isHovered ? 'scale-105 -translate-y-2' : 'hover:scale-102 hover:-translate-y-1'
                  }`,
                  'bg-secondary-dark hover:shadow-indigo-500/25 hover:shadow-xl',
                  'bg-secondary-light hover:shadow-indigo-500/25 hover:shadow-xl'
                )}
              >
                <div className={`text-4xl mb-4 transition-transform duration-300 ${
                  isHovered ? 'scale-110' : ''
                }`}>
                  {skill.icon}
                </div>
                
                <h3 className={getThemeClasses(
                  'font-semibold text-lg mb-2',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  {skillData.name}
                </h3>
                
                <p className={getThemeClasses(
                  'text-sm mb-3',
                  'text-textMuted-dark',
                  'text-textMuted-light'
                )}>
                  {skillData.description}
                </p>
                
                <div className={getThemeClasses(
                  'text-xs p-2 rounded-lg',
                  'bg-primary-dark/50 text-textMuted-dark',
                  'bg-primary-light/50 text-textMuted-light'
                )}>
                  {skillData.details}
                </div>

                {/* Category Badge */}
                <div className="mt-3">
                  <span className={getThemeClasses(
                    'inline-block px-2 py-1 text-xs rounded-full',
                    'bg-accent/20 text-accent',
                    'bg-accent/20 text-accent'
                  )}>
                    {translations.categories[skill.category]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills Summary */}
        <div className="mt-12 text-center">
          <div className={getThemeClasses(
            'inline-block p-6 rounded-xl',
            'bg-secondary-dark',
            'bg-secondary-light'
          )}>
            <h3 className={getThemeClasses(
              'text-xl font-semibold mb-2',
              'text-textLight-dark',
              'text-textLight-light'
            )}>
              {t('skills.summary.title')}
            </h3>
            <p className={getThemeClasses(
              'text-sm',
              'text-textMuted-dark',
              'text-textMuted-light'
            )}>
              {t('skills.summary.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Make Skills available globally
window.Skills = Skills; 