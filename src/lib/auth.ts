import { createClient } from '@/app/lib/supabase/client';
import { User } from '@supabase/supabase-js';

interface AuthResponse {
  success: boolean;
  user: User | null;
  error?: string;
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  const supabase = createClient();
  
  try {
    // First, make sure there's no existing session
    await supabase.auth.signOut();

    // Attempt to sign in and create a new session
    const { data: { session, user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (!session) {
      throw new Error('No session created after sign in');
    }

    return {
      success: true,
      user: user,
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      user: null,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
  const supabase = createClient();
  
  try {
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      user: user,
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      success: false,
      user: null,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

export const signOut = async (): Promise<{ success: boolean; error?: string }> => {
  const supabase = createClient();
  
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }

    // Session will be automatically cleared from cookies

    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};