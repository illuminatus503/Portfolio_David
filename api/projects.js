// API Route: /api/projects
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// GET /api/projects - Get all projects
module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM projects ORDER BY featured DESC, order_index ASC');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // POST /api/projects - Create new project (requires auth)
  else if (req.method === 'POST') {
    authenticateToken(req, res, async () => {
      try {
        const { title, description, technologies, github_url, live_url, image_url, featured, github_id, github_metadata } = req.body;
        
        const result = await pool.query(
          `INSERT INTO projects (title, description, technologies, github_url, live_url, image_url, featured, github_id, github_metadata)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
          [title, description, technologies, github_url, live_url, image_url, featured, github_id, github_metadata]
        );
        
        res.status(201).json(result.rows[0]);
      } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  }
  
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
