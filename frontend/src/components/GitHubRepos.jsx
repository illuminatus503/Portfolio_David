// GitHub Repos Component - For Admin Panel
const { useState, useEffect } = React;

function GitHubRepos() {
  // Try to use admin context first, fallback to app context
const adminContext = window.useAdminContext ? window.useAdminContext() : null;
const appContext = window.useAppContext ? window.useAppContext() : null;

const { theme } = adminContext || appContext || { theme: 'dark' };
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [migrating, setMigrating] = useState(false);

  // Helper function for dynamic theme classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };

  // Fetch GitHub repositories
  const fetchGitHubRepos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const username = 'illuminatus503';
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const reposData = await response.json();
      
      // Filter out forks and add additional metadata
      const filteredRepos = reposData
        .filter(repo => !repo.fork && repo.description)
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          language: repo.language,
          topics: repo.topics || [],
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          size: repo.size,
          archived: repo.archived,
          disabled: repo.disabled,
          has_wiki: repo.has_wiki,
          has_pages: repo.has_pages,
          default_branch: repo.default_branch
        }));
      
      setRepos(filteredRepos);
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle repo selection
  const toggleRepoSelection = (repoId) => {
    setSelectedRepos(prev => 
      prev.includes(repoId) 
        ? prev.filter(id => id !== repoId)
        : [...prev, repoId]
    );
  };

  // Select all repos
  const selectAllRepos = () => {
    setSelectedRepos(repos.map(repo => repo.id));
  };

  // Deselect all repos
  const deselectAllRepos = () => {
    setSelectedRepos([]);
  };

  // Migrate selected repos to database
  const migrateSelectedRepos = async () => {
    if (selectedRepos.length === 0) {
      alert('Por favor selecciona al menos un repositorio para migrar.');
      return;
    }

    setMigrating(true);
    
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        throw new Error('No authentication token found');
      }

      const reposToMigrate = repos.filter(repo => selectedRepos.includes(repo.id));
      
      // Migrate each repo
      for (const repo of reposToMigrate) {
        const projectData = {
          title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: repo.description || 'Sin descripción disponible',
          technologies: [repo.language, ...repo.topics].filter(Boolean),
          github_url: repo.html_url,
          live_url: repo.homepage || null,
          image_url: null,
          featured: repo.stargazers_count > 5, // Auto-feature popular repos
          github_id: repo.id,
          github_metadata: {
            full_name: repo.full_name,
            language: repo.language,
            topics: repo.topics,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            size: repo.size,
            archived: repo.archived,
            has_wiki: repo.has_wiki,
            has_pages: repo.has_pages,
            default_branch: repo.default_branch
          }
        };

        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
          },
          body: JSON.stringify(projectData)
        });

        if (!response.ok) {
          console.error(`Error migrating repo ${repo.name}:`, await response.text());
        }
      }

      // Clear selection and refresh
      setSelectedRepos([]);
      alert(`✅ ${reposToMigrate.length} repositorios migrados exitosamente a la base de datos.`);
      
      // Trigger refresh of projects list in parent component
      if (window.refreshProjects) {
        window.refreshProjects();
      }
      
    } catch (error) {
      console.error('Error migrating repos:', error);
      alert(`❌ Error al migrar repositorios: ${error.message}`);
    } finally {
      setMigrating(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format size
  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className={getThemeClasses(
      'p-6 rounded-xl',
      'bg-secondary-dark border border-secondary-dark/50',
      'bg-secondary-light border border-secondary-light/50'
    )}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={getThemeClasses(
          'text-xl font-semibold',
          'text-textLight-dark',
          'text-textLight-light'
        )}>
          📁 Repositorios de GitHub
        </h3>
        
        <div className="flex gap-2">
          <button
            onClick={fetchGitHubRepos}
            disabled={loading}
            className={getThemeClasses(
              'px-4 py-2 rounded-lg transition-colors',
              'bg-accent text-white hover:bg-accent/80 disabled:opacity-50',
              'bg-accent text-white hover:bg-accent/80 disabled:opacity-50'
            )}
          >
            {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
          </button>
          
          {repos.length > 0 && (
            <>
              <button
                onClick={selectAllRepos}
                className={getThemeClasses(
                  'px-3 py-2 text-sm rounded-lg transition-colors',
                  'bg-secondary-dark text-textLight-dark hover:bg-secondary-dark/80',
                  'bg-secondary-light text-textLight-light hover:bg-secondary-light/80'
                )}
              >
                ✅ Seleccionar Todos
              </button>
              <button
                onClick={deselectAllRepos}
                className={getThemeClasses(
                  'px-3 py-2 text-sm rounded-lg transition-colors',
                  'bg-secondary-dark text-textLight-dark hover:bg-secondary-dark/80',
                  'bg-secondary-light text-textLight-light hover:bg-secondary-light/80'
                )}
              >
                ❌ Deseleccionar Todos
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-500/20 text-red-600 border border-red-500/30">
          ❌ Error: {error}
        </div>
      )}

      {repos.length === 0 && !loading && (
        <div className="text-center py-8">
          <div className={getThemeClasses(
            'text-lg',
            'text-textMuted-dark',
            'text-textMuted-light'
          )}>
            No hay repositorios cargados. Haz clic en "Actualizar" para cargar desde GitHub.
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className={getThemeClasses(
            'text-lg',
            'text-textMuted-dark',
            'text-textMuted-light'
          )}>
            🔄 Cargando repositorios desde GitHub...
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className={getThemeClasses(
              'text-sm',
              'text-textMuted-dark',
              'text-textMuted-light'
            )}>
              {selectedRepos.length} de {repos.length} repositorios seleccionados
            </div>
            
            {selectedRepos.length > 0 && (
              <button
                onClick={migrateSelectedRepos}
                disabled={migrating}
                className={getThemeClasses(
                  'px-6 py-2 rounded-lg transition-colors',
                  'bg-green-600 text-white hover:bg-green-700 disabled:opacity-50',
                  'bg-green-600 text-white hover:bg-green-700 disabled:opacity-50'
                )}
              >
                {migrating ? '🔄 Migrando...' : '🚀 Migrar a Base de Datos'}
              </button>
            )}
          </div>

          <div className="grid gap-4 max-h-96 overflow-y-auto">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className={getThemeClasses(
                  'p-4 rounded-lg border transition-all cursor-pointer',
                  selectedRepos.includes(repo.id)
                    ? 'border-accent bg-accent/10'
                    : 'border-secondary-dark/50 hover:border-accent/50',
                  selectedRepos.includes(repo.id)
                    ? 'border-accent bg-accent/10'
                    : 'border-secondary-light/50 hover:border-accent/50'
                )}
                onClick={() => toggleRepoSelection(repo.id)}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedRepos.includes(repo.id)}
                    onChange={() => toggleRepoSelection(repo.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className={getThemeClasses(
                        'font-semibold truncate',
                        'text-textLight-dark',
                        'text-textLight-light'
                      )}>
                        {repo.name}
                      </h4>
                      
                      {repo.archived && (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-600">
                          📦 Archivado
                        </span>
                      )}
                      
                      {repo.has_pages && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-600">
                          🌐 GitHub Pages
                        </span>
                      )}
                    </div>
                    
                    {repo.description && (
                      <p className={getThemeClasses(
                        'text-sm mb-3 line-clamp-2',
                        'text-textMuted-dark',
                        'text-textMuted-light'
                      )}>
                        {repo.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      {repo.language && (
                        <span className={getThemeClasses(
                          'px-2 py-1 rounded-full',
                          'bg-accent/20 text-accent',
                          'bg-accent/20 text-accent'
                        )}>
                          💻 {repo.language}
                        </span>
                      )}
                      
                      <span className={getThemeClasses(
                        'text-textMuted-dark',
                        'text-textMuted-light'
                      )}>
                        ⭐ {repo.stargazers_count}
                      </span>
                      
                      <span className={getThemeClasses(
                        'text-textMuted-dark',
                        'text-textMuted-light'
                      )}>
                        🔀 {repo.forks_count}
                      </span>
                      
                      <span className={getThemeClasses(
                        'text-textMuted-dark',
                        'text-textMuted-light'
                      )}>
                        📁 {formatSize(repo.size * 1024)}
                      </span>
                      
                      <span className={getThemeClasses(
                        'text-textMuted-dark',
                        'text-textMuted-light'
                      )}>
                        📅 {formatDate(repo.updated_at)}
                      </span>
                    </div>
                    
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {repo.topics.slice(0, 5).map((topic, index) => (
                          <span key={index} className={getThemeClasses(
                            'px-2 py-1 text-xs rounded-full',
                            'bg-secondary-dark text-textMuted-dark',
                            'bg-secondary-light text-textMuted-light'
                          )}>
                            #{topic}
                          </span>
                        ))}
                        {repo.topics.length > 5 && (
                          <span className={getThemeClasses(
                            'px-2 py-1 text-xs rounded-full',
                            'bg-secondary-dark text-textMuted-dark',
                            'bg-secondary-light text-textMuted-light'
                          )}>
                            +{repo.topics.length - 5}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={getThemeClasses(
                        'px-3 py-1 text-xs rounded-lg transition-colors',
                        'bg-secondary-dark text-textLight-dark hover:bg-secondary-dark/80',
                        'bg-secondary-light text-textLight-light hover:bg-secondary-light/80'
                      )}
                    >
                      📁 Ver en GitHub
                    </a>
                    
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1 text-xs rounded-lg bg-accent text-white hover:bg-accent/80 transition-colors"
                      >
                        🌐 Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Make GitHubRepos available globally
window.GitHubRepos = GitHubRepos;
