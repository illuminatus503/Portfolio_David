// Projects Component - Dynamic API Integration
function Projects() {
  const { theme } = useAppContext();
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL - simple configuration
  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : '/api';

  // Helper function for dynamic theme classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };

  // Load projects from API or mock data
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try API first, fallback to mock data
        try {
          const response = await fetch(`${API_BASE}/projects`);
          if (response.ok) {
            const data = await response.json();
            setProjects(data);
            return;
          }
        } catch (apiError) {
          console.log('API not available, using mock data');
        }
        
        // Use mock data if API fails
        if (window.mockData?.projects) {
          setProjects(window.mockData.projects);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        setError('Error loading projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [API_BASE]);

  // Filter featured and regular projects
  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);

  if (loading) {
    return (
      <section id="projects" className={getThemeClasses('py-24', 'bg-primary-dark', 'bg-primary-light')}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className={getThemeClasses(
              'text-lg',
              'text-textMuted-dark',
              'text-textMuted-light'
            )}>
              Cargando proyectos...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className={getThemeClasses('py-24', 'bg-primary-dark', 'bg-primary-light')}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className={getThemeClasses(
              'text-lg text-red-500',
              'text-red-400',
              'text-red-600'
            )}>
              {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className={getThemeClasses(
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
            {t('projects.title')}
          </h2>
          <p className={getThemeClasses(
            'text-lg max-w-2xl mx-auto',
            'text-textMuted-dark',
            'text-textMuted-light'
          )}>
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className={getThemeClasses(
              'text-2xl font-semibold mb-8 text-center',
              'text-textLight-dark',
              'text-textLight-light'
            )}>
              {t('projects.featured')}
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <div key={project.id || index} className={getThemeClasses(
                  'p-6 rounded-xl transition-all duration-300 hover:scale-105',
                  'bg-secondary-dark border border-secondary-dark/50 hover:shadow-indigo-500/25 hover:shadow-xl',
                  'bg-secondary-light border border-secondary-light/50 hover:shadow-indigo-500/25 hover:shadow-xl'
                )}>
                  <h4 className={getThemeClasses(
                    'text-xl font-semibold mb-3',
                    'text-textLight-dark',
                    'text-textLight-light'
                  )}>
                    {project.title}
                  </h4>
                  
                  <p className={getThemeClasses(
                    'text-sm mb-4',
                    'text-textMuted-dark',
                    'text-textMuted-light'
                  )}>
                    {project.description}
                  </p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className={getThemeClasses(
                          'px-3 py-1 text-xs rounded-full',
                          'bg-accent/20 text-accent',
                          'bg-accent/20 text-accent'
                        )}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={getThemeClasses(
                          'flex-1 px-4 py-2 text-center rounded-lg transition-colors',
                          'bg-secondary-dark text-textLight-dark hover:bg-secondary-dark/80 border border-secondary-dark/50',
                          'bg-secondary-light text-textLight-light hover:bg-secondary-light/80 border border-secondary-light/50'
                        )}
                      >
                        📁 GitHub
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 text-center rounded-lg bg-accent text-white hover:bg-accent/80 transition-colors"
                      >
                        🌐 Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects */}
        {regularProjects.length > 0 && (
          <div>
            <h3 className={getThemeClasses(
              'text-2xl font-semibold mb-8 text-center',
              'text-textLight-dark',
              'text-textLight-light'
            )}>
              {t('projects.other')}
            </h3>
            <div className="grid lg:grid-cols-3 gap-6">
              {regularProjects.map((project, index) => (
                <div key={project.id || index} className={getThemeClasses(
                  'p-6 rounded-xl transition-all duration-300 hover:scale-105',
                  'bg-secondary-dark border border-secondary-dark/50 hover:shadow-indigo-500/25 hover:shadow-xl',
                  'bg-secondary-light border border-secondary-light/50 hover:shadow-indigo-500/25 hover:shadow-xl'
                )}>
                  <h4 className={getThemeClasses(
                    'text-lg font-semibold mb-3',
                    'text-textLight-dark',
                    'text-textLight-light'
                  )}>
                    {project.title}
                  </h4>
                  
                  <p className={getThemeClasses(
                    'text-sm mb-4 line-clamp-3',
                    'text-textMuted-dark',
                    'text-textMuted-light'
                  )}>
                    {project.description}
                  </p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span key={techIndex} className={getThemeClasses(
                          'px-2 py-1 text-xs rounded-full',
                          'bg-accent/20 text-accent',
                          'bg-accent/20 text-accent'
                        )}>
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className={getThemeClasses(
                          'px-2 py-1 text-xs rounded-full',
                          'bg-secondary-dark text-textMuted-dark',
                          'bg-secondary-light text-textMuted-light'
                        )}>
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={getThemeClasses(
                          'flex-1 px-3 py-2 text-center text-sm rounded-lg transition-colors',
                          'bg-secondary-dark text-textLight-dark hover:bg-secondary-dark/80 border border-secondary-dark/50',
                          'bg-secondary-light text-textLight-light hover:bg-secondary-light/80 border border-secondary-light/50'
                        )}
                      >
                        📁
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 text-center text-sm rounded-lg bg-accent text-white hover:bg-accent/80 transition-colors"
                      >
                        🌐
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No projects message */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className={getThemeClasses(
              'text-lg',
              'text-textMuted-dark',
              'text-textMuted-light'
            )}>
              No hay proyectos disponibles aún. ¡Vuelve pronto!
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Make Projects available globally
window.Projects = Projects; 