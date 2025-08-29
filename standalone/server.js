const express = require('express');
const path = require('path');
const app = express();

// Serve static files from current directory
app.use(express.static(__dirname));

// Headers endpoint - captures all incoming headers
app.get('/api/headers', (req, res) => {
  // Get client IP from various possible headers
  const clientIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress ||
                   req.socket.remoteAddress ||
                   (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
                   'Unknown';

  res.json({
    headers: {
      ...req.headers,
      'x-client-ip': clientIP,
      'x-request-method': req.method,
      'x-request-url': req.url,
      'x-server-timestamp': new Date().toISOString()
    },
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
    clientIP: clientIP
  });
});

// Catch all route - serve index.html for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Echo Service running on http://localhost:${PORT}`);
  console.log('Headers endpoint available at /api/headers');
});
