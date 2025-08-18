// Main App Component
const { useState, useEffect, createContext, useContext } = React;

// Context for theme and language
const AppContext = createContext();

// Custom hook for context
const useAppContext = () => useContext(AppContext);

// App Component
function App() {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme and language from localStorage and system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('lang');
    
    // Detect system theme preference if no saved theme
    if (!savedTheme) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    } else {
      setTheme(savedTheme);
    }
    
    // Detect browser language if no saved language
    if (!savedLanguage) {
      const browserLang = navigator.language || navigator.userLanguage;
      const detectedLang = browserLang.startsWith('es') ? 'es' : 'en';
      setLanguage(detectedLang);
      // Use the global setLanguage function
      if (window.setLanguage) {
        window.setLanguage(detectedLang);
      }
    } else {
      setLanguage(savedLanguage);
      // Use the global setLanguage function
      if (window.setLanguage) {
        window.setLanguage(savedLanguage);
      }
    }
  }, []);

  // Apply theme to html element (for Tailwind dark mode)
  useEffect(() => {
    const html = document.documentElement;
    
    // Remove existing theme classes
    html.classList.remove('dark', 'light');
    
    // Add current theme class
    html.classList.add(theme);
    
    // Update localStorage
    localStorage.setItem('theme', theme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0d0d0d' : '#ffffff');
    }
  }, [theme]);

  // Apply language - use global setLanguage function
  useEffect(() => {
    if (window.setLanguage) {
      window.setLanguage(language);
    }
  }, [language]);

  const contextValue = {
    theme,
    setTheme,
    language,
    setLanguage,
    mobileMenuOpen,
    setMobileMenuOpen
  };

  return (
    <AppContext.Provider value={contextValue}>
      {/* SEO Component for main page */}
      <SEO 
        title="David Fernández-Cuenca - Desarrollador de Software & IA"
        description="Portfolio profesional de David Fernández-Cuenca, desarrollador especializado en software crítico, inteligencia artificial y sistemas distribuidos. Experiencia en React, Node.js, Python y tecnologías emergentes."
        keywords="desarrollador software, inteligencia artificial, React, Node.js, Python, sistemas críticos, portfolio, Dusseldorf, Alemania"
        image="/assets/og-image.jpg"
        url={window.location.href}
        type="website"
      />
      
      {/* Google Analytics Component */}
      <GoogleAnalytics />
      
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-primary-dark text-textLight-dark' 
          : 'bg-primary-light text-textLight-light'
      }`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

// Make everything available globally
window.AppContext = AppContext;
window.useAppContext = useAppContext;
window.App = App;

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); 