// Projects Component
function Projects() {
  const { language } = useAppContext();
  const [githubData, setGithubData] = useState({
    repos: 0,
    stars: 0,
    commits: 0
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const translations = {
    es: {
      title: 'Proyectos Destacados',
      repositories: 'Repositorios',
      stars: 'Estrellas',
      commits: 'Commits (30 días)',
      viewOnGitHub: 'Ver en GitHub →',
      loading: 'Cargando proyectos...'
    },
    en: {
      title: 'Featured Projects',
      repositories: 'Repositories',
      stars: 'Stars',
      commits: 'Commits (30 days)',
      viewOnGitHub: 'View on GitHub →',
      loading: 'Loading projects...'
    }
  };

  const t = translations[language];

  const featuredProjects = [
    {
      title: 'LeetCode‑Exercises',
      brief: language === 'es' ? 'Colección de soluciones a problemas de algoritmos y estructuras de datos.' : 'Algorithm and data structure problem solutions in Python.',
      more: language === 'es' ? 'Más de 200 ejercicios resueltos con análisis de complejidad temporal y espacial, optimizaciones y explicaciones detalladas de las estrategias utilizadas.' : 'Includes 200+ solved exercises with complexity analysis and optimizations.',
      tags: ['Python', 'Algorithms', 'Data Structures'],
      url: 'https://github.com/illuminatus503/LeetCode-Exercises'
    },
    {
      title: 'Basic‑Data‑Structures',
      brief: language === 'es' ? 'Implementaciones educativas de estructuras de datos fundamentales.' : 'Data structure implementations in Python, C++, and Ada.',
      more: language === 'es' ? 'Implementaciones completas en Python, C++ y Ada de listas, pilas, colas, árboles y grafos, con ejemplos prácticos y documentación detallada.' : 'Covering lists, stacks, queues, trees, and graphs with usage examples.',
      tags: ['Python', 'C++', 'Ada'],
      url: 'https://github.com/illuminatus503/Basic-Data-Structures'
    },
    {
      title: 'valet',
      brief: language === 'es' ? 'Suite de utilidades y herramientas de automatización para desarrollo.' : '"Valet, your truthful servant"—main utilities repo.',
      more: language === 'es' ? 'Herramientas CLI, scripts de automatización y librerías internas utilizadas en proyectos empresariales para optimizar flujos de trabajo de desarrollo.' : 'Contains automation scripts, CLI tools, and internal libraries for enterprise projects.',
      tags: ['CLI', 'Automation', 'Utilities'],
      url: 'https://github.com/illuminatus503/valet'
    },
    {
      title: 'AARN23.BachChorales',
      brief: language === 'es' ? 'Proyecto de machine learning para análisis musical.' : 'ML/NN course project on Bach chorales.',
      more: language === 'es' ? 'Sistema de clasificación de corales de Bach utilizando redes neuronales profundas y análisis avanzado de características musicales.' : 'Classifies Bach chorales using deep neural networks and musical feature analysis.',
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
    <section id="projects" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">
          {t.title}
        </h2>
        
        {/* GitHub Stats */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-accent mb-2">{githubData.repos}</div>
            <p className="text-textMuted">{t.repositories}</p>
          </div>
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-accent mb-2">{githubData.stars}</div>
            <p className="text-textMuted">{t.stars}</p>
          </div>
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-accent mb-2">{githubData.commits}</div>
            <p className="text-textMuted">{t.commits}</p>
          </div>
        </div>
        
        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <div key={index} className="project-card bg-primary rounded-lg shadow overflow-hidden hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-textMuted mb-2">{project.brief}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <details className="bg-secondary p-3 rounded">
                  <summary className="cursor-pointer text-accent hover:underline">
                    {language === 'es' ? 'Detalles' : 'Details'}
                  </summary>
                  <p className="mt-2 text-textMuted">{project.more}</p>
                </details>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-accent hover:underline"
                >
                  {t.viewOnGitHub}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dynamic GitHub Projects */}
        {loading ? (
          <div className="text-center py-8">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-textMuted">{t.loading}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="project-card bg-primary rounded-lg shadow overflow-hidden hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-textMuted">
                      <span>⭐ {project.stars}</span>
                      <span>🔀 {project.forks}</span>
                    </div>
                  </div>
                  <p className="text-textMuted mb-4">{project.description}</p>
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
                    {t.viewOnGitHub}
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