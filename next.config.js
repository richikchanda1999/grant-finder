/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
  env: {
    OPENAPI_KEY: process.env.OPENAPI_KEY
  }
}

module.exports = nextConfig