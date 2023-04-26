/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function(config, options) {
    if(!options.isServer) {
			config.resolve.fallback.fs = false
		}

    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
  env: {
    OPENAI_KEY: process.env.OPENAI_KEY
  }
}

module.exports = nextConfig