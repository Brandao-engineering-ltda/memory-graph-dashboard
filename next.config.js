/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Allow reading files from the parent directory for memory integration
  serverComponentsExternalPackages: ['d3'],
}