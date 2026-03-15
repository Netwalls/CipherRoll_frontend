/** @type {import('next').NextConfig} */
const GATEWAY = "https://gateway.sepolia.zama.ai";

const nextConfig = {
  reactStrictMode: true,
  // Proxy all /api/gateway/* requests to the Zama gateway server-side,
  // bypassing any CORS restrictions in the browser.
  async rewrites() {
    return [
      {
        source: "/api/gateway/:path*",
        destination: `${GATEWAY}/:path*`,
      },
    ];
  },
  webpack: (config) => {
    // fhevmjs uses tfhe_bg.wasm — tell webpack to handle it
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig;
