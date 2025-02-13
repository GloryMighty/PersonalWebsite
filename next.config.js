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
  env: {
    NEXT_PUBLIC_VERCEL_DEPLOYMENT: process.env.VERCEL ? 'true' : 'false'
  }
}

module.exports = nextConfig