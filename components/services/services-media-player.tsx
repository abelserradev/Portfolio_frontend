'use client';

import { useCallback, useState, type ReactNode } from 'react';
import Image from 'next/image';

interface ServicesMediaPlayerProps {
  readonly videoUrl: string;
  readonly posterUrl: string;
  readonly altPoster: string;
}

function urlVideoHabilitada(url: string): boolean {
  const normalizada = url.trim().toLowerCase();
  if (!normalizada) return false;
  return normalizada !== 'none' && normalizada !== 'false' && normalizada !== 'off';
}

function MediaFrame({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="foundry-plate relative aspect-video w-full overflow-hidden">
      {children}
    </div>
  );
}

function PlaceholderMedia() {
  return (
    <div
      className="flex h-full min-h-[200px] flex-col items-center justify-center bg-foundry-chrome p-6 text-center"
      role="img"
      aria-label="Material promocional próximamente"
    >
      <p className="font-mono text-xs tracking-widest text-foundry-brass">
        MEDIA EN PREPARACIÓN
      </p>
      <p className="mt-2 text-sm text-foundry-type-dim">
        Video e imagen de servicios próximamente
      </p>
    </div>
  );
}

export default function ServicesMediaPlayer({
  videoUrl,
  posterUrl,
  altPoster,
}: ServicesMediaPlayerProps) {
  const hayVideo = urlVideoHabilitada(videoUrl);
  const [modoFallback, setModoFallback] = useState(false);
  const [posterFallo, setPosterFallo] = useState(false);

  const manejarErrorVideo = useCallback(() => {
    setModoFallback(true);
  }, []);

  const manejarErrorPoster = useCallback(() => {
    setPosterFallo(true);
  }, []);

  const mostrarSoloImagen = !hayVideo || modoFallback;
  const mostrarPlaceholder = mostrarSoloImagen && posterFallo;

  if (mostrarPlaceholder) {
    return (
      <MediaFrame>
        <PlaceholderMedia />
      </MediaFrame>
    );
  }

  if (mostrarSoloImagen) {
    return (
      <MediaFrame>
        <Image
          src={posterUrl}
          alt={altPoster}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          onError={manejarErrorPoster}
          priority={false}
        />
      </MediaFrame>
    );
  }

  return (
    <MediaFrame>
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
    </MediaFrame>
  );
}
