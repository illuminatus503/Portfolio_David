// Vercel Serverless Function for Contact Form
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { name, email, subject, message, language = 'en' } = req.body;

    // Validate form data
    const validation = validateFormData({ name, email, subject, message });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors
      });
    }

    // Sanitize data
    const sanitizedData = {
      name: sanitizeString(name, 100),
      email: email.toLowerCase().trim(),
      subject: sanitizeString(subject, 200),
      message: sanitizeString(message, 1000),
      language
    };

    // Create email content
    const emailContent = `
      New Contact Form Submission
      
      Name: ${sanitizedData.name}
      Email: ${sanitizedData.email}
      Subject: ${sanitizedData.subject}
      Language: ${sanitizedData.language}
      Timestamp: ${new Date().toISOString()}
      
      Message:
      ${sanitizedData.message}
      
      ---
      This email was sent from your portfolio contact form.
    `;

    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${sanitizedData.name}</p>
      <p><strong>Email:</strong> ${sanitizedData.email}</p>
      <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
      <p><strong>Language:</strong> ${sanitizedData.language}</p>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      <hr>
      <h3>Message:</h3>
      <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>This email was sent from your portfolio contact form.</em></p>
    `;

    // Create Gmail transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER,
      subject: `Portfolio Contact: ${sanitizedData.subject}`,
      text: emailContent,
      html: htmlContent,
      replyTo: sanitizedData.email
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeString(str, maxLength = 1000) {
  if (!str) return '';
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove < and >
    .trim()
    .substring(0, maxLength);
}

function validateFormData(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email || !validateEmail(data.email)) {
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