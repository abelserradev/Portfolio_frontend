/** Brass plate mark for the workshop assistant — keeps chat chrome in-world. */
export function AssistantAvatar({
  size = 40,
  className = '',
}: {
  readonly size?: number;
  readonly className?: string;
}) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center border border-foundry-brass/70 bg-foundry-chrome ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className="absolute inset-0.5 border border-dashed border-foundry-brass/35"
        aria-hidden
      />
      <span
        className="relative font-display font-bold tracking-tight text-foundry-brass"
        style={{ fontSize: Math.max(10, Math.round(size * 0.28)) }}
      >
        {'</>'}
      </span>
    </div>
  );
}
