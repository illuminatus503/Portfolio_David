// Google Analytics Component - Advanced tracking with Vercel Analytics
function GoogleAnalytics() {
  // Try to use admin context first, fallback to app context
  const adminContext = window.useAdminContext ? window.useAdminContext() : null;
  const appContext = window.useAppContext ? window.useAppContext() : null;
  
  const { theme, language } = adminContext || appContext || { theme: 'dark', language: 'es' };
  
  // Initialize Google Analytics and Vercel Analytics
  React.useEffect(() => {
    // Vercel Analytics (if available)
    if (window.va) {
      console.log('Vercel Analytics initialized');
    }
    
    // Google Analytics 4 (if analytics ID is set)
    const analyticsId = window.environment?.getAnalyticsId() || '';
    
    if (analyticsId && analyticsId.trim() !== '') {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
      document.head.appendChild(script);
      
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', analyticsId, {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_1': 'theme',
          'custom_parameter_2': 'language',
          'custom_parameter_3': 'user_type'
        }
      });
      
      // Set custom parameters
      gtag('config', analyticsId, {
        'custom_parameter_1': theme,
        'custom_parameter_2': language,
        'custom_parameter_3': 'visitor'
      });
      
      // Make gtag globally available
      window.gtag = gtag;
      
      console.log('Google Analytics initialized with ID:', analyticsId);
    } else {
      console.log('No Google Analytics ID configured');
    }
    
    // Track page views
    const trackPageView = () => {
      const currentPath = window.location.pathname;
      const currentTitle = document.title;
      
      // Vercel Analytics
      if (window.va) {
        window.va.track('page_view', {
          path: currentPath,
          title: currentTitle,
          theme: theme,
          language: language
        });
      }
      
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: currentTitle,
          page_location: window.location.href,
          page_path: currentPath,
          custom_parameter_1: theme,
          custom_parameter_2: language
        });
      }
    };
    
    // Track initial page view
    trackPageView();
    
    // Track navigation changes
    const handleRouteChange = () => {
      setTimeout(trackPageView, 100); // Small delay to ensure DOM is updated
    };
    
    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleRouteChange);
    
    // Track theme changes
    const trackThemeChange = (newTheme) => {
      if (window.gtag) {
        window.gtag('event', 'theme_change', {
          event_category: 'user_preference',
          event_label: newTheme,
          value: newTheme === 'dark' ? 1 : 0
        });
      }
      
      if (window.va) {
        window.va.track('theme_change', {
          theme: newTheme,
          previous_theme: theme
        });
      }
    };
    
    // Track language changes
    const trackLanguageChange = (newLanguage) => {
      if (window.gtag) {
        window.gtag('event', 'language_change', {
          event_category: 'user_preference',
          event_label: newLanguage,
          value: newLanguage === 'es' ? 1 : 0
        });
      }
      
      if (window.va) {
        window.va.track('language_change', {
          language: newLanguage,
          previous_language: language
        });
      }
    };
    
    // Track custom events
    const trackCustomEvent = (eventName, parameters = {}) => {
      if (window.gtag) {
        window.gtag('event', eventName, {
          ...parameters,
          custom_parameter_1: theme,
          custom_parameter_2: language
        });
      }
      
      if (window.va) {
        window.va.track(eventName, {
          ...parameters,
          theme: theme,
          language: language
        });
      }
    };
    
    // Make tracking functions globally available
    window.trackThemeChange = trackThemeChange;
    window.trackLanguageChange = trackLanguageChange;
    window.trackCustomEvent = trackCustomEvent;
    
    // Track component interactions
    const trackComponentInteraction = (componentName, action, details = {}) => {
      trackCustomEvent('component_interaction', {
        event_category: 'ui_interaction',
        event_label: `${componentName}_${action}`,
        component_name: componentName,
        action: action,
        ...details
      });
    };
    
    // Track form submissions
    const trackFormSubmission = (formName, success = true, details = {}) => {
      trackCustomEvent('form_submission', {
        event_category: 'form_interaction',
        event_label: formName,
        form_name: formName,
        success: success,
        ...details
      });
    };
    
    // Track external links
    const trackExternalLink = (url, linkText, context = '') => {
      trackCustomEvent('external_link_click', {
        event_category: 'outbound_link',
        event_label: url,
        link_url: url,
        link_text: linkText,
        context: context
      });
    };
    
    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track at 25%, 50%, 75%, 100%
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          trackCustomEvent('scroll_depth', {
            event_category: 'engagement',
            event_label: `${scrollPercent}%`,
            scroll_percentage: scrollPercent
          });
        }
      }
    };
    
    // Track time on page
    let startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      // Track every 30 seconds
      if (timeSpent % 30 === 0 && timeSpent > 0) {
        trackCustomEvent('time_on_page', {
          event_category: 'engagement',
          event_label: `${Math.floor(timeSpent / 30) * 30}s`,
          time_spent_seconds: timeSpent
        });
      }
    };
    
    // Set up scroll and time tracking
    let scrollTimer;
    let timeTimer;
    
    const setupTracking = () => {
      // Scroll depth tracking
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(trackScrollDepth, 100);
      });
      
      // Time on page tracking
      timeTimer = setInterval(trackTimeOnPage, 1000);
    };
    
    setupTracking();
    
    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      clearInterval(timeTimer);
      clearTimeout(scrollTimer);
    };
  }, [theme, language]);
  
  // Component doesn't render anything visible
  return null;
}

// Make GoogleAnalytics available globally
window.GoogleAnalytics = GoogleAnalytics;
