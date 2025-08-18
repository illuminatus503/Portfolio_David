// API Route: /api/blog
const { Pool } = require('pg');
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

module.exports = async function handler(req, res) {
  // GET /api/blog - Get blog posts
  if (req.method === 'GET') {
    try {
      const { page = 1, limit = 10, published = true } = req.query;
      const offset = (page - 1) * limit;
      
      const result = await pool.query(
        'SELECT * FROM blog_posts WHERE published = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
        [published === 'true', parseInt(limit), offset]
      );
      
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  // POST /api/blog - Create new blog post (requires auth)
  else if (req.method === 'POST') {
    authenticateToken(req, res, async () => {
      try {
        const { title, content, excerpt, tags, published } = req.body;
        
        const result = await pool.query(
          `INSERT INTO blog_posts (title, content, excerpt, tags, published, author_id)
           VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
          [title, content, excerpt, tags, published, req.user.userId]
        );
        
        res.status(201).json(result.rows[0]);
      } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  }
  
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
