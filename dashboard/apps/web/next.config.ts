import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@lostmonster/ui', '@lostmonster/database'],
};

export default nextConfig;
