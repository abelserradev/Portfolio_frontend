'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ServicesMediaPlayerProps {
  readonly videoUrl: string;
  readonly posterUrl: string;
  readonly altPoster: string;
}

export default function ServicesMediaPlayer({
  videoUrl,
  posterUrl,
  altPoster,
}: ServicesMediaPlayerProps) {
  const [modoFallback, setModoFallback] = useState(false);
  const [posterFallo, setPosterFallo] = useState(false);

  const manejarErrorVideo = useCallback(() => {
    setModoFallback(true);
  }, []);

  const manejarErrorPoster = useCallback(() => {
    setPosterFallo(true);
  }, []);

  const mostrarPlaceholder = modoFallback && posterFallo;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative aspect-video w-full overflow-hidden rounded-sm border border-cyan-500/40 bg-black/60 shadow-[0_0_24px_rgba(6,182,212,0.15)]"
      style={{
        clipPath: 'polygon(0% 0%, 97% 0%, 100% 6%, 100% 100%, 3% 100%, 0% 94%)',
      }}
    >
      {mostrarPlaceholder ? (
        <div
          className="flex h-full min-h-[200px] flex-col items-center justify-center bg-linear-to-br from-cyan-950/80 via-black to-fuchsia-950/60 p-6 text-center"
          role="img"
          aria-label="Material promocional próximamente"
        >
          <p className="font-mono text-xs tracking-widest text-cyan-400/80">
            {'// MEDIA_PRÓXIMAMENTE'}
          </p>
          <p className="mt-2 font-tech text-sm text-gray-400">
            Video e imagen de servicios en preparación
          </p>
        </div>
      ) : modoFallback ? (
        <Image
          src={posterUrl}
          alt={altPoster}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          onError={manejarErrorPoster}
          priority={false}
        />
      ) : (
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={posterUrl}
          onError={manejarErrorVideo}
          aria-label="Video de servicios de software Buildforge"
        >
          <source src={videoUrl} type="video/mp4" />
          <track kind="captions" />
        </video>
      )}
    </motion.div>
  );
}
