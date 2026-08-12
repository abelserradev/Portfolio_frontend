import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bundle mínimo para contenedor (Coolify/Docker), sin depender de Nixpacks
  output: "standalone",
};

export default nextConfig;
