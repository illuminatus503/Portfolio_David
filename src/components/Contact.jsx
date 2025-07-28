// Import useTranslation hook
const { useTranslation } = await import('../i18n/useTranslation.js');

// Contact Component
function Contact() {
  const { theme } = useAppContext();
  const { t } = useTranslation();

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
        if (!value.trim()) return t('contact.validation.nameRequired');
        if (value.trim().length < 2) return t('contact.validation.nameMinLength');
        return '';
      case 'email':
        if (!value.trim()) return t('contact.validation.emailRequired');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return t('contact.validation.emailInvalid');
        return '';
      case 'subject':
        if (!value.trim()) return t('contact.validation.subjectRequired');
        if (value.trim().length < 5) return t('contact.validation.subjectMinLength');
        return '';
      case 'message':
        if (!value.trim()) return t('contact.validation.messageRequired');
        if (value.trim().length < 10) return t('contact.validation.messageMinLength');
        if (value.trim().length > 1000) return t('contact.validation.messageMaxLength');
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
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
        language: language
      };

      // Simulate API call (replace with actual endpoint)
      const response = await submitFormData(submitData);
      
      if (response.success) {
        setFormStatus({ type: 'success', message: t('contact.success') });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormErrors({});
        setTouched({});
      } else {
        setFormStatus({ type: 'error', message: response.error || t('contact.error') });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      let errorMessage = t('contact.error');
      
      if (error.name === 'NetworkError' || !navigator.onLine) {
        errorMessage = t('contact.networkError');
      } else if (error.status === 429) {
        errorMessage = t('contact.rateLimitError');
      } else if (error.status >= 500) {
        errorMessage = t('contact.serverError');
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

  // Submit form data using Gmail service
  const submitFormData = async (data) => {
    try {
      // Import and use Gmail service
      const gmailService = await import('../services/gmailService.js').then(m => m.default);
      return await gmailService.submitContactForm(data);
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Handle specific error types
      if (error.message.includes('timeout')) {
        throw new Error('Request timeout - please try again');
      } else if (error.message.includes('rate limit')) {
        throw new Error('Too many attempts - please wait a moment');
      } else if (error.message.includes('validation')) {
        throw new Error('Please check your form data');
      } else {
        throw new Error('Failed to send message - please try again');
      }
    }
  };

  const isFormValid = Object.keys(formErrors).length === 0 && 
                     Object.values(formData).every(value => value.trim() !== '');

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
          {t('contact.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className={getThemeClasses(
              'text-2xl font-semibold mb-4',
              'text-textLight-dark',
              'text-textLight-light'
            )}>
              {t('contact.contactInfo')}
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
                    {t('contact.email')}
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
                    {t('contact.location')}
                  </p>
                  <p className={getThemeClasses(
                    '',
                    'text-textMuted-dark',
                    'text-textMuted-light'
                  )}>
                    {t('contact.locationValue')}
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
                    {t('contact.availability')}
                  </p>
                  <p className={getThemeClasses(
                    '',
                    'text-textMuted-dark',
                    'text-textMuted-light'
                  )}>
                    {t('contact.availabilityValue')}
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
                {t('contact.followMe')}
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
            'p-8 rounded-lg',
            'bg-secondary-dark',
            'bg-secondary-light'
          )}>
            <h3 className={getThemeClasses(
              'text-2xl font-semibold mb-6',
              'text-textLight-dark',
              'text-textLight-light'
            )}>
              {t('contact.sendMessage')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className={getThemeClasses(
                  'block text-sm font-medium mb-2',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  {t('contact.name')}
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required 
                  className={`w-full px-4 py-3 bg-primary border rounded-lg focus:outline-none focus:border-accent transition ${
                    touched.name && formErrors.name 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-600'
                  }`}
                  disabled={isSubmitting}
                />
                {touched.name && formErrors.name && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className={getThemeClasses(
                  'block text-sm font-medium mb-2',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  {t('contact.email')}
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required 
                  className={`w-full px-4 py-3 bg-primary border rounded-lg focus:outline-none focus:border-accent transition ${
                    touched.email && formErrors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-600'
                  }`}
                  disabled={isSubmitting}
                />
                {touched.email && formErrors.email && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className={getThemeClasses(
                  'block text-sm font-medium mb-2',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  {t('contact.subject')}
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required 
                  className={`w-full px-4 py-3 bg-primary border rounded-lg focus:outline-none focus:border-accent transition ${
                    touched.subject && formErrors.subject 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-600'
                  }`}
                  disabled={isSubmitting}
                />
                {touched.subject && formErrors.subject && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.subject}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className={getThemeClasses(
                  'block text-sm font-medium mb-2',
                  'text-textLight-dark',
                  'text-textLight-light'
                )}>
                  {t('contact.message')}
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required 
                  className={`w-full px-4 py-3 bg-primary border rounded-lg focus:outline-none focus:border-accent transition resize-none ${
                    touched.message && formErrors.message 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-600'
                  }`}
                  disabled={isSubmitting}
                />
                {touched.message && formErrors.message && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.message}</p>
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
                <span>{isSubmitting ? t('contact.sending') : t('contact.send')}</span>
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