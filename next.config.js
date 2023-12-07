/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: process.env.WP_IMAGES_URL,
        pathname: '**'
      }
    ],
  },
};

module.exports = nextConfig;
