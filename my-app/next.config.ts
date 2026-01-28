import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgs.xkcd.com",
      },
    ],
  },
};

export default nextConfig;
