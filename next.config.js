// The listening dashboard (app/listening) is served at the root of its own
// host when LISTENING_HOST is set (music.snehilshah.com); /listening on the
// main site then redirects there.
const LISTENING_HOST = process.env.LISTENING_HOST

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_LISTENING_BASE: LISTENING_HOST ? '' : '/listening'
  },
  async rewrites() {
    if (!LISTENING_HOST) return []
    const onHost = [{ type: 'host', value: LISTENING_HOST }]
    return {
      beforeFiles: [
        { source: '/', has: onHost, destination: '/listening' },
        { source: '/:path((?!_next/|api/|fonts/|favicon|listening(?:/|$)).*)', has: onHost, destination: '/listening/:path' }
      ]
    }
  },
  async redirects() {
    if (!LISTENING_HOST) return []
    return [
      { source: '/listening', missing: [{ type: 'host', value: LISTENING_HOST }], destination: `https://${LISTENING_HOST}/`, permanent: false },
      { source: '/listening/:path*', missing: [{ type: 'host', value: LISTENING_HOST }], destination: `https://${LISTENING_HOST}/:path*`, permanent: false }
    ]
  },
  output: 'standalone',
  transpilePackages:
    process.env.NODE_ENV !== 'production' ? ['next-mdx-remote'] : undefined,
  pageExtensions: ['js', 'jsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    // Inline CSS into the HTML so it doesn't block first render as a separate request
    inlineCss: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io'
      }
    ]
  }
}

export default nextConfig
