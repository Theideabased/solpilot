const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // Enable standalone output for Docker optimization
  output: 'standalone',
  env: {
    CUSTOM_VAR: process.env.CUSTOM_VAR,
  },
  // Optimize images for production
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
