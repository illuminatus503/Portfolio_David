/*
  server.js - Static File Server for Portfolio

  Description:
    Minimal Node.js server to serve the professional portfolio of David Fernández-Cuenca Marcos.
    Uses only built-in modules (http, fs, path) for maximum portability and zero dependencies.

  Usage:
    - Run `node server.js` to start the server (default port: 3000).
    - Serves all files from the `public/` directory.
    - Falls back to `index.html` for unknown routes (SPA-friendly).

  Structure:
    - Serves static assets (HTML, CSS, JS, images, manifest, etc.).
    - MIME types are set based on file extension.
    - Designed for local development and simple deployments.

  Maintenance:
    - Keep all code and comments in English.
    - Extend to support HTTPS, logging, or API endpoints as needed.
    - For production, consider using a dedicated static file server (e.g., Nginx, Vercel, Netlify).
*/

const http = require('http');
const fs = require('fs');
const path = require('path');

// The root directory from which static assets will be served.
const publicDir = path.join(__dirname, 'public');

// Helper function to determine the appropriate MIME type based on file extension.
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.ico': return 'image/x-icon';
    default: return 'application/octet-stream';
  }
}

const server = http.createServer((req, res) => {
  // Normalize the URL to prevent directory traversal attacks.
  const safePath = path.normalize(req.url.split('?')[0]).replace(/^\.\./, '');
  let filePath = path.join(publicDir, safePath);

  // If directory is requested, serve index.html within that directory.
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If the file exists, serve it; otherwise serve the default index.html.
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fallback to index.html for unknown routes (useful for SPAs).
      const indexPath = path.join(publicDir, 'index.html');
      fs.readFile(indexPath, (error, indexData) => {
        if (error) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(indexData);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': getContentType(filePath) });
      res.end(data);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});