import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bundle mínimo para contenedor (Coolify/Docker), sin depender de Nixpacks
  output: "standalone",
  // Raíz explícita para file tracing en Linux (evita paths de Windows en el bundle)
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
