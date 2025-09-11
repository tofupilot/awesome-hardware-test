/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: false, // Use temporary redirect for language detection
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-default-locale',
            value: 'en',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
