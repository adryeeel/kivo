import type { NextConfig } from 'next';

const config: NextConfig = {
    agentRules: false,
    typedRoutes: true,
    reactCompiler: true,
    output: 'standalone',
    transpilePackages: ['@project-template/ui'],
};

export default config;
