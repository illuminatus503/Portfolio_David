// useTranslation Hook
import { useContext } from 'react';

// Mock i18n for now - replace with actual i18n when ready
const mockTranslations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      name: 'David Fernández-Cuenca Marcos',
      role: 'Software Engineer at Indra',
      tagline: 'Critical systems and air traffic control specialist',
      cta: "Let's Talk"
    },
    about: {
      title: 'About Me',
      brief: 'Software engineer with over 10 years of experience in backend development, AI, and critical systems.',
      more: 'I have led projects in Python, Ada, and C, building APIs, microservices, and high-availability control systems. I enjoy optimizing code and enhancing user experiences with minimalist designs.',
      readMore: 'Read more',
      readLess: 'Read less'
    },
    skills: {
      title: 'Skills'
    },
    projects: {
      title: 'Featured Projects',
      repositories: 'Repositories',
      stars: 'Stars',
      commits: 'Commits (30 days)',
      viewOnGitHub: 'View on GitHub →',
      loading: 'Loading projects...',
      details: 'Details'
    },
    contact: {
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
      error: 'Error sending message. Please try again.',
      validation: {
        nameRequired: 'Name is required',
        nameMinLength: 'Name must be at least 2 characters',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        subjectRequired: 'Subject is required',
        subjectMinLength: 'Subject must be at least 5 characters',
        messageRequired: 'Message is required',
        messageMinLength: 'Message must be at least 10 characters',
        messageMaxLength: 'Message cannot exceed 1000 characters'
      },
      networkError: 'Connection error. Please check your internet connection.',
      serverError: 'Server error. Please try again later.',
      rateLimitError: 'Too many attempts. Please wait a moment.'
    },
    footer: {
      copyright: '© {year} David Fernández-Cuenca Marcos. All rights reserved.'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto'
    },
    hero: {
      name: 'David Fernández-Cuenca Marcos',
      role: 'Ingeniero de Software en Indra',
      tagline: 'Especialista en sistemas críticos y control de tráfico aéreo',
      cta: 'Conectemos'
    },
    about: {
      title: 'Sobre mí',
      brief: 'Ingeniero de software con más de 10 años de experiencia en desarrollo backend, sistemas críticos y tecnologías emergentes.',
      more: 'He liderado proyectos complejos en Python, Ada y C, desarrollando APIs robustas, microservicios escalables y sistemas de control de alta disponibilidad para el sector aeronáutico. Mi experiencia incluye machine learning, optimización de rendimiento y arquitecturas distribuidas. Me apasiona crear soluciones elegantes y eficientes que resuelvan problemas reales.',
      readMore: 'Leer más',
      readLess: 'Leer menos'
    },
    skills: {
      title: 'Habilidades Técnicas'
    },
    projects: {
      title: 'Proyectos Destacados',
      repositories: 'Repositorios',
      stars: 'Estrellas',
      commits: 'Commits (30 días)',
      viewOnGitHub: 'Ver en GitHub →',
      loading: 'Cargando proyectos...',
      details: 'Detalles'
    },
    contact: {
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
      error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
      validation: {
        nameRequired: 'El nombre es obligatorio',
        nameMinLength: 'El nombre debe tener al menos 2 caracteres',
        emailRequired: 'El email es obligatorio',
        emailInvalid: 'Por favor, introduce un email válido',
        subjectRequired: 'El asunto es obligatorio',
        subjectMinLength: 'El asunto debe tener al menos 5 caracteres',
        messageRequired: 'El mensaje es obligatorio',
        messageMinLength: 'El mensaje debe tener al menos 10 caracteres',
        messageMaxLength: 'El mensaje no puede exceder 1000 caracteres'
      },
      networkError: 'Error de conexión. Verifica tu conexión a internet.',
      serverError: 'Error del servidor. Por favor, inténtalo más tarde.',
      rateLimitError: 'Demasiados intentos. Por favor, espera un momento.'
    },
    footer: {
      copyright: '© {year} David Fernández-Cuenca Marcos. Todos los derechos reservados.'
    }
  }
};

export function useTranslation() {
  // Get language from context (you'll need to add this to your AppContext)
  const { language } = useAppContext();
  
  // Get browser locale
  const getBrowserLocale = () => {
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0];
    return mockTranslations[shortLang] ? shortLang : 'en';
  };
  
  const browserLocale = getBrowserLocale();
  
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let translation = mockTranslations[language];

    // Navigate through nested keys
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        // Fallback to browser locale first, then English
        const fallbackLocale = browserLocale !== language ? browserLocale : 'en';
        translation = mockTranslations[fallbackLocale];
        for (const fallbackKey of keys) {
          if (translation && translation[fallbackKey]) {
            translation = translation[fallbackKey];
          } else {
            // Final fallback to English
            translation = mockTranslations.en;
            for (const finalKey of keys) {
              if (translation && translation[finalKey]) {
                translation = translation[finalKey];
              } else {
                return key; // Return key if translation not found
              }
            }
          }
        }
      }
    }

    // Navigate through nested keys
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        // Fallback to English
        translation = mockTranslations.en;
        for (const fallbackKey of keys) {
          if (translation && translation[fallbackKey]) {
            translation = translation[fallbackKey];
          } else {
            return key; // Return key if translation not found
          }
        }
      }
    }

    // Replace parameters
    if (typeof translation === 'string') {
      return translation.replace(/\{(\w+)\}/g, (match, param) => {
        return params[param] || match;
      });
    }

    return translation;
  };

  return { t, language };
} 