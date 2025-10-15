"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/app/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface SessionState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export const useSession = (requireAuth: boolean = true) => {
  const [state, setState] = useState<SessionState>({
    user: null,
    loading: true,
    error: null,
  });
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (!session?.user && requireAuth) {
          // Let middleware handle the redirect
          return;
        }

        setState({
          user: session?.user || null,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error as Error,
        }));
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState(prev => ({
          ...prev,
          user: session?.user || null,
          loading: false,
        }));
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, requireAuth, router]);

  return state;
};