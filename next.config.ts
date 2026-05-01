import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Export estático para hosting tipo Hostinger (subir carpeta `dist` / contenido de `out`). */
  output: "export",
  /** Carpetas por ruta con `index.html` (mejor en Apache / Hostinger). */
  trailingSlash: true,
  images: {
    unoptimized: true,
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
