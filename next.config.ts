import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/images/**' // match all files under /images
      },
      {
        protocol: 'https',
        hostname: 'production.com',
        pathname: '/images/**' // match all files under /images
      }
    ]
  },
  // Disable cacheComponents to allow dynamic route config
  // cacheComponents: true,
  reactCompiler: true,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
