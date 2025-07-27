// Contact Component
function Contact() {
  const { language } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translations = {
    es: {
      title: 'Contacto',
      subtitle: '¿Interesado en colaborar o tienes alguna pregunta?',
      contactInfo: 'Información de Contacto',
      email: 'Email',
      location: 'Ubicación',
      locationValue: 'Madrid, España',
      availability: 'Disponibilidad',
      availabilityValue: 'Abierto a nuevas oportunidades',
      followMe: 'Sígueme en:',
      sendMessage: 'Envíame un mensaje',
      name: 'Nombre *',
      subject: 'Asunto *',
      message: 'Mensaje *',
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado con éxito! Te responderé pronto.',
      error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
    },
    en: {
      title: 'Get in Touch',
      subtitle: 'Interested in collaborating or have questions?',
      contactInfo: 'Contact Information',
      email: 'Email',
      location: 'Location',
      locationValue: 'Madrid, Spain',
      availability: 'Availability',
      availabilityValue: 'Open to new opportunities',
      followMe: 'Follow me on:',
      sendMessage: 'Send me a message',
      name: 'Name *',
      subject: 'Subject *',
      message: 'Message *',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Message sent successfully! I\'ll get back to you soon.',
      error: 'Error sending message. Please try again.'
    }
  };

  const t = translations[language];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormStatus({ type: 'success', message: t.success });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus({ type: 'error', message: t.error });
    } finally {
      setIsSubmitting(false);
      
      // Hide status after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: '', message: '' });
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8 text-center">
          {t.title}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">{t.contactInfo}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent text-xl">📧</span>
                </div>
                <div>
                  <p className="font-medium">{t.email}</p>
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
                  <p className="font-medium">{t.location}</p>
                  <p className="text-textMuted">{t.locationValue}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent text-xl">💼</span>
                </div>
                <div>
                  <p className="font-medium">{t.availability}</p>
                  <p className="text-textMuted">{t.availabilityValue}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <h4 className="font-medium mb-4">{t.followMe}</h4>
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
          <div className="bg-secondary p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">{t.sendMessage}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">{t.name}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-lg focus:outline-none focus:border-accent transition"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">{t.email}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-lg focus:outline-none focus:border-accent transition"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">{t.subject}</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-lg focus:outline-none focus:border-accent transition"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">{t.message}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleInputChange}
                  required 
                  className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-lg focus:outline-none focus:border-accent transition resize-none"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-accent text-white py-3 px-6 rounded-lg hover:bg-accent/90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t.sending : t.send}
              </button>
            </form>
            
            {formStatus.message && (
              <div className={`mt-4 text-center ${formStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {formStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 