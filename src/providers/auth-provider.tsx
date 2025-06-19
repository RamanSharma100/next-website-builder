'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextReturn = {
  isSignedIn: boolean;
  isAuthLoaded: boolean;
  user: User | null;
  session: Session | null;
  userId: string | null;
  sessionId: string | null;
};

const initialState: AuthContextReturn = {
  user: null,
  session: null,
  userId: null,
  sessionId: null,
  isSignedIn: false,
  isAuthLoaded: false,
};

export const AuthContext = createContext<AuthContextReturn>(initialState);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthLoaded(true);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userId: user?.id ?? null,
        sessionId: session?.user?.id ?? null,
        isSignedIn: !!user,
        isAuthLoaded,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthenticate = () => useContext(AuthContext);

export default AuthProvider;
