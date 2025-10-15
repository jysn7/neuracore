import { createClient } from '@/app/lib/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User, Session } from '@supabase/supabase-js';

export interface SessionState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: Error | null;
  initialized: boolean;
}

export const useSessionClient = () => {
  const supabase = createClient();
  
  // Synchronous initial state from stored session
  const initialSession = supabase.auth.getSession().then(({ data: { session }}) => session);
  
  const [state, setState] = useState<SessionState>({
    session: null,
    user: null,
    loading: Boolean(initialSession), // Start loading if we have a stored session
    error: null,
    initialized: false
  });

  const router = useRouter();

  useEffect(() => {
    // Initialize and get persisted session
    const initializeSession = async () => {
      try {
        // First try to get the persisted session
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        // If we have a session, validate it
        if (session) {
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          if (userError) throw userError;

          console.log("still signed in", { user: user?.email });
          setState(prev => ({
            ...prev,
            session,
            user: user || null,
            loading: false,
            initialized: true
          }));
        } else {
          console.log("no valid session found");
          setState(prev => ({
            ...prev,
            loading: false,
            initialized: true
          }));
        }
      } catch (error) {
        console.error('Error initializing session:', error);
        setState(prev => ({
          ...prev,
          error: error as Error,
          loading: false,
          initialized: true
        }));
      }
    };

    initializeSession();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (event === 'SIGNED_IN') {
          // Validate and update session
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          if (userError) throw userError;

          console.log("still signed in", { user: user?.email });
          setState(prev => ({
            ...prev,
            session,
            user: user || null,
            loading: false,
            initialized: true
          }));
          
          router.refresh();
        } else if (event === 'SIGNED_OUT') {
          console.log("user signed out");
          setState(prev => ({
            ...prev,
            session: null,
            user: null,
            loading: false,
            initialized: true
          }));
          
          router.push('/login');
        } else if (event === 'TOKEN_REFRESHED') {
          // Update session state with refreshed token
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          if (userError) throw userError;

          setState(prev => ({
            ...prev,
            session,
            user: user || null,
            loading: false,
            initialized: true
          }));
        }
      } catch (error) {
        console.error('Error handling auth state change:', error);
        setState(prev => ({
          ...prev,
          error: error as Error,
          loading: false
        }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      setState(prev => ({
        ...prev,
        error: error as Error
      }));
    }
  };

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session?.user) {
        console.log("still signed in", { user: session.user.email });
      }
      
      setState(prev => ({
        ...prev,
        session,
        user: session?.user || null,
        loading: false,
        initialized: true
      }));
    } catch (error) {
      console.error('Error refreshing session:', error);
      setState(prev => ({
        ...prev,
        error: error as Error
      }));
    }
  };

  return {
    ...state,
    signOut,
    refreshSession
  };
};