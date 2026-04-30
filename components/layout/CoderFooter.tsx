"use client";

import { TypeAnimation } from 'react-type-animation';

const codeSnippets = [
  'const hire = await fetch("/api/hire");',
  'git commit -m "Añadida nueva misión: E-commerce"',
  'SELECT * FROM opportunities WHERE remote = true;',
  'python build.py — deploy',
  'npx create-next-app@latest portfolio --cyberpunk',
];

export default function CodeFooter() {
  return (
    <footer className="mt-14 w-full border-t border-cyan-500/30 bg-black/90 px-4 py-6 backdrop-blur sm:mt-20">
      <div className="container mx-auto flex min-w-0 flex-col items-center justify-between gap-4 font-mono text-xs text-cyan-500/80 md:flex-row">
        <div className="flex w-full min-w-0 items-center justify-center gap-2 md:mb-0 md:w-auto md:justify-start">
          <span className="shrink-0 text-magenta-400">~$</span>
          <TypeAnimation
            sequence={codeSnippets.flatMap(s => [s, 3000, ''])}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="min-w-0 max-w-full truncate text-center md:text-left"
            style={{ display: 'inline-block' }}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] sm:text-xs">
          <span>NODO: 0x42A1F3</span>
          <span>UPTIME: {new Date().getFullYear() - 2020}a</span>
          <span>LOCALIDAD: CYBER.SPACE</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <span className="text-[10px] font-mono text-gray-600">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}