// Import useTranslation hook
const { useTranslation } = await import('../i18n/useTranslation.js');

// Projects Component
function Projects() {
  const { theme } = useAppContext();
  const { t } = useTranslation();
  const [githubData, setGithubData] = useState({
    repos: 0,
    stars: 0,
    commits: 0
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function for dynamic theme classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };

  const featuredProjects = [
    {
      title: t('projects.leetcode.title'),
      brief: t('projects.leetcode.brief'),
      more: t('projects.leetcode.more'),
      tags: ['Python', 'Algorithms', 'Data Structures'],
      url: 'https://github.com/illuminatus503/LeetCode-Exercises'
    },
    {
      title: t('projects.dataStructures.title'),
      brief: t('projects.dataStructures.brief'),
      more: t('projects.dataStructures.more'),
      tags: ['Python', 'C++', 'Ada'],
      url: 'https://github.com/illuminatus503/Basic-Data-Structures'
    },
    {
      title: t('projects.valet.title'),
      brief: t('projects.valet.brief'),
      more: t('projects.valet.more'),
      tags: ['CLI', 'Automation', 'Utilities'],
      url: 'https://github.com/illuminatus503/valet'
    },
    {
      title: t('projects.bachChorales.title'),
      brief: t('projects.bachChorales.brief'),
      more: t('projects.bachChorales.more'),
      tags: ['Machine Learning', 'Neural Networks', 'Music Analysis'],
      url: 'https://github.com/illuminatus503/AARN23.BachChorales'
    }
  ];

  // Load GitHub data
  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        const username = 'illuminatus503';
        
        // Load user stats
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Load repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const reposData = await reposResponse.json();
        
        let totalStars = 0;
        const dynamicProjects = [];
        
        reposData.forEach(repo => {
          totalStars += repo.stargazers_count || 0;
          if (!repo.fork && repo.description) {
            dynamicProjects.push({
              name: repo.name,
              description: repo.description,
              language: repo.language || 'Other',
              stars: repo.stargazers_count || 0,
              forks: repo.forks_count || 0,
              url: repo.html_url,
              topics: repo.topics || []
            });
          }
        });
        
        setGithubData({
          repos: userData.public_repos || 0,
          stars: totalStars,
          commits: 0 // Would need additional API call for commits
        });
        
        setProjects(dynamicProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error loading GitHub data:', error);
        setLoading(false);
      }
    };

    loadGitHubData();
  }, []);

  return (
    <section id="projects" className={getThemeClasses(
      'py-24',
      'bg-secondary-dark',
      'bg-secondary-light'
    )}>
      <div className="container mx-auto px-6">
        <h2 className={getThemeClasses(
          'text-3xl md:text-4xl font-display font-semibold mb-8',
          'text-textLight-dark',
          'text-textLight-light'
        )}>
          {t('projects.title')}
        </h2>
        
        {/* GitHub Stats */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={getThemeClasses(
            'p-6 rounded-lg text-center',
            'bg-primary-dark',
            'bg-primary-light'
          )}>
            <div className="text-3xl font-bold text-accent mb-2">{githubData.repos}</div>
            <p className={getThemeClasses(
              '',
              'text-textMuted-dark',
              'text-textMuted-light'
            )}>
              {t('projects.repositories')}
            </p>
          </div>
          <div className={getThemeClasses(
            'p-6 rounded-lg text-center',
            'bg-primary-dark',
            'bg-primary-light'
          )}>
            <div className="text-3xl font-bold text-accent mb-2">{githubData.stars}</div>
            <p className={getThemeClasses(
              '',
              'text-textMuted-dark',
              'text-textMuted-light'
            )}>
              {t('projects.stars')}
            </p>
          </div>
          <div className={getThemeClasses(
            'p-6 rounded-lg text-center',
            'bg-primary-dark',
            'bg-primary-light'
          )}>
            <div className="text-3xl font-bold text-accent mb-2">{githubData.commits}</div>
            <p className={getThemeClasses(
              '',
              'text-textMuted-dark',
              'text-textMuted-light'
            )}>
              {t('projects.commits')}
            </p>
          </div>
        </div>
        
        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <div key={index} className={getThemeClasses(
              'project-card rounded-lg shadow overflow-hidden hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300',
              'bg-primary-dark',
              'bg-primary-light'
            )}>
              <div className="p-6">
                <h3 className={getThemeClasses(
                  'text-2xl font-semibold mb-2',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  {project.title}
                </h3>
                <p className={getThemeClasses(
                  'mb-2',
                  'text-textMuted-dark',
                  'text-textMuted-light'
                )}>
                  {project.brief}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <details className={getThemeClasses(
                  'p-3 rounded',
                  'bg-secondary-dark',
                  'bg-secondary-light'
                )}>
                  <summary className="cursor-pointer text-accent hover:underline">
                    {t('projects.details')}
                  </summary>
                  <p className={getThemeClasses(
                    'mt-2',
                    'text-textMuted-dark',
                    'text-textMuted-light'
                  )}>
                    {project.more}
                  </p>
                </details>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-accent hover:underline"
                >
                  {t('projects.viewOnGitHub')}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dynamic GitHub Projects */}
        {loading ? (
          <div className="text-center py-8">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className={getThemeClasses(
              '',
              'text-textMuted-dark',
              'text-textMuted-light'
            )}>
              {t('projects.loading')}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className={getThemeClasses(
                'project-card rounded-lg shadow overflow-hidden hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300',
                'bg-primary-dark',
                'bg-primary-light'
              )}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={getThemeClasses(
                      'text-xl font-semibold',
                      'text-textLight-dark',
                      'text-textLight-light'
                    )}>
                      {project.name}
                    </h3>
                    <div className={getThemeClasses(
                      'flex items-center space-x-2 text-sm',
                      'text-textMuted-dark',
                      'text-textMuted-light'
                    )}>
                      <span>⭐ {project.stars}</span>
                      <span>🔀 {project.forks}</span>
                    </div>
                  </div>
                  <p className={getThemeClasses(
                    'mb-4',
                    'text-textMuted-dark',
                    'text-textMuted-light'
                  )}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                      {project.language}
                    </span>
                    {project.topics.slice(0, 3).map((topic, topicIndex) => (
                      <span key={topicIndex} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-accent hover:underline"
                  >
                    {t('projects.viewOnGitHub')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 