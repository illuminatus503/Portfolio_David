// Gmail Service for Contact Form (Vercel Function)
class GmailService {
  constructor() {
    // Use Vercel Function endpoint
    this.apiEndpoint = '/api/contact';
    this.timeout = 10000; // 10 seconds
    this.retryAttempts = 3;
  }

  // Send email via Gmail SMTP
  async sendEmail(formData) {
    try {
      const response = await this.fetchWithTimeout(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          timestamp: new Date().toISOString(),
          language: formData.language || 'en'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Gmail service error:', error);
      throw error;
    }
  }

  // Fetch with timeout
  async fetchWithTimeout(url, options) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
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

  // Retry request with exponential backoff
  async retryRequest(fn, attempts = this.retryAttempts) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === attempts - 1) throw error;
        
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Sanitize form data
  sanitizeFormData(data) {
    return {
      name: this.sanitizeString(data.name, 100),
      email: data.email.toLowerCase().trim(),
      subject: this.sanitizeString(data.subject, 200),
      message: this.sanitizeString(data.message, 1000),
      timestamp: data.timestamp,
      language: data.language || 'en'
    };
  }

  // Sanitize string
  sanitizeString(str, maxLength) {
    if (!str) return '';
    
    // Remove HTML tags and dangerous characters
    const sanitized = str
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[<>]/g, '') // Remove < and >
      .trim()
      .substring(0, maxLength);
    
    return sanitized;
  }

  // Validate form data
  validateFormData(data) {
    const errors = {};

    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!data.email || !this.validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.subject || data.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    if (data.message && data.message.trim().length > 1000) {
      errors.message = 'Message cannot exceed 1000 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Submit contact form with retry logic
  async submitContactForm(formData) {
    const validation = this.validateFormData(formData);
    if (!validation.isValid) {
      throw new Error('Form validation failed');
    }

    const sanitizedData = this.sanitizeFormData(formData);

    return await this.retryRequest(async () => {
      return await this.sendEmail(sanitizedData);
    });
  }

  // Simulate email sending for development
  async simulateEmailSending(formData) {
    console.log('Simulating email sending:', formData);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random success/failure for testing
    const isSuccess = Math.random() > 0.1; // 90% success rate
    
    if (!isSuccess) {
      throw new Error('Simulated email sending failure');
    }
    
    return {
      success: true,
      message: 'Email sent successfully',
      timestamp: new Date().toISOString()
    };
  }
}

// Export singleton instance
export default new GmailService(); 