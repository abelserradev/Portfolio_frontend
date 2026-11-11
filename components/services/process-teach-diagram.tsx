/** Diagrama de taller: forma → molde → desarrollo → producto (única pieza didáctica). */
export default function ProcessTeachDiagram() {
  const steps = [
    { id: '01', label: 'Forma', hint: 'Idea / brief' },
    { id: '02', label: 'Molde', hint: 'Arquitectura' },
    { id: '03', label: 'Desarrollo', hint: 'Implementación' },
    { id: '04', label: 'Producto', hint: 'Entrega' },
  ] as const;

  return (
    <figure
      className="mx-auto mt-10 max-w-3xl border border-foundry-seam bg-foundry-chrome/70 p-4 sm:p-6"
      aria-label="Proceso de taller: forma, molde, desarrollo, producto"
    >
      <figcaption className="mb-5 text-center font-display text-sm tracking-wide text-foundry-type-mute">
        Del patrón al producto
      </figcaption>
      <svg
        viewBox="0 0 640 120"
        className="mx-auto hidden h-auto w-full max-w-2xl sm:block"
        role="img"
        aria-hidden
      >
        <defs>
          <marker
            id="foundry-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="#c9a227" />
          </marker>
        </defs>
        {steps.map((step, i) => {
          const x = 40 + i * 160;
          return (
            <g key={step.id}>
              <rect
                x={x}
                y={28}
                width={100}
                height={64}
                fill="#2a2218"
                stroke="#5c4a2e"
                strokeWidth="1.5"
              />
              <rect
                x={x + 8}
                y={36}
                width={84}
                height={48}
                fill="none"
                stroke="#8b6914"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={x + 50}
                y={58}
                textAnchor="middle"
                fill="#c9a227"
                fontFamily="ui-monospace, Consolas, monospace"
                fontSize="10"
              >
                {step.id}
              </text>
              <text
                x={x + 50}
                y={74}
                textAnchor="middle"
                fill="#f3ead8"
                fontFamily="system-ui, sans-serif"
                fontSize="13"
                fontWeight="700"
              >
                {step.label}
              </text>
              {i < steps.length - 1 ? (
                <line
                  x1={x + 108}
                  y1={60}
                  x2={x + 152}
                  y2={60}
                  stroke="#c9a227"
                  strokeWidth="1.5"
                  markerEnd="url(#foundry-arrow)"
                />
              ) : null}
            </g>
          );
        })}
      </svg>
      <ol className="grid grid-cols-2 gap-3 sm:hidden">
        {steps.map((step) => (
          <li
            key={step.id}
            className="foundry-plate flex flex-col gap-1 p-3"
          >
            <span className="foundry-plate-id">{step.id}</span>
            <span className="font-display text-base text-foundry-type-bright">
              {step.label}
            </span>
            <span className="text-xs text-foundry-type-dim">{step.hint}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
