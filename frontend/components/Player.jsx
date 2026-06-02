'use client';

import { useState } from 'react';

export default function Player() {
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <div className="fixed bottom-12 left-0 right-0 z-40 border-t border-white/10 bg-black/90 px-4 py-3 backdrop-blur md:bottom-0 md:left-72">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-harmonic-neon to-harmonic-lime font-black text-black">H</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">Aurora de Vidro</p>
              <p className="truncate text-xs text-harmonic-muted">Lia Nova</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setLiked(!liked)} className={`rounded-full px-3 py-2 ${liked ? 'text-harmonic-lime' : 'text-white'}`}>♥</button>
              <button onClick={() => setPlaying(!playing)} className="grid h-11 w-11 place-items-center rounded-full bg-white font-bold text-black hover:bg-harmonic-lime">{playing ? 'Ⅱ' : '▶'}</button>
            </div>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-harmonic-lime to-harmonic-neon" />
          </div>
        </div>
      </div>
    </div>
  );
}
