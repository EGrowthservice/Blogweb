/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.igallery.blog',
      },
      {
        protocol: 'https',
        hostname: 'cdn.igallery.blog',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      {
        source: '/celebrity',
        destination: '/celebrities',
        permanent: true,
      },
      {
        source: '/category/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
