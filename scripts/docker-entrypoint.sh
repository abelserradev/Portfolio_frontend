#!/bin/sh
set -e

export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${PORT:-5173}"

echo "portfolio: starting on http://${HOSTNAME}:${PORT}"
exec node server.js
