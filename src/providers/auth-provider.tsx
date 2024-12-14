import { useAuth, useSession } from '@clerk/nextjs';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  // SignOut,
  // GetToken,
  UserResource,
  ActiveSessionResource,
  CheckAuthorizationWithCustomPermissions,
  // GetTokenOptions,
} from '@clerk/types';

type AuthProviderProps = {
  children: React.ReactNode | JSX.Element;
};

type AuthContextReturn = {
  isSignedIn: boolean | undefined;
  isAuthLoaded: boolean | undefined;
  userId: string | null | undefined;
  sessionId: string | null | undefined;
  user: UserResource | null | undefined;
  session: ActiveSessionResource | null | undefined;
  has: CheckAuthorizationWithCustomPermissions | any | undefined;
};

const initialState = {
  user: null,
  userId: null,
  session: null,
  has: undefined,
  sessionId: null,
  isSignedIn: false,
  isAuthLoaded: false,
};

export const AuthContext = createContext<AuthContextReturn>(initialState);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserResource | null | undefined>();

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
        setUser(session?.user);
      } else {
        setUser(null);
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
