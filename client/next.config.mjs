/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "logos-world.net",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/pyapi/:path*",
        destination: "http://localhost:8080/:path*",
      },
    ];
  },
};

export default nextConfig;
