// Analytics Component - Enhanced tracking for portfolio
const { useEffect } = React;

function PortfolioAnalytics() {
  // Custom tracking for portfolio interactions
  useEffect(() => {
    // Track page views
    const trackPageView = () => {
      if (window.va) {
        window.va.track('page_view', {
          url: window.location.href,
          title: document.title,
          referrer: document.referrer
        });
      }
    };

    // Track component interactions
    const trackComponentInteraction = (component, action) => {
      if (window.va) {
        window.va.track('component_interaction', {
          component,
          action,
          timestamp: new Date().toISOString()
        });
      }
    };

    // Track theme changes
    const trackThemeChange = (theme) => {
      if (window.va) {
        window.va.track('theme_change', {
          theme,
          timestamp: new Date().toISOString()
        });
      }
    };

    // Track language changes
    const trackLanguageChange = (language) => {
      if (window.va) {
        window.va.track('language_change', {
          language,
          timestamp: new Date().toISOString()
        });
      }
    };

    // Track project views
    const trackProjectView = (projectTitle) => {
      if (window.va) {
        window.va.track('project_view', {
          project: projectTitle,
          timestamp: new Date().toISOString()
        });
      }
    };

    // Track blog post reads
    const trackBlogRead = (postTitle, readTime) => {
      if (window.va) {
        window.va.track('blog_read', {
          post: postTitle,
          read_time: readTime,
          timestamp: new Date().toISOString()
        });
      }
    };

    // Track contact form submissions
    const trackContactSubmission = (success) => {
      if (window.va) {
        window.va.track('contact_submission', {
          success,
          timestamp: new Date().toISOString()
        });
      }
    };

    // Track admin panel usage
    const trackAdminAction = (action, details) => {
      if (window.va) {
        window.va.track('admin_action', {
          action,
          details,
          timestamp: new Date().toISOString()
        });
      }
    };

    // Make tracking functions globally available
    window.trackComponentInteraction = trackComponentInteraction;
    window.trackThemeChange = trackThemeChange;
    window.trackLanguageChange = trackLanguageChange;
    window.trackProjectView = trackProjectView;
    window.trackBlogRead = trackBlogRead;
    window.trackContactSubmission = trackContactSubmission;
    window.trackAdminAction = trackAdminAction;

    // Track initial page view
    trackPageView();

    // Track route changes
    const handleRouteChange = () => {
      trackPageView();
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null; // No UI needed for analytics
}

// Make Analytics available globally
window.PortfolioAnalytics = PortfolioAnalytics;
