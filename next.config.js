/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages:
    process.env.NODE_ENV !== 'production' ? ['next-mdx-remote'] : undefined,
  pageExtensions: ['js', 'jsx', 'mdx'],
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io'
      }
    ]
  },
}

export default nextConfig
