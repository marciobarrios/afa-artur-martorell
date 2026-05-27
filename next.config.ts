import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/afa/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/comissions/tesoreria",
        destination: "/comissions/tresoreria",
        permanent: true,
      },
      {
        source: "/view/afaarturmartorell/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/comissions/comunicacio-i-web",
        destination: "/comissions/comunicacio-web",
        permanent: true,
      },
      {
        source: "/comissions/proteccio-de-dades",
        destination: "/comissions/proteccio-dades",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
