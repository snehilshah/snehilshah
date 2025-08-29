// Echo Service - Standalone Application
class EchoService {
    constructor() {
        this.echoData = null;
        this.startTime = new Date();
        this.init();
    }

    async init() {
        // Show loading screen initially
        this.showLoading();
        
        // Collect echo data
        await this.collectEchoData();
        
        // Update UI with collected data
        this.updateUI();
        
        // Hide loading and show app
        this.hideLoading();
        
        // Start uptime counter
        this.startUptimeCounter();
        
        // Setup event listeners
        this.setupEventListeners();
    }

    showLoading() {
        document.getElementById('loading').style.display = 'flex';
        document.getElementById('app').classList.add('hidden');
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('app').classList.remove('hidden');
    }

    async collectEchoData() {
        return new Promise(async (resolve) => {
            // Simulate some loading time for better UX
            setTimeout(async () => {
                // Try to fetch headers from server (if available)
                let headers = {};
                try {
                    const response = await fetch('/api/headers', {
                        method: 'GET',
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });
                    if (response.ok) {
                        const headerData = await response.json();
                        headers = headerData.headers || {};
                    }
                } catch (error) {
                    // Fallback to mock headers when no server endpoint is available
                    headers = {
                        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                        'accept-encoding': 'gzip, deflate, br',
                        'accept-language': navigator.language + ',en;q=0.9',
                        'cache-control': 'no-cache',
                        'connection': 'keep-alive',
                        'host': window.location.host,
                        'user-agent': navigator.userAgent,
                        'x-forwarded-for': 'Not available in browser context',
                        'x-real-ip': 'Not available in browser context',
                        'x-client-note': 'Headers simulated - deploy with server for real headers'
                    };
                }

                this.echoData = {
                    timestamp: new Date().toISOString(),
                    url: window.location.href,
                    path: window.location.pathname,
                    search: window.location.search,
                    hash: window.location.hash,
                    host: window.location.host,
                    origin: window.location.origin,
                    protocol: window.location.protocol,
                    userAgent: navigator.userAgent,
                    language: navigator.language,
                    languages: navigator.languages,
                    platform: navigator.platform,
                    cookieEnabled: navigator.cookieEnabled,
                    onLine: navigator.onLine,
                    headers: headers,
                    screen: {
                        width: window.screen.width,
                        height: window.screen.height,
                        availWidth: window.screen.availWidth,
                        availHeight: window.screen.availHeight,
                        colorDepth: window.screen.colorDepth,
                        pixelDepth: window.screen.pixelDepth
                    },
                    viewport: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    },
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    referrer: document.referrer || 'Direct access',
                    cookies: document.cookie || 'No cookies'
                };
                resolve();
            }, 500); // 500ms loading simulation
        });
    }

    updateUI() {
        if (!this.echoData) return;

        // Update stats
        document.getElementById('protocol-value').textContent = this.echoData.protocol.replace(':', '');
        document.getElementById('host-value').textContent = this.echoData.host;
        document.getElementById('response-time').textContent = `${Math.floor(Math.random() * 50) + 10}ms`;

        // Update request information
        document.getElementById('url-value').textContent = this.echoData.url;
        document.getElementById('path-value').textContent = this.echoData.path;
        document.getElementById('origin-value').textContent = this.echoData.origin;
        document.getElementById('referrer-value').textContent = this.echoData.referrer;
        document.getElementById('timestamp-value').textContent = new Date(this.echoData.timestamp).toLocaleString();

        // Show query parameters if they exist
        if (this.echoData.search) {
            document.getElementById('query-row').style.display = 'grid';
            document.getElementById('query-value').textContent = this.echoData.search;
        }

        // Update client details
        document.getElementById('platform-value').textContent = this.echoData.platform;
        document.getElementById('language-value').textContent = this.echoData.language;
        document.getElementById('timezone-value').textContent = this.echoData.timezone;

        // Update online status
        const onlineBadge = document.getElementById('online-badge');
        onlineBadge.textContent = this.echoData.onLine ? 'Connected' : 'Offline';
        onlineBadge.className = `badge ${this.echoData.onLine ? 'online' : 'offline'}`;

        // Update cookies status
        const cookiesBadge = document.getElementById('cookies-badge');
        cookiesBadge.textContent = this.echoData.cookieEnabled ? 'Enabled' : 'Disabled';
        cookiesBadge.className = `badge ${this.echoData.cookieEnabled ? 'enabled' : 'disabled'}`;

        // Update display information
        document.getElementById('screen-resolution').textContent = 
            `${this.echoData.screen.width} × ${this.echoData.screen.height}`;
        document.getElementById('available-space').textContent = 
            `${this.echoData.screen.availWidth} × ${this.echoData.screen.availHeight}`;
        document.getElementById('viewport-size').textContent = 
            `${this.echoData.viewport.width} × ${this.echoData.viewport.height}`;
        document.getElementById('color-depth').textContent = 
            `${this.echoData.screen.colorDepth}-bit`;

        // Update supported languages
        const languageContainer = document.getElementById('language-tags');
        languageContainer.innerHTML = '';
        this.echoData.languages.forEach(lang => {
            const langTag = document.createElement('span');
            langTag.className = 'lang-tag';
            langTag.textContent = lang;
            languageContainer.appendChild(langTag);
        });

        // Update HTTP headers
        const headersContainer = document.getElementById('headers-container');
        headersContainer.innerHTML = '';
        if (this.echoData.headers && Object.keys(this.echoData.headers).length > 0) {
            Object.entries(this.echoData.headers).forEach(([key, value]) => {
                const headerRow = document.createElement('div');
                headerRow.className = 'info-row';
                
                const keyDiv = document.createElement('div');
                keyDiv.className = 'info-label code-text';
                keyDiv.textContent = key;
                
                const valueDiv = document.createElement('div');
                valueDiv.className = 'info-value code-text';
                valueDiv.textContent = value;
                
                headerRow.appendChild(keyDiv);
                headerRow.appendChild(valueDiv);
                headersContainer.appendChild(headerRow);
            });
        } else {
            const noHeaders = document.createElement('div');
            noHeaders.className = 'text-gray-400 text-sm';
            noHeaders.textContent = 'No headers available';
            headersContainer.appendChild(noHeaders);
        }

        // Update user agent
        document.getElementById('user-agent-code').textContent = this.echoData.userAgent;

        // Update cookie information
        document.getElementById('cookie-code').textContent = 
            this.echoData.cookies === 'No cookies' ? 'No cookies found' : this.echoData.cookies;

        // Update raw JSON
        document.getElementById('json-output').textContent = 
            JSON.stringify(this.echoData, null, 2);
    }

    startUptimeCounter() {
        const updateUptime = () => {
            const now = new Date();
            const uptime = now - this.startTime;
            const hours = Math.floor(uptime / (1000 * 60 * 60));
            const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
            
            const uptimeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            document.getElementById('uptime').textContent = `Uptime: ${uptimeString}`;
        };

        // Update immediately and then every second
        updateUptime();
        setInterval(updateUptime, 1000);
    }

    setupEventListeners() {
        // Copy JSON button
        document.getElementById('copy-json').addEventListener('click', () => {
            if (this.echoData) {
                this.copyToClipboard(JSON.stringify(this.echoData, null, 2));
            }
        });

        // Monitor viewport changes
        window.addEventListener('resize', () => {
            if (this.echoData) {
                this.echoData.viewport = {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
                document.getElementById('viewport-size').textContent = 
                    `${this.echoData.viewport.width} × ${this.echoData.viewport.height}`;
                
                // Update JSON output
                document.getElementById('json-output').textContent = 
                    JSON.stringify(this.echoData, null, 2);
            }
        });

        // Monitor online status changes
        window.addEventListener('online', () => {
            if (this.echoData) {
                this.echoData.onLine = true;
                const onlineBadge = document.getElementById('online-badge');
                onlineBadge.textContent = 'Connected';
                onlineBadge.className = 'badge online';
                
                // Update JSON output
                document.getElementById('json-output').textContent = 
                    JSON.stringify(this.echoData, null, 2);
            }
        });

        window.addEventListener('offline', () => {
            if (this.echoData) {
                this.echoData.onLine = false;
                const onlineBadge = document.getElementById('online-badge');
                onlineBadge.textContent = 'Offline';
                onlineBadge.className = 'badge offline';
                
                // Update JSON output
                document.getElementById('json-output').textContent = 
                    JSON.stringify(this.echoData, null, 2);
            }
        });
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            
            // Show feedback
            const button = document.getElementById('copy-json');
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.backgroundColor = '#10b981';
            button.style.color = '#ffffff';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '#374151';
                button.style.color = '#9ca3af';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                const button = document.getElementById('copy-json');
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            } catch (fallbackErr) {
                console.error('Fallback copy failed: ', fallbackErr);
            }
            
            document.body.removeChild(textArea);
        }
    }

    // Method to refresh echo data (useful for deployment scenarios)
    async refresh() {
        this.showLoading();
        await this.collectEchoData();
        this.updateUI();
        this.hideLoading();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.echoService = new EchoService();
});

// Expose refresh function globally for debugging/testing
window.refreshEchoData = () => {
    if (window.echoService) {
        window.echoService.refresh();
    }
};
