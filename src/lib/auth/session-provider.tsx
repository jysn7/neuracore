'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSessionClient, type SessionState } from '@/lib/auth/session-client';

interface SessionContextValue extends SessionState {
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  initialized: boolean;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const sessionClient = useSessionClient();

  return (
    <SessionContext.Provider value={sessionClient}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}