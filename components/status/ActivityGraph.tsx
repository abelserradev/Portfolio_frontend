"use client";

import { Tooltip } from 'react-tooltip';
import { useGithubActivity } from '@/hooks/useGithub';

const levelColors = [
  'bg-[#241c14]',
  'bg-foundry-seam',
  'bg-foundry-brass-deep',
  'bg-foundry-brass',
];

export default function ActivityGraph() {
  const { activity } = useGithubActivity();
  const celdasPorMes = activity.months.map((month) => (
    activity.cells.filter((cell) => cell.month === month)
  ));

  return (
    <section className="container mx-auto px-4 py-12 sm:py-14">
      <h2 className="mb-10 text-center font-display text-xl tracking-wide text-foundry-type-bright sm:mb-12 sm:text-2xl">
        Ritmo de taller
      </h2>
      <div className="pb-4">
        <div className="flex w-full justify-center gap-2 sm:gap-1">
          {activity.months.map((month, monthIndex) => (
            <div key={month} className="flex flex-col items-center gap-1">
              <span className="mb-2 font-mono text-[10px] text-foundry-type-dim">
                {month}
              </span>
              <div className="flex flex-col gap-1">
                {celdasPorMes[monthIndex].map((cell) => (
                  <div
                    key={`${month}-${cell.day}`}
                    data-tooltip-id="activity-tip"
                    data-tooltip-content={`${cell.level} logs`}
                    className={`h-2.5 w-2.5 transition-colors hover:brightness-125 sm:h-3 sm:w-3 ${levelColors[cell.level] ?? levelColors[0]}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <Tooltip id="activity-tip" className="font-mono text-xs" />
      </div>
      <p className="mt-4 px-2 text-center text-[11px] leading-relaxed text-foundry-type-dim sm:text-xs">
        Registro de actividad — últimos 6 ciclos
      </p>
    </section>
  );
}
