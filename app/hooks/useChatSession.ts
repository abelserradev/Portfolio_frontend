'use client';

import { useCallback, useState } from 'react';

const STORAGE_KEY = 'buildforge_chat_session_id';

function leerSessionInicial(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return sessionStorage.getItem(STORAGE_KEY);
}

export function useChatSession() {
  const [sessionId, setSessionId] = useState<string | null>(leerSessionInicial);

  const persistirSession = useCallback((id: string) => {
    setSessionId(id);
    sessionStorage.setItem(STORAGE_KEY, id);
  }, []);

  const reiniciarSession = useCallback(() => {
    setSessionId(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  return { sessionId, persistirSession, reiniciarSession };
}
