'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function EchoService() {
  const [echoData, setEchoData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Collect browser/client information
    const collectEchoData = () => {
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
      <div className="min-h-screen bg-black flex items-center justify-center" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
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
      <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {/* Navigation */}
        <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-black text-xs font-bold">E</span>
                </div>
                <span className="text-white font-medium">Echo Service</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-400">Status:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400">Active</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">Request Inspector</h1>
            <p className="text-gray-400">Debug and inspect HTTP request details</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Protocol</div>
              <div className="text-white font-medium">{echoData.protocol.replace(':', '')}</div>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Host</div>
              <div className="text-white font-medium">{echoData.host}</div>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Status</div>
              <div className="text-green-400 font-medium">200 OK</div>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Response Time</div>
              <div className="text-white font-medium">{Math.random().toFixed(0)}ms</div>
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
