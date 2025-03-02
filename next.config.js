/** @type {import('next').NextConfig} */
const createMDX = require('@next/mdx')
const nextConfig = {
  pageExtensions: ['mdx', 'js', 'jsx', 'ts', 'tsx'],
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

const withMDX = createMDX({})
module.exports = withMDX(nextConfig)
