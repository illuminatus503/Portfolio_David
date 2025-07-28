// Contact Form Service
// This service handles all contact form API calls

const API_CONFIG = {
  // Replace with your actual API endpoint
  CONTACT_ENDPOINT: process.env.REACT_APP_CONTACT_API || '/api/contact',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

class ContactService {
  constructor() {
    this.baseURL = API_CONFIG.CONTACT_ENDPOINT;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  // Helper method to create fetch request with timeout
  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // Helper method to retry failed requests
  async retryRequest(requestFn, attempts = API_CONFIG.RETRY_ATTEMPTS) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await requestFn();
      } catch (error) {
        if (i === attempts - 1) throw error;
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY * (i + 1)));
      }
    }
  }

  // Submit contact form
  async submitContactForm(formData) {
    const requestFn = async () => {
      const response = await this.fetchWithTimeout(this.baseURL, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    };

    return this.retryRequest(requestFn);
  }

  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Sanitize form data
  sanitizeFormData(data) {
    return {
      name: data.name.trim().substring(0, 100),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim().substring(0, 200),
      message: data.message.trim().substring(0, 1000),
      language: data.language || 'en',
    };
  }

  // Check if form data is valid
  validateFormData(data) {
    const errors = {};

    if (!data.name || data.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!data.email || !this.validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.subject || data.subject.length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }

    if (!data.message || data.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  // Simulate form submission for development/testing
  async simulateSubmission(formData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random success/failure for testing
    const isSuccess = Math.random() > 0.1; // 90% success rate
    
    if (!isSuccess) {
      throw new Error('Simulated server error');
    }
    
    return {
      success: true,
      message: 'Message sent successfully',
      id: `msg_${Date.now()}`,
    };
  }
}

// Create singleton instance
const contactService = new ContactService();

export default contactService; 