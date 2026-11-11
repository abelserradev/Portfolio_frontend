/** Fondo de taller: arena y madera — sin rejilla neón. */
export default function FoundryBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 foundry-sand" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.07) 0%, transparent 42%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 opacity-50"
        style={{
          background:
            "linear-gradient(to top, rgba(28,23,16,0.65) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
