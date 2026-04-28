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
    <footer className="w-full border-t border-cyan-500/30 bg-black/90 backdrop-blur mt-20 py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-xs font-mono text-cyan-500/80">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <span className="text-magenta-400">~$</span>
          <TypeAnimation
            sequence={codeSnippets.flatMap(s => [s, 3000, ''])}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ display: 'inline-block' }}
          />
        </div>
        <div className="flex gap-4">
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