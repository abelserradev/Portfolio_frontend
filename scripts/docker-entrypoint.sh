#!/bin/sh
set -e

# Coolify/Traefik enrutan al puerto de "Ports Exposes" (3000). Si PORT queda en 5173
# (resto de Nixpacks/Vite), la app escucha en un puerto distinto al proxy → 502.
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="3000"

echo "portfolio: starting on http://${HOSTNAME}:${PORT}"
exec node server.js
