/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailus.io',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
