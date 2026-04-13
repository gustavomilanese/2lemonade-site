import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Refuerzo para hosting (p. ej. Vercel): reglas explícitas además de `redirect()` en páginas. */
  async redirects() {
    return [
      { source: "/", destination: "/l/saas", permanent: false },
      { source: "/l", destination: "/l/saas", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
