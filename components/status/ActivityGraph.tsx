"use client";

import { Tooltip } from 'react-tooltip';
import { useState, useEffect } from 'react';

const MONTHS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN'];
const DAYS = 30; // celdas por mes
const generateData = () => Array.from({ length: MONTHS.length * DAYS }, () => Math.floor(Math.random() * 4));

const levelColors = ['bg-gray-800', 'bg-cyan-900', 'bg-cyan-500', 'bg-magenta-500'];

export default function ActivityGraph() {
  const [data, setData] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setData(generateData());
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch on random data

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="font-orbitron text-2xl text-center mb-12 text-cyan-300 tracking-wider">
        {'// ACTIVE_SCAN'}
      </h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex justify-center gap-1 min-w-[600px]">
          {MONTHS.map((month, mi) => (
            <div key={month} className="flex flex-col items-center gap-1">
              <span className="font-mono text-xs text-gray-500 mb-2">{month}</span>
              <div className="flex flex-col gap-1">
                {Array.from({ length: DAYS }).map((_, di) => {
                  const idx = mi * DAYS + di;
                  const level = data[idx];
                  return (
                    <div
                      key={di}
                      data-tooltip-id="activity-tip"
                      data-tooltip-content={`${level} logs`}
                      className={`w-3 h-3 rounded-sm ${levelColors[level]} transition-colors hover:brightness-150`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <Tooltip id="activity-tip" className="font-mono text-xs" />
      </div>
      <p className="text-center font-mono text-xs text-gray-500 mt-4">
        [Registro de actividad del sistema – últimos 6 ciclos]
      </p>
    </section>
  );
}