// Admin Component - Dynamic Portfolio Management
const { useState, useEffect } = React;

function Admin() {
  const { theme } = useAdminContext();
  
  // Simple translation function for admin
  const t = (key) => {
    const translations = {
      'nav.home': 'Inicio',
      'nav.about': 'Sobre mí',
      'nav.skills': 'Habilidades',
      'nav.projects': 'Proyectos',
      'nav.contact': 'Contacto'
    };
    return translations[key] || key;
  };
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    github_url: '',
    live_url: '',
    image_url: '',
    featured: false
  });
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    published: false
  });

  // Missing state variables
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // API base URL - simple configuration
  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : '/api';

  // Helper function for dynamic theme classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };

  // Authentication functions
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        setLoginForm({ username: '', password: '' });
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.error}`);
      }
    } catch (error) {
      alert('Login failed: Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  // API functions with authentication
  const apiCall = async (endpoint, options = {}) => {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No authentication token');

    return fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      }
    });
  };

  // Load data functions
  const loadProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/projects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const loadBlogPosts = async () => {
    try {
      const response = await fetch(`${API_BASE}/blog?published=false`);
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  };

  // Make refresh functions globally available
  useEffect(() => {
    window.refreshProjects = loadProjects;
    window.refreshBlogPosts = loadBlogPosts;
  }, []);

  // Load data on authentication
  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
      loadBlogPosts();
    }
  }, [isAuthenticated]);

  // Project management
  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const projectData = {
        ...newProject,
        technologies: newProject.technologies.split(',').map(t => t.trim()).filter(t => t)
      };
      
      const response = await apiCall('/projects', {
        method: 'POST',
        body: JSON.stringify(projectData)
      });
      
      if (response.ok) {
        const newProjectData = await response.json();
        setProjects([newProjectData, ...projects]);
        setNewProject({
          title: '',
          description: '',
          technologies: '',
          github_url: '',
          live_url: '',
          image_url: '',
          featured: false
        });
      } else {
        const error = await response.json();
        alert(`Error creating project: ${error.error}`);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await apiCall(`/projects/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        const error = await response.json();
        alert(`Error deleting project: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
    }
  };

  // Blog management
  const handleAddBlogPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const postData = {
        ...newBlogPost,
        tags: newBlogPost.tags.split(',').map(t => t.trim()).filter(t => t)
      };
      
      const response = await apiCall('/blog', {
        method: 'POST',
        body: JSON.stringify(postData)
      });
      
      if (response.ok) {
        const newPostData = await response.json();
        setBlogPosts([newPostData, ...blogPosts]);
        setNewBlogPost({
          title: '',
          content: '',
          excerpt: '',
          tags: '',
          published: false
        });
      } else {
        const error = await response.json();
        alert(`Error creating blog post: ${error.error}`);
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Error creating blog post');
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogPost = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const response = await apiCall(`/blog/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setBlogPosts(blogPosts.filter(p => p.id !== id));
      } else {
        const error = await response.json();
        alert(`Error deleting blog post: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Error deleting blog post');
    }
  };

  if (!isAuthenticated) {
    return (
      <section id="admin" className={getThemeClasses('py-24', 'bg-primary-dark', 'bg-primary-light')}>
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <h2 className={getThemeClasses(
              'text-3xl font-display font-semibold mb-8 text-center',
              'text-textLight-dark',
              'text-textLight-light'
            )}>
              Admin Panel
            </h2>
            
            <form onSubmit={handleLogin} className={getThemeClasses(
              'p-6 rounded-xl',
              'bg-secondary-dark border border-secondary-dark/50',
              'bg-secondary-light border border-secondary-light/50'
            )}>
              <div className="mb-4">
                <label className={getThemeClasses(
                  'block text-sm font-medium mb-2',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  Username
                </label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  className={getThemeClasses(
                    'w-full px-4 py-3 rounded-lg border transition-colors',
                    'bg-primary-dark border-secondary-dark text-textLight-dark focus:border-accent',
                    'bg-primary-light border-secondary-light text-textLight-light focus:border-accent'
                  )}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className={getThemeClasses(
                  'block text-sm font-medium mb-2',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className={getThemeClasses(
                    'w-full px-4 py-3 rounded-lg border transition-colors',
                    'bg-primary-dark border-secondary-dark text-textLight-dark focus:border-accent',
                    'bg-primary-light border-secondary-light text-textLight-light focus:border-accent'
                  )}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={getThemeClasses(
                  'w-full py-3 rounded-lg transition-colors',
                  'bg-accent text-white hover:bg-accent/80 disabled:opacity-50',
                  'bg-accent text-white hover:bg-accent/80 disabled:opacity-50'
                )}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className={getThemeClasses('py-24', 'bg-primary-dark', 'bg-primary-light')}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className={getThemeClasses(
              'text-3xl font-display font-semibold',
              'text-textLight-dark',
              'text-textLight-light'
            )}>
              🛠️ Panel de Administración
            </h2>
            
            <div className="flex items-center gap-4">
              <span className={getThemeClasses(
                'text-sm',
                'text-textMuted-dark',
                'text-textMuted-light'
              )}>
                Conectado como: <strong>{user?.username}</strong>
              </span>
              
              <button
                onClick={handleLogout}
                className={getThemeClasses(
                  'px-4 py-2 rounded-lg transition-colors',
                  'bg-red-600 text-white hover:bg-red-700',
                  'bg-red-600 text-white hover:bg-red-700'
                )}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('projects')}
              className={getThemeClasses(
                `px-6 py-3 rounded-t-lg transition-colors ${
                  activeTab === 'projects'
                    ? 'bg-accent text-white'
                    : 'hover:bg-secondary-dark/80'
                }`,
                activeTab === 'projects'
                  ? 'bg-accent text-white'
                  : 'bg-secondary-dark text-textLight-dark',
                activeTab === 'projects'
                  ? 'bg-accent text-white'
                  : 'bg-secondary-light text-textLight-light'
              )}
            >
              📁 Proyectos
            </button>
            
            <button
              onClick={() => setActiveTab('github')}
              className={getThemeClasses(
                `px-6 py-3 rounded-t-lg transition-colors ${
                  activeTab === 'github'
                    ? 'bg-accent text-white'
                    : 'hover:bg-secondary-dark/80'
                }`,
                activeTab === 'github'
                  ? 'bg-accent text-white'
                  : 'bg-secondary-dark text-textLight-dark',
                activeTab === 'github'
                  ? 'bg-accent text-white'
                  : 'bg-secondary-light text-textLight-light'
              )}
            >
              🐙 GitHub Repos
            </button>
            
            <button
              onClick={() => setActiveTab('blog')}
              className={getThemeClasses(
                `px-6 py-3 rounded-t-lg transition-colors ${
                  activeTab === 'blog'
                    ? 'bg-accent text-white'
                    : 'hover:bg-secondary-dark/80'
                }`,
                activeTab === 'blog'
                  ? 'bg-accent text-white'
                  : 'bg-secondary-dark text-textLight-dark',
                activeTab === 'blog'
                  ? 'bg-accent text-white'
                  : 'bg-secondary-light text-textLight-light'
              )}
            >
              ✍️ Blog
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'projects' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Add Project Form */}
              <div className={getThemeClasses(
                'p-6 rounded-xl',
                'bg-secondary-dark border border-secondary-dark/50',
                'bg-secondary-light border border-secondary-light/50'
              )}>
                <h3 className={getThemeClasses(
                  'text-xl font-semibold mb-4',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  Nuevo Proyecto
                </h3>
                
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div>
                    <label className={getThemeClasses(
                      'block text-sm font-medium mb-2',
                      'text-textLight-dark',
                      'text-textLight-light'
                    )}>
                      Título *
                    </label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      className={getThemeClasses(
                        'w-full px-4 py-3 rounded-lg border transition-colors',
                        'bg-primary-dark border-secondary-dark text-textLight-dark focus:border-accent',
                        'bg-primary-light border-secondary-light text-textLight-light focus:border-accent'
                      )}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={getThemeClasses(
                      'block text-sm font-medium mb-2',
                      'text-textLight-dark',
                      'text-textLight-light'
                    )}>
                      Descripción
                    </label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      rows="3"
                      className={getThemeClasses(
                        'w-full px-4 py-3 rounded-lg border transition-colors',
                        'bg-primary-dark border-secondary-dark text-textLight-dark focus:border-accent',
                        'bg-primary-light border-secondary-light text-textLight-light focus:border-accent'
                      )}
                    />
                  </div>
                  
                  <div>
                    <label className={getThemeClasses(
                      'block text-sm font-medium mb-2',
                      'text-textLight-dark',
                      'text-textLight-light'
                    )}>
                      Tecnologías (separadas por comas)
                    </label>
                    <input
                      type="text"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                      className={getThemeClasses(
                        'w-full px-4 py-3 rounded-lg border transition-colors',
                        'bg-primary-dark border-secondary-dark text-textLight-dark focus:border-accent',
                        'bg-primary-light border-secondary-light text-textLight-light focus:border-accent'
                      )}
                      placeholder="React, Node.js, PostgreSQL"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={getThemeClasses(
                        'block text-sm font-medium mb-2',
                        'text-textLight-dark',
                        'text-textLight-light'
                      )}>
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={newProject.github_url}
                        onChange={(e) => setNewProject({...newProject, github_url: e.target.value})}
                        className={getThemeClasses(
                          'w-full px-4 py-3 rounded-lg border transition-colors',
                          'bg-primary-dark border-secondary-dark text-textLight-dark focus:border-accent',
                          'bg-primary-light border-secondary-light text-textLight-light focus:border-accent'
                        )}
                      />
                    </div>
                    
                    <div>
                      <label className={getThemeClasses(
                        'block text-sm font-medium mb-2',
                        'text-textLight-dark',
                        'text-textLight-light'
                      )}>
                        Live URL
                      </label>
                      <input
                        type="url"
                        value={newProject.live_url}
                        onChange={(e) => setNewProject({...newProject, live_url: e.target.value})}
                        className={getThemeClasses(
                          'w-full px-4 py-3 rounded-lg border transition-colors',
                          'bg-primary-dark border-secondary-dark text-textLight-dark focus:border-accent',
                          'bg-primary-light border-secondary-light text-textLight-light focus:border-accent'
                        )}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={getThemeClasses(
                      'block text-sm font-medium mb-2',
                      'text-textLight-dark',
                      'text-textLight-light'
                    )}>
                      Imagen URL
                    </label>
                    <input
                      type="url"
                      value={newProject.image_url}
                      onChange={(e) => setNewProject({...newProject, image_url: e.target.value})}
                      className={getThemeClasses(
                        'w-full px-4 py-3 rounded-lg border transition-colors',
                        'bg-primary-dark border-secondary-dark text-textLight-dark focus:border-accent',
                        'bg-primary-light border-secondary-light text-textLight-light focus:border-accent'
                      )}
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newProject.featured}
                      onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                      className="mr-2"
                    />
                    <label className={getThemeClasses(
                      'text-sm font-medium',
                      'text-textLight-dark',
                      'text-textLight-light'
                    )}>
                      Proyecto Destacado
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={getThemeClasses(
                      'w-full py-3 rounded-lg transition-colors',
                      'bg-accent text-white hover:bg-accent/80 disabled:opacity-50',
                      'bg-accent text-white hover:bg-accent/80 disabled:opacity-50'
                    )}
                  >
                    {loading ? 'Creando...' : 'Crear Proyecto'}
                  </button>
                </form>
              </div>

              {/* Projects List */}
              <div className={getThemeClasses(
                'p-6 rounded-xl',
                'bg-secondary-dark border border-secondary-dark/50',
                'bg-secondary-light border border-secondary-light/50'
              )}>
                <h3 className={getThemeClasses(
                  'text-xl font-semibold mb-4',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  Proyectos Existentes ({projects.length})
                </h3>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {projects.map((project) => (
                    <div key={project.id} className={getThemeClasses(
                      'p-4 rounded-lg border',
                      'border-secondary-dark/50',
                      'border-secondary-light/50'
                    )}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={getThemeClasses(
                            'font-semibold mb-2',
                            'text-textLight-dark',
                            'text-textLight-light'
                          )}>
                            {project.title}
                            {project.featured && (
                              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-accent/20 text-accent">
                                ⭐ Destacado
                              </span>
                            )}
                          </h4>
                          
                          {project.description && (
                            <p className={getThemeClasses(
                              'text-sm mb-2',
                              'text-textMuted-dark',
                              'text-textMuted-light'
                            )}>
                              {project.description}
                            </p>
                          )}
                          
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {project.technologies.map((tech, index) => (
                                <span key={index} className={getThemeClasses(
                                  'px-2 py-1 text-xs rounded-full',
                                  'bg-accent/20 text-accent',
                                  'bg-accent/20 text-accent'
                                )}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex gap-2 text-xs">
                            {project.github_url && (
                              <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={getThemeClasses(
                                  'text-accent hover:underline',
                                  'text-accent hover:underline',
                                  'text-accent hover:underline'
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
                                className={getThemeClasses(
                                  'text-accent hover:underline',
                                  'text-accent hover:underline',
                                  'text-accent hover:underline'
                                )}
                              >
                                🌐 Demo
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => deleteProject(project.id)}
                          className={getThemeClasses(
                            'ml-4 px-3 py-1 text-sm rounded-lg transition-colors',
                            'bg-red-600 text-white hover:bg-red-700',
                            'bg-red-600 text-white hover:bg-red-700'
                          )}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {projects.length === 0 && (
                    <div className={getThemeClasses(
                      'text-center py-8',
                      'text-textMuted-dark',
                      'text-textMuted-light'
                    )}>
                      No hay proyectos aún. ¡Crea tu primer proyecto!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <GitHubRepos />
          )}

          {activeTab === 'blog' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Add Blog Post Form */}
              <div className={getThemeClasses(
                'p-6 rounded-xl',
                'bg-secondary-dark border border-secondary-dark/50',
                'bg-secondary-light border border-secondary-light/50'
              )}>
                <h3 className={getThemeClasses(
                  'text-xl font-semibold mb-4',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  Nuevo Post del Blog
                </h3>
                
                <form onSubmit={handleAddBlogPost} className="space-y-4">
                  <div>
                    <label className={getThemeClasses(
                      'block text-sm font-medium mb-2',
                      'text-textLight-dark',
                      'text-textLight-light'
                    )}>
                      Título *
                    </label>
                    <input
                      type="text"
                      value={newBlogPost.title}
                      onChange={(e) => setNewBlogPost({...newBlogPost, title: e.target.value})}
                      className={getThemeClasses(
                        'w-full px-4 py-3 rounded-lg border transition-colors',
                        'bg-primary-dark border-secondary-dark text-textLight-dark focus:border-accent',
                        'bg-primary-light border-secondary-light text-textLight-light focus:border-accent'
                      )}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={getThemeClasses(
                      'block text-sm font-medium mb-2',
                      'text-textLight-dark',
                      'text-textLight-light'
                    )}>
                      Extracto
                    </label>
                    <textarea
                      value={newBlogPost.excerpt}
                      onChange={(e) => setNewBlogPost({...newBlogPost, excerpt: e.target.value})}
                      rows="3"
                      className={getThemeClasses(
                        'w-full px-4 py-3 rounded-lg border transition-colors',
                        'bg-primary-dark border-secondary-dark text-textLight-dark focus:border-accent',
                        'bg-primary-light border-secondary-light text-textLight-light focus:border-accent'
                      )}
                    />
                  </div>
                  
                  <div>
                    <label className={getThemeClasses(
                      'block text-sm font-medium mb-2',
                      'text-textLight-dark',
                      'text-textLight-light'
                    )}>
                      Contenido *
                    </label>
                    <textarea
                      value={newBlogPost.content}
                      onChange={(e) => setNewBlogPost({...newBlogPost, content: e.target.value})}
                      rows="8"
                      className={getThemeClasses(
                        'w-full px-4 py-3 rounded-lg border transition-colors font-mono text-sm',
                        'bg-primary-dark border-secondary-dark text-textLight-dark focus:border-accent',
                        'bg-primary-light border-secondary-light text-textLight-light focus:border-accent'
                      )}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={getThemeClasses(
                      'block text-sm font-medium mb-2',
                      'text-textLight-dark',
                      'text-textLight-light'
                    )}>
                      Tags (separados por comas)
                    </label>
                    <input
                      type="text"
                      value={newBlogPost.tags}
                      onChange={(e) => setNewBlogPost({...newBlogPost, tags: e.target.value})}
                      className={getThemeClasses(
                        'w-full px-4 py-3 rounded-lg border transition-colors',
                        'bg-primary-dark border-secondary-dark text-textLight-dark focus:border-accent',
                        'bg-primary-light border-secondary-light text-textLight-light focus:border-accent'
                      )}
                      placeholder="tecnología, programación, IA"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newBlogPost.published}
                      onChange={(e) => setNewBlogPost({...newBlogPost, published: e.target.checked})}
                      className="mr-2"
                    />
                    <label className={getThemeClasses(
                      'text-sm font-medium',
                      'text-textLight-dark',
                      'text-textLight-light'
                    )}>
                      Publicar inmediatamente
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={getThemeClasses(
                      'w-full py-3 rounded-lg transition-colors',
                      'bg-accent text-white hover:bg-accent/80 disabled:opacity-50',
                      'bg-accent text-white hover:bg-accent/80 disabled:opacity-50'
                    )}
                  >
                    {loading ? 'Creando...' : 'Crear Post'}
                  </button>
                </form>
              </div>

              {/* Blog Posts List */}
              <div className={getThemeClasses(
                'p-6 rounded-xl',
                'bg-secondary-dark border border-secondary-dark/50',
                'bg-secondary-light border border-secondary-light/50'
              )}>
                <h3 className={getThemeClasses(
                  'text-xl font-semibold mb-4',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  Posts del Blog ({blogPosts.length})
                </h3>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {blogPosts.map((post) => (
                    <div key={post.id} className={getThemeClasses(
                      'p-4 rounded-lg border',
                      'border-secondary-dark/50',
                      'border-secondary-light/50'
                    )}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={getThemeClasses(
                            'font-semibold mb-2',
                            'text-textLight-dark',
                            'text-textLight-light'
                          )}>
                            {post.title}
                            {post.published && (
                              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-600">
                                ✅ Publicado
                              </span>
                            )}
                          </h4>
                          
                          {post.excerpt && (
                            <p className={getThemeClasses(
                              'text-sm mb-2',
                              'text-textMuted-dark',
                              'text-textMuted-light'
                            )}>
                              {post.excerpt}
                            </p>
                          )}
                          
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {post.tags.map((tag, index) => (
                                <span key={index} className={getThemeClasses(
                                  'px-2 py-1 text-xs rounded-full',
                                  'bg-accent/20 text-accent',
                                  'bg-accent/20 text-accent'
                                )}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => deleteBlogPost(post.id)}
                          className={getThemeClasses(
                            'ml-4 px-3 py-1 text-sm rounded-lg transition-colors',
                            'bg-red-600 text-white hover:bg-red-700',
                            'bg-red-600 text-white hover:bg-red-700'
                          )}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {blogPosts.length === 0 && (
                    <div className={getThemeClasses(
                      'text-center py-8',
                      'text-textMuted-dark',
                      'text-textMuted-light'
                    )}>
                      No hay posts del blog aún. ¡Crea tu primer post!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Make Admin available globally
window.Admin = Admin;
