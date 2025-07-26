/*
 * Minimal Node.js server to serve a modern, minimalist portfolio page.  
 * 
 * This server uses only built‑in modules (`http` and `fs`) to avoid pulling in
 * external dependencies. It listens on port 3000 by default and serves
 * content from the `public` directory. If a request is made to a file that
 * doesn't exist, the server responds with the `index.html` file. This allows
 * simple client‑side routing if you later extend the page to be a single
 * page application.
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