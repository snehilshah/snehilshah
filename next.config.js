/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        // port: '',
        // pathname: '/',
      },
    ],
  },
}

module.exports = nextConfig
