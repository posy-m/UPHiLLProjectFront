/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["upload.wikimedia.org", "ko.wikipedia.org", "127.0.0.1", "uphillmountain.store"]
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  // next.config.js
  output: 'standalone',
};

export default nextConfig;
