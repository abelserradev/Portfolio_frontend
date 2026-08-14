import { MISIONES_INTRO } from '@/lib/site-config';

export default function MissionsIntroBlock() {
  return (
    <div className="mb-10 text-center sm:mb-12">
      <h2 className="font-orbitron text-xl tracking-wider text-cyan-300 sm:text-2xl">
        {MISIONES_INTRO.encabezado}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl font-tech text-sm text-gray-400 sm:text-base">
        {MISIONES_INTRO.subtitulo}
      </p>
    </div>
  );
}
