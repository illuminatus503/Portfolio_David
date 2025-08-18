// Blog Component - Read Only (Creation/Editing only in Admin Panel)
function Blog() {
  const { theme } = useAppContext();
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // API base URL - simple configuration
  const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : '/api';
  
  // Posts per page - default value
  const POSTS_PER_PAGE = 10;

  // Helper function for dynamic theme classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };

  // Load blog posts from API or mock data
  const loadPosts = async (page = 1, published = true) => {
    try {
      setLoading(true);
      
      // Try API first, fallback to mock data
      try {
        const response = await fetch(`${API_BASE}/blog?page=${page}&limit=${POSTS_PER_PAGE}&published=${published}`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          setTotalPosts(data.length);
          return;
        }
      } catch (apiError) {
        console.log('Blog API not available, using mock data');
      }
      
      // Use mock data if API fails
      if (window.mockData?.blogPosts) {
        const mockPosts = window.mockData.blogPosts.filter(post => post.published === published);
        setPosts(mockPosts);
        setTotalPosts(mockPosts.length);
      } else {
        setPosts([]);
        setTotalPosts(0);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load posts on component mount
  useEffect(() => {
    loadPosts(currentPage, true);
  }, [currentPage]);

  // Handle post selection
  const handlePostSelect = (post) => {
    setSelectedPost(post);
  };

  // Handle post close
  const handlePostClose = () => {
    setSelectedPost(null);
  };

  // Calculate reading time
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className={getThemeClasses(
      'py-24',
      'bg-primary-dark',
      'bg-primary-light'
    )}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={getThemeClasses(
            'text-3xl md:text-4xl font-display font-semibold mb-4',
            'text-textLight-dark',
            'text-textLight-light'
          )}>
            Blog
          </h2>
          <p className={getThemeClasses(
            'text-lg max-w-2xl mx-auto',
            'text-textMuted-dark',
            'text-textMuted-light'
          )}>
            Artículos sobre desarrollo de software, inteligencia artificial y sistemas críticos
          </p>
          
          {/* Admin Notice */}
          <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-sm text-accent">
              💡 <strong>Nota:</strong> La creación y edición de posts solo está disponible en el{' '}
              <a href="/admin" className="underline hover:text-accent/80">Panel de Administración</a>
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            <p className="mt-2 text-textMuted">Cargando posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className={getThemeClasses(
              'text-lg',
              'text-textMuted-dark',
              'text-textMuted-light'
            )}>
              No hay posts publicados aún.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className={getThemeClasses(
                  'group cursor-pointer transition-all duration-300 hover:scale-105',
                  'bg-secondary-dark border border-secondary-dark/50 hover:border-accent/50',
                  'bg-secondary-light border border-secondary-light/50 hover:border-accent/50'
                )}
                onClick={() => handlePostSelect(post)}
              >
                {/* Post Image */}
                {post.image_url && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Post Content */}
                <div className="p-6">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className={getThemeClasses(
                    'text-xl font-semibold mb-3 line-clamp-2 group-hover:text-accent transition-colors',
                    'text-textLight-dark',
                    'text-textLight-light'
                  )}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className={getThemeClasses(
                      'text-sm mb-4 line-clamp-3',
                      'text-textMuted-dark',
                      'text-textMuted-light'
                    )}>
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm">
                    <span className={getThemeClasses(
                      '',
                      'text-textMuted-dark',
                      'text-textMuted-light'
                    )}>
                      {formatDate(post.created_at)}
                    </span>
                    <span className={getThemeClasses(
                      '',
                      'text-textMuted-dark',
                      'text-textMuted-light'
                    )}>
                      {calculateReadTime(post.content)} min lectura
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPosts > POSTS_PER_PAGE && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={getThemeClasses(
                  'px-4 py-2 rounded-lg transition-colors disabled:opacity-50',
                  'bg-secondary-dark text-textLight-dark hover:bg-accent/20',
                  'bg-secondary-light text-textLight-light hover:bg-accent/20'
                )}
              >
                Anterior
              </button>
              <span className={getThemeClasses(
                'px-4 py-2',
                'text-textMuted-dark',
                'text-textMuted-light'
              )}>
                Página {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage * POSTS_PER_PAGE >= totalPosts}
                className={getThemeClasses(
                  'px-4 py-2 rounded-lg transition-colors disabled:opacity-50',
                  'bg-secondary-dark text-textLight-dark hover:bg-accent/20',
                  'bg-secondary-light text-textLight-light hover:bg-accent/20'
                )}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <>
          {/* SEO for individual blog post */}
          <SEO 
            title={`${selectedPost.title} - David Fernández-Cuenca Blog`}
            description={selectedPost.excerpt || selectedPost.content.substring(0, 160)}
            keywords={selectedPost.tags ? selectedPost.tags.join(', ') : 'blog, desarrollo, software'}
            image={selectedPost.image_url || '/assets/og-image.jpg'}
            url={`${window.location.origin}/blog/${selectedPost.id}`}
            type="article"
            author="David Fernández-Cuenca Marcos"
            publishedTime={selectedPost.created_at}
            modifiedTime={selectedPost.updated_at}
            section="Blog"
            tags={selectedPost.tags || []}
          />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className={getThemeClasses(
            'max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl',
            'bg-secondary-dark border border-secondary-dark/50',
            'bg-secondary-light border border-secondary-light/50'
          )}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-accent/20">
              <h2 className={getThemeClasses(
                'text-2xl font-semibold',
                'text-textLight-dark',
                'text-textLight-light'
              )}>
                {selectedPost.title}
              </h2>
              <button
                onClick={handlePostClose}
                className={getThemeClasses(
                  'p-2 rounded-lg transition-colors hover:bg-accent/20',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Post Meta */}
              <div className="flex items-center space-x-4 mb-6 text-sm">
                <span className={getThemeClasses(
                  '',
                  'text-textMuted-dark',
                  'text-textMuted-light'
                )}>
                  {formatDate(selectedPost.created_at)}
                </span>
                <span className={getThemeClasses(
                  '',
                  'text-textMuted-dark',
                  'text-textMuted-light'
                )}>
                  {calculateReadTime(selectedPost.content)} min lectura
                </span>
                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div className="flex space-x-2">
                    {selectedPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div className={getThemeClasses(
                'prose prose-lg max-w-none',
                'prose-invert',
                'prose-gray'
              )}>
                {selectedPost.content}
              </div>
            </div>
                      </div>
          </div>
        </>
        )}
      </section>
    );
  }

// Make Blog available globally
window.Blog = Blog;
