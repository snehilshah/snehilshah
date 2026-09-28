/** @type {import('next').NextConfig} */
const nextConfig = {
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
