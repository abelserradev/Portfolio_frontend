
export default function CyberBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Rejilla de perspectiva */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
        }}
      />
      {/* Viñeta radial */}
      <div className="absolute inset-0 bg-radial-gradient(circle, transparent 60%, black 100%)" />
    </div>
  );
}