// SEO Component - Advanced SEO with dynamic metadata and Google Analytics
function SEO({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  author = 'David Fernández-Cuenca Marcos',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) {
  // Try to use admin context first, fallback to app context
  const adminContext = window.useAdminContext ? window.useAdminContext() : null;
  const appContext = window.useAppContext ? window.useAppContext() : null;
  
  const { theme } = adminContext || appContext || { theme: 'dark' };
  
  // Get configuration from shared config
  const config = window.sharedConfigs?.config || window.sharedConfig || {};
  const personal = config.personal || {};
  const site = config.site || {};
  const social = config.social || {};
  
  // Default values from shared config
  const defaultTitle = site.name || 'David Fernández-Cuenca - Desarrollador de Software & IA';
  const defaultDescription = site.description || 'Portfolio profesional de David Fernández-Cuenca, desarrollador especializado en software crítico, inteligencia artificial y sistemas distribuidos. Experiencia en React, Node.js, Python y tecnologías emergentes.';
  const defaultKeywords = site.keywords || 'desarrollador software, inteligencia artificial, React, Node.js, Python, sistemas críticos, portfolio, Dusseldorf, Alemania';
  const defaultImage = '/assets/og-image.jpg';
  const baseUrl = window.location.origin;
  
  // Use provided values or defaults
  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}${defaultImage}`;
  const seoUrl = url ? (url.startsWith('http') ? url : `${baseUrl}${url}`) : baseUrl;
  
  // Canonical URL
  const canonicalUrl = seoUrl;
  
  // Open Graph data
  const ogData = {
    'og:title': seoTitle,
    'og:description': seoDescription,
    'og:image': seoImage,
    'og:url': seoUrl,
    'og:type': type,
    'og:site_name': site.name || 'David Fernández-Cuenca Portfolio',
    'og:locale': 'es_ES',
    'og:locale:alternate': 'en_US'
  };
  
  // Twitter Card data
  const twitterData = {
    'twitter:card': 'summary_large_image',
    'twitter:site': '@davidfdezcuenca',
    'twitter:creator': '@davidfdezcuenca',
    'twitter:title': seoTitle,
    'twitter:description': seoDescription,
    'twitter:image': seoImage
  };
  
  // Article specific metadata
  if (type === 'article') {
    ogData['article:author'] = author;
    ogData['article:published_time'] = publishedTime;
    ogData['article:modified_time'] = modifiedTime;
    ogData['article:section'] = section;
    ogData['article:tag'] = tags;
  }
  
  // Update document head with SEO metadata
  React.useEffect(() => {
    // Update title
    document.title = seoTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = seoDescription;
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = seoKeywords;
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;
    
    // Update Open Graph tags
    Object.entries(ogData).forEach(([property, content]) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.content = content;
    });
    
    // Update Twitter Card tags
    Object.entries(twitterData).forEach(([name, content]) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.name = name;
        document.head.appendChild(twitterTag);
      }
      twitterTag.content = content;
    });
    
    // Update theme color
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.name = 'theme-color';
      document.head.appendChild(themeColor);
    }
    themeColor.content = theme === 'dark' ? '#0d0d0d' : '#ffffff';
    
    // Update color scheme
    let colorScheme = document.querySelector('meta[name="color-scheme"]');
    if (!colorScheme) {
      colorScheme = document.createElement('meta');
      colorScheme.name = 'color-scheme';
      document.head.appendChild(colorScheme);
    }
    colorScheme.content = theme === 'dark' ? 'dark' : 'light';
    
    // Cleanup function
    return () => {
      // Remove dynamically added meta tags on unmount
      const dynamicTags = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]');
      dynamicTags.forEach(tag => {
        if (tag.dataset.dynamic) {
          tag.remove();
        }
      });
    };
  }, [seoTitle, seoDescription, seoKeywords, seoImage, seoUrl, type, theme]);
  
  // Add structured data (JSON-LD)
  React.useEffect(() => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Create structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'Person',
      'name': seoTitle,
      'description': seoDescription,
      'url': seoUrl,
      'image': seoImage,
          'sameAs': [
      social.github || 'https://github.com/davidfdezcuenca',
      social.linkedin || 'https://linkedin.com/in/davidfdezcuenca',
      social.twitter || 'https://twitter.com/davidfdezcuenca'
    ]
    };
    
    if (type === 'article') {
      structuredData.author = {
        '@type': 'Person',
        'name': author
      };
      structuredData.publisher = {
        '@type': 'Organization',
        'name': 'David Fernández-Cuenca Portfolio',
        'url': baseUrl
      };
      if (publishedTime) structuredData.datePublished = publishedTime;
      if (modifiedTime) structuredData.dateModified = modifiedTime;
      if (section) structuredData.articleSection = section;
      if (tags.length > 0) structuredData.keywords = tags.join(', ');
    } else {
      structuredData.jobTitle = personal.jobTitle || 'Desarrollador de Software & IA';
      structuredData.worksFor = {
        '@type': 'Organization',
        'name': personal.company || 'Freelance / Consultoría'
      };
      structuredData.address = {
        '@type': 'PostalAddress',
        'addressLocality': personal.location?.city || 'Dusseldorf',
        'addressCountry': personal.location?.countryCode || 'DE'
      };
    }
    
    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    // Cleanup
    return () => {
      if (script.parentNode) {
        script.remove();
      }
    };
  }, [seoTitle, seoDescription, seoUrl, seoImage, type, author, publishedTime, modifiedTime, section, tags]);
  
  // Component doesn't render anything visible
  return null;
}

// Make SEO available globally
window.SEO = SEO;
