"use client";

import { obtenerConfigMarca } from '@/lib/site-config';

const TEASER_PLATES = [
  {
    id: 'PLATE 01',
    title: 'Misión destacada',
    meta: 'Desde el catálogo API',
    href: '#misiones',
  },
  {
    id: 'PLATE 02',
    title: 'Servicios',
    meta: 'Misma escala, distinto metal',
    href: '#servicios',
  },
  {
    id: 'PLATE 03',
    title: 'Contacto',
    meta: 'Cotización sin neon',
    href: '#contacto',
  },
] as const;

export default function HeroSection() {
  const marca = obtenerConfigMarca();

  return (
    <section
      id="inicio"
      className="relative scroll-mt-20 border-b border-foundry-seam"
      aria-label="Presentación Buildforge"
    >
      <div className="grid min-h-[calc(100svh-64px)] grid-cols-1 lg:grid-cols-[72px_minmax(0,1fr)_minmax(240px,420px)]">
        <aside
          className="flex items-center justify-center border-b border-foundry-seam bg-foundry-chrome px-4 py-3 lg:border-b-0 lg:border-r lg:px-2 lg:py-6"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #241c14 0 18px, #2e241a 18px 36px)',
          }}
          aria-hidden
        >
          <p className="font-display text-[10px] uppercase tracking-[0.22em] text-[#a89060] lg:text-[11px]">
            <span className="lg:hidden">PATRÓN · FUNDICIÓN · FORMA → PRODUCTO</span>
            <span
              className="hidden lg:inline-block"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              PATRÓN · FUNDICIÓN · FORMA → PRODUCTO
            </span>
          </p>
        </aside>

        <div className="relative flex flex-col justify-center gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:flex-row lg:items-center lg:gap-6 xl:gap-10 xl:px-12">
          <div className="foundry-plate foundry-plate-register foundry-pattern-wood relative mx-auto aspect-square w-full max-w-[min(100%,420px)] shrink-0 border-[3px] border-foundry-brass lg:mx-0 lg:max-w-[min(42vw,440px)]">
            <span className="foundry-plate-id absolute left-4 top-4 z-10">
              PAT-001 · ESCALA 1:1
            </span>
            <span
              className="pointer-events-none absolute inset-[18%] border border-foundry-brass/25"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute bottom-5 right-5 font-display text-[10px] uppercase tracking-[0.18em] text-foundry-brass/70"
              aria-hidden
            >
              Madera de patrón
            </span>
          </div>

          <div className="mx-auto w-full min-w-0 max-w-md shrink-0 lg:mx-0 lg:max-w-[20rem] xl:max-w-[22rem]">
            <h1 className="font-display text-[clamp(2.5rem,5.5vw,3.75rem)] font-bold leading-[0.95] tracking-tight text-foundry-type-bright break-words">
              {marca.brandName}
            </h1>
            <p className="mt-4 max-w-[36ch] text-base leading-snug text-foundry-type-mute sm:text-lg">
              Estudio de software. El trabajo lidera: cada misión es un patrón listo
              para fundir en producto.
            </p>
            <a href="#misiones" className="foundry-cta mt-7">
              Ver misiones
            </a>
          </div>
        </div>

        <aside className="flex flex-col gap-3 border-t border-foundry-seam bg-foundry-chrome p-4 sm:p-5 lg:border-l lg:border-t-0 lg:gap-4 lg:p-7">
          {TEASER_PLATES.map((plate) => (
            <a
              key={plate.id}
              href={plate.href}
              className="foundry-plate foundry-plate-register flex min-h-[5.5rem] flex-1 flex-col justify-between p-3.5 transition-[border-color,box-shadow] hover:border-foundry-brass/70 hover:shadow-[4px_8px_22px_rgba(14,10,6,0.45)] lg:min-h-0"
            >
              <span className="foundry-plate-id">{plate.id}</span>
              <span className="font-display text-lg text-foundry-type-bright sm:text-xl">
                {plate.title}
              </span>
              <span className="text-xs text-foundry-type-dim">{plate.meta}</span>
            </a>
          ))}
        </aside>
      </div>

      <div className="flex items-center justify-between border-t border-foundry-seam bg-foundry-chrome px-5 py-3 font-mono text-[11px] text-foundry-type-dim sm:px-7">
        <span>REGISTER · FIXED SCALE</span>
        <span>buildforge.work</span>
      </div>
    </section>
  );
}
