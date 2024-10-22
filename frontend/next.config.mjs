/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["upload.wikimedia.org", "ko.wikipedia.org", "127.0.0.1"]
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
