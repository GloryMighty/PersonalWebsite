/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // Ensures consistent build output
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ]
  },
  // Ensure consistent environment across dev and production
  env: {
    NEXT_PUBLIC_VERCEL_DEPLOYMENT: process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT || 'false'
  }
}

module.exports = nextConfig