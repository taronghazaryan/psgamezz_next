/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pravatar.cc', 'psgamezz.ru'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // разрешает любые хосты
      },
    ],
  },
};

export default nextConfig;
