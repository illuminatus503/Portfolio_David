// Admin App Component - Main entry point for admin panel
const { useState, useEffect, createContext, useContext } = React;

// Admin Context for theme and language
const AdminContext = createContext();

// Custom hook for admin context
const useAdminContext = () => useContext(AdminContext);

function AdminApp() {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [theme, setTheme] = useState('dark');

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setCurrentLanguage(savedLanguage);
    setTheme(savedTheme);
    window.currentLanguage = savedLanguage;
  }, []);

  // Update document language and theme
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.className = theme;
    localStorage.setItem('language', currentLanguage);
    localStorage.setItem('theme', theme);
    window.currentLanguage = currentLanguage;
  }, [currentLanguage, theme]);

  // Language switcher
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    setCurrentLanguage(newLanguage);
  };

  // Theme switcher
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const contextValue = {
    theme,
    setTheme,
    language: currentLanguage,
    setLanguage: setCurrentLanguage
  };

  return (
    <AdminContext.Provider value={contextValue}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-primary-dark text-textLight-dark' : 'bg-primary-light text-textLight-light'}`}>
        {/* SEO Component for admin panel */}
        <SEO 
          title="Admin Panel - David Fernández-Cuenca Portfolio"
          description="Panel de administración para gestionar el portfolio de David Fernández-Cuenca. Gestión de proyectos, blog posts y configuración del sitio."
          keywords="admin panel, portfolio, gestión, proyectos, blog, David Fernández-Cuenca"
          type="website"
          robots="noindex, nofollow"
        />
        
        {/* Google Analytics Component */}
        <GoogleAnalytics />
        
        {/* Admin Header */}
        <header className={`sticky top-0 z-50 border-b ${theme === 'dark' ? 'bg-secondary-dark border-secondary-dark/50' : 'bg-secondary-light border-secondary-light/50'}`}>
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-accent">🔐 Admin Panel</h1>
                <span className="text-sm text-textMuted">Portfolio de David</span>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Language Switcher */}
                <button
                  onClick={toggleLanguage}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    theme === 'dark' 
                      ? 'bg-secondary-dark hover:bg-accent/20 text-textLight-dark' 
                      : 'bg-secondary-light hover:bg-accent/20 text-textLight-light'
                  }`}
                >
                  {currentLanguage === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}
                </button>
                
                {/* Theme Switcher */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg transition ${
                    theme === 'dark' 
                      ? 'bg-secondary-dark hover:bg-accent/20 text-textLight-dark' 
                      : 'bg-secondary-light hover:bg-accent/20 text-textLight-light'
                  }`}
                >
                  {theme === 'dark' ? '🌞' : '🌙'}
                </button>
                
                {/* Back to Portfolio */}
                <a
                  href="/"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    theme === 'dark' 
                      ? 'bg-accent hover:bg-accent/90 text-white' 
                      : 'bg-accent hover:bg-accent/90 text-white'
                  }`}
                >
                  ← Volver al Portfolio
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Admin Content */}
        <main className="container mx-auto px-6 py-8">
          <Admin />
        </main>

        {/* Footer */}
        <footer className={`mt-auto py-6 border-t ${theme === 'dark' ? 'bg-secondary-dark border-secondary-dark/50' : 'bg-secondary-light border-secondary-light/50'}`}>
          <div className="container mx-auto px-6 text-center">
            <p className={`text-sm ${theme === 'dark' ? 'text-textMuted-dark' : 'text-textMuted-light'}`}>
              © 2025 David Fernández-Cuenca - Admin Panel
            </p>
          </div>
        </footer>
      </div>
    </AdminContext.Provider>
  );
}

// Make AdminApp available globally
window.AdminApp = AdminApp;
window.AdminContext = AdminContext;
window.useAdminContext = useAdminContext;
