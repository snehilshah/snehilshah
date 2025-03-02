/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io'
      }
    ]
  }
}

module.exports = nextConfig
