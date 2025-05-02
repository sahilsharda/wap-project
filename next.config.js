/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    typescript: {
        ignoreBuildErrors: false,
    },
    experimental: {
        typedRoutes: true,
    },
    images: {
        domains: ['images.unsplash.com'],
    },
}

module.exports = nextConfig 