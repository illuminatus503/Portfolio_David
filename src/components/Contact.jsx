// Contact Component - Restored with specific fixes
function Contact() {
  const { theme } = useAppContext();
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
    placeholders: {
      name: t('contact.placeholders.name'),
      email: t('contact.placeholders.email'),
      subject: t('contact.placeholders.subject'),
      message: t('contact.placeholders.message')
    },
    validation: {
      nameRequired: t('contact.validation.nameRequired'),
      nameMinLength: t('contact.validation.nameMinLength'),
      nameMaxLength: t('contact.validation.nameMaxLength'),
      namePattern: t('contact.validation.namePattern'),
      emailRequired: t('contact.validation.emailRequired'),
      emailInvalid: t('contact.validation.emailInvalid'),
      subjectRequired: t('contact.validation.subjectRequired'),
      subjectMinLength: t('contact.validation.subjectMinLength'),
      subjectMaxLength: t('contact.validation.subjectMaxLength'),
      messageRequired: t('contact.validation.messageRequired'),
      messageMinLength: t('contact.validation.messageMinLength'),
      messageMaxLength: t('contact.validation.messageMaxLength')
    }
  }), []);

  // Helper function for dynamic theme classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };

  // Use the validation module
  const {
    formData,
    formErrors,
    touched,
    isFormValid,
    handleInputChange,
    handleBlur,
    resetForm,
    setFormErrors
  } = window.useFormValidation({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = React.useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Helper function to get translated error message
  const getTranslatedError = (errorKey) => {
    if (!errorKey) return '';
    return translations.validation[errorKey] || errorKey;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = formErrors;
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
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
        resetForm();
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
                  placeholder={translations.placeholders.name}
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
                  placeholder={translations.placeholders.email}
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
                  {translations.subject.replace(' *', '')}
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={getThemeClasses(
                    'w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition',
                    'bg-primary-dark text-textLight-dark border border-secondary-dark placeholder-textMuted-dark',
                    'bg-primary-light text-textLight-light border border-secondary-light placeholder-textMuted-light'
                  )}
                  placeholder={translations.placeholders.subject}
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
                  placeholder={translations.placeholders.message}
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