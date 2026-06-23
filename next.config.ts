import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 compiler: {
    // Only remove console logs in production builds
    removeConsole: process.env.NODE_ENV === 'production',
    
  },
};

export default nextConfig;
