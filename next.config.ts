import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  // Turbopack is default in Next.js 16
  turbopack: {},
  // Transpile Spline packages so they work with both Turbopack and Webpack
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
};

export default nextConfig;
