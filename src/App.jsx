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
    
    if (savedLanguage) setLanguage(savedLanguage);
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

  // Apply language
  useEffect(() => {
    localStorage.setItem('lang', language);
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
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-primary-dark text-textLight-dark' 
          : 'bg-primary-light text-textLight-light'
      }`}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root')); 