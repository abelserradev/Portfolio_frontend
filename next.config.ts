import path from "path";
import type { NextConfig } from "next";

function buildCspDirectives(frameAncestors: "'none'" | "'self'"): string {
  return [
    "default-src 'self'",
    // Cloudflare Web Analytics (beacon inyectado en el proxy); sin esto la consola bloquea beacon.min.js
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https: https://cloudflareinsights.com http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:*",
    `frame-ancestors ${frameAncestors}`,
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

const cspDirectives = buildCspDirectives("'none'");

// Demos embebidas en iframe (misión destacada): mismo origen + Three.js vía jsDelivr
const demoCspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://cdn.jsdelivr.net",
  "connect-src 'self' https: https://cdn.jsdelivr.net",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "Content-Security-Policy", value: cspDirectives },
];

const demoSecurityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "Content-Security-Policy", value: demoCspDirectives },
];

const nextConfig: NextConfig = {
  // Bundle mínimo para contenedor (Coolify/Docker), sin depender de Nixpacks
  output: "standalone",
  // Raíz explícita para file tracing en Linux (evita paths de Windows en el bundle)
  outputFileTracingRoot: path.join(__dirname),
  async headers() {
    // La ruta más específica va al final: Next sobrescribe claves duplicadas con la última coincidencia
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/demos/:path*", headers: demoSecurityHeaders },
    ];
  },
};

export default nextConfig;
