/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/pyapi/:path*', 
        destination: 'http://localhost:3000/:path*',
      },
    ];
  },
};

export default nextConfig;
