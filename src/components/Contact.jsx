// Contact Component - Optimized version
function Contact() {
  const { theme } = useAppContext(); // Only use theme from context
  // Use global translation function directly, not the hook
  const t = window.t;

  // Memoize translations to avoid re-renders
  const translations = React.useMemo(() => ({
    title: t('contact.title'),
    contactInfo: t('contact.contactInfo'),
    sendMessage: t('contact.sendMessage'),
    name: t('contact.name'),
    email: t('contact.email'),
    subject: t('contact.subject'),
    message: t('contact.message'),
    send: t('contact.send'),
    sending: t('contact.sending'),
    success: t('contact.success'),
    error: t('contact.error'),
    networkError: t('contact.networkError'),
    rateLimitError: t('contact.rateLimitError'),
    serverError: t('contact.serverError'),
    location: t('contact.location'),
    locationValue: t('contact.locationValue'),
    availability: t('contact.availability'),
    availabilityValue: t('contact.availabilityValue'),
    followMe: t('contact.followMe'),
    validation: {
      nameRequired: t('contact.validation.nameRequired'),
      nameMinLength: t('contact.validation.nameMinLength'),
      emailRequired: t('contact.validation.emailRequired'),
      emailInvalid: t('contact.validation.emailInvalid'),
      subjectRequired: t('contact.validation.subjectRequired'),
      subjectMinLength: t('contact.validation.subjectMinLength'),
      messageRequired: t('contact.validation.messageRequired'),
      messageMinLength: t('contact.validation.messageMinLength'),
      messageMaxLength: t('contact.validation.messageMaxLength')
    }
  }), []); // Empty dependency array - translations won't change during component lifecycle

  // Helper function for dynamic theme classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'nameRequired';
        if (value.trim().length < 2) return 'nameMinLength';
        return '';
      case 'email':
        if (!value.trim()) return 'emailRequired';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'emailInvalid';
        return '';
      case 'subject':
        if (!value.trim()) return 'subjectRequired';
        if (value.trim().length < 5) return 'subjectMinLength';
        return '';
      case 'message':
        if (!value.trim()) return 'messageRequired';
        if (value.trim().length < 10) return 'messageMinLength';
        if (value.trim().length > 1000) return 'messageMaxLength';
        return '';
      default:
        return '';
    }
  };

  // Helper function to get translated error message
  const getTranslatedError = (errorKey) => {
    if (!errorKey) return '';
    return translations.validation[errorKey] || errorKey;
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(field => {
      const errorKey = validateField(field, formData[field]);
      if (errorKey) errors[field] = errorKey;
    });
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Only validate and clear error if field has been touched
    if (touched[name]) {
      const errorKey = validateField(name, value);
      setFormErrors(prev => ({
        ...prev,
        [name]: errorKey
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const errorKey = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: errorKey
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Prepare form data
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        timestamp: new Date().toISOString(),
        language: window.currentLanguage || 'en'
      };

      // Submit to Vercel API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();
      
      if (result.success) {
        setFormStatus({ type: 'success', message: translations.success });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormErrors({});
        setTouched({});
      } else {
        setFormStatus({ type: 'error', message: result.error || translations.error });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      let errorMessage = translations.error;
      
      if (error.name === 'NetworkError' || !navigator.onLine) {
        errorMessage = translations.networkError;
      } else if (error.status === 429) {
        errorMessage = translations.rateLimitError;
      } else if (error.status >= 500) {
        errorMessage = translations.serverError;
      }
      
      setFormStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
      
      // Hide status after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: '', message: '' });
      }, 5000);
    }
  };

  const isFormValid = Object.keys(formErrors).length === 0 && 
                     formData.name.trim() !== '' &&
                     formData.email.trim() !== '' &&
                     formData.subject.trim() !== '' &&
                     formData.message.trim() !== '';

  return (
    <section id="contact" className={getThemeClasses(
      'py-24',
      'bg-primary-dark',
      'bg-primary-light'
    )}>
      <div className="container mx-auto px-6">
        <h2 className={getThemeClasses(
          'text-3xl md:text-4xl font-display font-semibold mb-8 text-center',
          'text-textLight-dark',
          'text-textLight-light'
        )}>
          {translations.title}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className={getThemeClasses(
              'text-2xl font-semibold mb-4',
              'text-textLight-dark',
              'text-textLight-light'
            )}>
              {translations.contactInfo}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent text-xl">📧</span>
                </div>
                <div>
                  <p className={getThemeClasses(
                    'font-medium',
                    'text-textLight-dark',
                    'text-textLight-light'
                  )}>
                    {translations.email}
                  </p>
                  <a href="mailto:david.fernandez-cuenca@example.com" className="text-accent hover:underline">
                    david.fernandez-cuenca@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent text-xl">📍</span>
                </div>
                <div>
                  <p className={getThemeClasses(
                    'font-medium',
                    'text-textLight-dark',
                    'text-textLight-light'
                  )}>
                    {translations.location}
                  </p>
                  <p className={getThemeClasses(
                    '',
                    'text-textMuted-dark',
                    'text-textMuted-light'
                  )}>
                    {translations.locationValue}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent text-xl">💼</span>
                </div>
                <div>
                  <p className={getThemeClasses(
                    'font-medium',
                    'text-textLight-dark',
                    'text-textLight-light'
                  )}>
                    {translations.availability}
                  </p>
                  <p className={getThemeClasses(
                    '',
                    'text-textMuted-dark',
                    'text-textMuted-light'
                  )}>
                    {translations.availabilityValue}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <h4 className={getThemeClasses(
                'font-medium mb-4',
                'text-textLight-dark',
                'text-textLight-light'
              )}>
                {translations.followMe}
              </h4>
              <div className="flex space-x-4">
                <a 
                  href="https://linkedin.com/in/david-cuenca-marcos-03b7121b5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-accent/20 transition"
                  aria-label="LinkedIn"
                >
                  <span className="text-xl">💼</span>
                </a>
                <a 
                  href="https://github.com/illuminatus503" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-accent/20 transition"
                  aria-label="GitHub"
                >
                  <span className="text-xl">🐙</span>
                </a>
                <a 
                  href="https://twitter.com/david_cuenca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-accent/20 transition"
                  aria-label="Twitter"
                >
                  <span className="text-xl">🐦</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className={getThemeClasses(
            'p-8 rounded-lg shadow-lg',
            'bg-secondary-dark border border-secondary-dark/50',
            'bg-secondary-light border border-secondary-light/50'
          )}>
            <h3 className={getThemeClasses(
              'text-2xl font-semibold mb-6',
              'text-textLight-dark',
              'text-textLight-light'
            )}>
              {translations.sendMessage}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className={getThemeClasses(
                  'block text-sm font-medium mb-2',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  {translations.name}
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required 
                  className={getThemeClasses(
                    'w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition',
                    'bg-primary-dark text-textLight-dark border border-secondary-dark placeholder-textMuted-dark',
                    'bg-primary-light text-textLight-light border border-secondary-light placeholder-textMuted-light'
                  )}
                  placeholder="Tu nombre"
                  disabled={isSubmitting}
                />
                {touched.name && formErrors.name && (
                  <p className="text-red-400 text-sm mt-1">{getTranslatedError(formErrors.name)}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className={getThemeClasses(
                  'block text-sm font-medium mb-2',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  {translations.email}
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required 
                  className={getThemeClasses(
                    'w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition',
                    'bg-primary-dark text-textLight-dark border border-secondary-dark placeholder-textMuted-dark',
                    'bg-primary-light text-textLight-light border border-secondary-light placeholder-textMuted-light'
                  )}
                  placeholder="tu@email.com"
                  disabled={isSubmitting}
                />
                {touched.email && formErrors.email && (
                  <p className="text-red-400 text-sm mt-1">{getTranslatedError(formErrors.email)}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className={getThemeClasses(
                  'block text-sm font-medium mb-2',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  {translations.subject}
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required 
                  className={getThemeClasses(
                    'w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition',
                    'bg-primary-dark text-textLight-dark border border-secondary-dark placeholder-textMuted-dark',
                    'bg-primary-light text-textLight-light border border-secondary-light placeholder-textMuted-light'
                  )}
                  placeholder="Asunto del mensaje"
                  disabled={isSubmitting}
                />
                {touched.subject && formErrors.subject && (
                  <p className="text-red-400 text-sm mt-1">{getTranslatedError(formErrors.subject)}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className={getThemeClasses(
                  'block text-sm font-medium mb-2',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  {translations.message}
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required 
                  className={getThemeClasses(
                    'w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition resize-none',
                    'bg-primary-dark text-textLight-dark border border-secondary-dark placeholder-textMuted-dark',
                    'bg-primary-light text-textLight-light border border-secondary-light placeholder-textMuted-light'
                  )}
                  placeholder="Tu mensaje aquí..."
                  disabled={isSubmitting}
                />
                {touched.message && formErrors.message && (
                  <p className="text-red-400 text-sm mt-1">{getTranslatedError(formErrors.message)}</p>
                )}
                <div className={getThemeClasses(
                  'text-right text-sm mt-1',
                  'text-textMuted-dark',
                  'text-textMuted-light'
                )}>
                  {formData.message.length}/1000
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting || !isFormValid}
                className="w-full bg-accent text-white py-3 px-6 rounded-lg hover:bg-accent/90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                <span>{isSubmitting ? translations.sending : translations.send}</span>
              </button>
            </form>
            
            {formStatus.message && (
              <div className={`mt-4 p-4 rounded-lg ${
                formStatus.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                  : 'bg-red-500/20 border border-red-500/30 text-red-400'
              }`}>
                {formStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Make Contact available globally
window.Contact = Contact; 