/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.tatra-trails.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Optimize for production
  swcMinify: true,
}

module.exports = nextConfig
