/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
};

module.exports = nextConfig;
