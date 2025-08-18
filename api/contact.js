// API Route: /api/contact
const nodemailer = require('nodemailer');
const { Pool } = require('pg');

// Database connection (with fallback for development)
let pool = null;
try {
  if (process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
  }
} catch (error) {
  console.log('Database not configured, skipping DB connection');
}

// Email transporter (with fallback for development)
let transporter = null;
try {
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
  }
} catch (error) {
  console.log('Email not configured, skipping email setup');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to database (if available)
    if (pool) {
      try {
        await pool.query(
          'INSERT INTO contact_submissions (name, email, subject, message) VALUES ($1, $2, $3, $4)',
          [name, email, subject, message]
        );
        console.log('✅ Message saved to database');
      } catch (dbError) {
        console.log('⚠️ Database save failed:', dbError.message);
      }
    } else {
      console.log('📝 Database not configured, message not saved to DB');
    }

    // Send email (if configured)
    if (transporter && process.env.RECIPIENT_EMAIL) {
      try {
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: process.env.RECIPIENT_EMAIL,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h3>Nuevo mensaje de contacto del portfolio</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully');
      } catch (emailError) {
        console.log('⚠️ Email sending failed:', emailError.message);
      }
    } else {
      console.log('📧 Email not configured, message not sent');
    }

    // Log the contact for development
    console.log('📩 Contact form submission:', {
      name,
      email,
      subject,
      message: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
      timestamp: new Date().toISOString()
    });

    res.json({ success: true, message: 'Message sent successfully' });

  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
} 