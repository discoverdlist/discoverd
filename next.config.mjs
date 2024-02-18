/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
    redirects: async () => {
        return [
            {
                source: '/discord',
                destination: 'https://discord.gg/nextjs',
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com'
            }
        ]
    },
    pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx', 'md'],
    cleanDistDir: true,
    eslint: {
        dirs: ['src'],
    },
    compress: true,
    publicRuntimeConfig: {
        staticFolder: '/public',
    },
};

export default nextConfig;
