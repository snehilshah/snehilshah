# Echo Service - Standalone Application

A standalone HTTP request inspector and echo service that collects and displays detailed information about client requests, browser details, and system specifications.

## Features

- **Request Information**: URL, path, origin, query parameters, referrer, timestamp
- **HTTP Headers**: Complete incoming request headers (when deployed with server)
- **Client Details**: Platform, language, timezone, online status, cookie support
- **Display Specifications**: Screen resolution, viewport size, color depth
- **Browser Information**: User agent, supported languages
- **Real-time Updates**: Live uptime counter, viewport changes, online/offline status
- **Data Export**: Copy raw JSON data to clipboard
- **Responsive Design**: Works on desktop and mobile devices

## Deployment

### Simple HTTP Server (Headers will be simulated)

1. **Python 3** (if available):
   ```bash
   cd standalone
   python -m http.server 8080
   ```

2. **Node.js with Express** (for real headers):
   ```bash
   npm init -y
   npm install express
   ```
   
   Create `server.js`:
   ```javascript
   const express = require('express');
   const path = require('path');
   const app = express();
   
   // Serve static files
   app.use(express.static('.'));
   
   // Headers endpoint
   app.get('/api/headers', (req, res) => {
     res.json({
       headers: req.headers,
       method: req.method,
       url: req.url,
       timestamp: new Date().toISOString()
     });
   });
   
   app.listen(8080, () => {
     console.log('Server running on http://localhost:8080');
   });
   ```
   
   Run: `node server.js`

2. **Python 2** (if available):
   ```bash
   cd standalone
   python -m SimpleHTTPServer 8080
   ```

3. **Node.js** (if available):
   ```bash
   cd standalone
   npx http-server -p 8080
   ```

4. **PHP** (if available):
   ```bash
   cd standalone
   php -S localhost:8080
   ```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/standalone;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache Configuration

Create `.htaccess` file in the standalone directory:
```apache
DirectoryIndex index.html
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [QSA,L]
```

### Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t echo-service .
docker run -p 8080:80 echo-service
```

## Files

- `index.html` - Main HTML structure
- `page.css` - Styling and responsive design
- `script.js` - Echo service functionality and data collection

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Fallback support for older browsers

## Usage

1. Open `index.html` in a web browser
2. The service will automatically collect and display client information
3. Use the "Copy" button to export raw JSON data
4. The interface updates in real-time for viewport changes and online status

## Configuration

The service can be deployed on any IP address or domain. No configuration changes are needed - it automatically adapts to the deployment environment.

## API

The service exposes a global `refreshEchoData()` function for programmatic data refresh:

```javascript
// Refresh echo data
refreshEchoData();
```
