import { useAuth, useSession } from '@clerk/nextjs';
import {
  UserResource,
  ActiveSessionResource,
  CheckAuthorizationWithCustomPermissions,
} from '@clerk/types';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthProviderProps = {
  children: React.ReactNode | JSX.Element;
};

type AuthContextReturn = {
  isSignedIn: boolean | undefined;
  isAuthLoaded: boolean | undefined;
  userId: string | null | undefined;
  sessionId: string | null | undefined;
  user: UserResource | undefined;
  session: ActiveSessionResource | null | undefined;
  has: CheckAuthorizationWithCustomPermissions | any | undefined;
};

const initialState = {
  user: undefined,
  userId: null,
  session: undefined,
  has: undefined,
  sessionId: null,
  isSignedIn: false,
  isAuthLoaded: false,
};

export const AuthContext = createContext<AuthContextReturn>(initialState);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserResource | undefined>();

  const { session } = useSession();
  const {
    // getToken,
    isLoaded: isAuthLoaded,
    userId,
    sessionId,
    has,
    isSignedIn: isAuthenticated,
    // signOut
  } = useAuth();

  useEffect(() => {
    if (isAuthLoaded) {
      if (isAuthenticated) {
        setUser(session?.user as UserResource | undefined);
      } else {
        setUser(undefined);
      }
    }
  }, [isAuthLoaded, isAuthenticated, session]);

  return (
    <AuthContext.Provider
      value={{
        has,
        user,
        userId,
        session,
        sessionId,
        isAuthLoaded,
        isSignedIn: isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthenticate = () => useContext(AuthContext);

export default AuthProvider;
