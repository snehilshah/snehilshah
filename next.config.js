/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages:
    process.env.NODE_ENV !== 'production' ? ['next-mdx-remote'] : undefined,
  pageExtensions: ['js', 'jsx', 'mdx'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io'
      }
    ]
  },
  experimental: {
    reactCompiler: {
      compilationMode: 'all'
    },
    optimizeCss: true
  }
}

module.exports = nextConfig
