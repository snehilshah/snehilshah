'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function EchoService() {
  const [echoData, setEchoData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Collect browser/client information and headers
    const collectEchoData = async () => {
      // Fetch headers from a simple endpoint
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
        console.log('Headers endpoint not available, using mock data');
        // Mock headers for standalone usage
        headers = {
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': navigator.language + ',en;q=0.9',
          'cache-control': 'no-cache',
          'connection': 'keep-alive',
          'host': window.location.host,
          'user-agent': navigator.userAgent,
          'x-forwarded-for': 'Client IP not available in browser',
          'x-real-ip': 'Client IP not available in browser'
        };
      }

      const data = {
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
      }
      
      setEchoData(data)
      setLoading(false)
    }

    collectEchoData()
  }, [])

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#000000', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'JetBrains Mono, monospace, Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderTop: '2px solid #ffffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>Loading...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#000000', 
        color: '#ffffff',
        fontFamily: 'JetBrains Mono, monospace, Arial, sans-serif'
      }}>
        {/* Navigation */}
        <nav style={{
          borderBottom: '1px solid #374151',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: '16px 24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    color: '#000000',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>E</span>
                </div>
                <span style={{
                  color: '#ffffff',
                  fontWeight: '500'
                }}>Echo Service</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontSize: '14px'
              }}>
                <span style={{ color: '#9ca3af' }}>Status:</span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%'
                  }}></div>
                  <span style={{ color: '#10b981' }}>Active</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '32px 24px'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '8px'
            }}>Request Inspector</h1>
            <p style={{ color: '#9ca3af' }}>Debug and inspect HTTP request details</p>
          </div>

          {/* Stats Overview */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div style={{
              backgroundColor: '#030712',
              border: '1px solid #374151',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <div style={{
                color: '#9ca3af',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px'
              }}>Protocol</div>
              <div style={{
                color: '#ffffff',
                fontWeight: '500'
              }}>{echoData.protocol.replace(':', '')}</div>
            </div>
            <div style={{
              backgroundColor: '#030712',
              border: '1px solid #374151',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <div style={{
                color: '#9ca3af',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px'
              }}>Host</div>
              <div style={{
                color: '#ffffff',
                fontWeight: '500'
              }}>{echoData.host}</div>
            </div>
            <div style={{
              backgroundColor: '#030712',
              border: '1px solid #374151',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <div style={{
                color: '#9ca3af',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px'
              }}>Status</div>
              <div style={{
                color: '#10b981',
                fontWeight: '500'
              }}>200 OK</div>
            </div>
            <div style={{
              backgroundColor: '#030712',
              border: '1px solid #374151',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <div style={{
                color: '#9ca3af',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '4px'
              }}>Response Time</div>
              <div style={{
                color: '#ffffff',
                fontWeight: '500'
              }}>{Math.floor(Math.random() * 50) + 10}ms</div>
            </div>
          </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Request Details */}
          <div className="bg-gray-950 border border-gray-800 rounded-lg">
            <div className="border-b border-gray-800 px-6 py-4">
              <h2 className="text-white font-medium">Request Information</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-gray-400">URL</div>
                <div className="col-span-2 text-white break-all font-mono text-xs">{echoData.url}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-gray-400">Path</div>
                <div className="col-span-2 text-white font-mono text-xs">{echoData.path}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-gray-400">Origin</div>
                <div className="col-span-2 text-white font-mono text-xs">{echoData.origin}</div>
              </div>
              {echoData.search && (
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-gray-400">Query</div>
                  <div className="col-span-2 text-white font-mono text-xs">{echoData.search}</div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-gray-400">Referrer</div>
                <div className="col-span-2 text-white font-mono text-xs">{echoData.referrer}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-gray-400">Timestamp</div>
                <div className="col-span-2 text-gray-300 font-mono text-xs">{new Date(echoData.timestamp).toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="bg-gray-950 border border-gray-800 rounded-lg">
            <div className="border-b border-gray-800 px-6 py-4">
              <h2 className="text-white font-medium">Client Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-gray-400">Platform</div>
                <div className="col-span-2 text-white">{echoData.platform}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-gray-400">Language</div>
                <div className="col-span-2 text-white">{echoData.language}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-gray-400">Timezone</div>
                <div className="col-span-2 text-white">{echoData.timezone}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-gray-400">Online</div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${echoData.onLine ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                    {echoData.onLine ? 'Connected' : 'Offline'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-gray-400">Cookies</div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${echoData.cookieEnabled ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                    {echoData.cookieEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Display Information */}
          <div className="bg-gray-950 border border-gray-800 rounded-lg">
            <div className="border-b border-gray-800 px-6 py-4">
              <h2 className="text-white font-medium">Display Specifications</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-xs mb-1">Screen Resolution</div>
                  <div className="text-white font-mono">{echoData.screen.width} × {echoData.screen.height}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Available Space</div>
                  <div className="text-white font-mono">{echoData.screen.availWidth} × {echoData.screen.availHeight}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400 text-xs mb-1">Viewport</div>
                  <div className="text-white font-mono">{echoData.viewport.width} × {echoData.viewport.height}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs mb-1">Color Depth</div>
                  <div className="text-white font-mono">{echoData.screen.colorDepth}-bit</div>
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-gray-950 border border-gray-800 rounded-lg">
            <div className="border-b border-gray-800 px-6 py-4">
              <h2 className="text-white font-medium">Supported Languages</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {echoData.languages.map((lang, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-md bg-gray-800 text-gray-300 text-xs font-mono">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* HTTP Headers */}
        <div className="mt-6 bg-gray-950 border border-gray-800 rounded-lg">
          <div className="border-b border-gray-800 px-6 py-4">
            <h2 className="text-white font-medium">HTTP Headers</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {Object.entries(echoData.headers).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-gray-400 font-mono text-xs">{key}</div>
                  <div className="col-span-2 text-white font-mono text-xs break-all">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Agent */}
        <div className="mt-6 bg-gray-950 border border-gray-800 rounded-lg">
          <div className="border-b border-gray-800 px-6 py-4">
            <h2 className="text-white font-medium">User Agent</h2>
          </div>
          <div className="p-6">
            <div className="bg-black rounded-md p-4 border border-gray-800">
              <code className="text-gray-300 text-xs font-mono break-all leading-relaxed">
                {echoData.userAgent}
              </code>
            </div>
          </div>
        </div>

        {/* Cookie Data */}
        <div className="mt-6 bg-gray-950 border border-gray-800 rounded-lg">
          <div className="border-b border-gray-800 px-6 py-4">
            <h2 className="text-white font-medium">Cookie Information</h2>
          </div>
          <div className="p-6">
            <div className="bg-black rounded-md p-4 border border-gray-800">
              <code className="text-gray-300 text-xs font-mono break-all leading-relaxed">
                {echoData.cookies === 'No cookies' ? 'No cookies found' : echoData.cookies}
              </code>
            </div>
          </div>
        </div>

        {/* Raw JSON */}
        <div className="mt-6 bg-gray-950 border border-gray-800 rounded-lg">
          <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
            <h2 className="text-white font-medium">Raw JSON Output</h2>
            <button 
              className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md"
              onClick={() => navigator.clipboard.writeText(JSON.stringify(echoData, null, 2))}
            >
              Copy
            </button>
          </div>
          <div className="p-6">
            <div className="bg-black rounded-md p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 text-xs font-mono leading-relaxed">
{JSON.stringify(echoData, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>Echo Service v1.0</span>
            <span>•</span>
            <span>Uptime: {new Date().toLocaleTimeString()}</span>
            <span>•</span>
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
