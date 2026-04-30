"use client";

import { Tooltip } from 'react-tooltip';

const MONTHS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN'];
const DAYS = 30; // celdas por mes
const generarNivelActividad = (idx: number) => (idx * 7 + Math.floor(idx / DAYS) * 3) % 4;
const activityData = Array.from(
  { length: MONTHS.length * DAYS },
  (_, idx) => generarNivelActividad(idx),
);

const levelColors = ['bg-gray-800', 'bg-cyan-900', 'bg-cyan-500', 'bg-magenta-500'];

export default function ActivityGraph() {
  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <h2 className="mb-10 text-center font-orbitron text-xl tracking-wider text-cyan-300 sm:mb-12 sm:text-2xl">
        {'// ACTIVE_SCAN'}
      </h2>
      <div className="pb-4">
        <div className="flex w-full justify-center gap-2 sm:gap-1">
          {MONTHS.map((month, mi) => (
            <div key={month} className="flex flex-col items-center gap-1">
              <span className="font-mono text-xs text-gray-500 mb-2">{month}</span>
              <div className="flex flex-col gap-1">
                {Array.from({ length: DAYS }).map((_, di) => {
                  const idx = mi * DAYS + di;
                  const level = activityData[idx];
                  return (
                    <div
                      key={`${month}-${di}`}
                      data-tooltip-id="activity-tip"
                      data-tooltip-content={`${level} logs`}
                      className={`h-2.5 w-2.5 rounded-sm transition-colors hover:brightness-150 sm:h-3 sm:w-3 ${levelColors[level]}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <Tooltip id="activity-tip" className="font-mono text-xs" />
      </div>
      <p className="mt-4 px-2 text-center font-mono text-[11px] leading-relaxed text-gray-500 sm:text-xs">
        [Registro de actividad del sistema – últimos 6 ciclos]
      </p>
    </section>
  );
}