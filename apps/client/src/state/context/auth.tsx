import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { AuthState } from '../machinery';
import { PartialDispatch } from '../types';

type AuthContext = {
    authState: AuthState;
    setAuthState: PartialDispatch<AuthState>;
};

const defaultAuthState = AuthState.initial;

const defaultAuthContext: AuthContext = {
    authState: AuthState.initial,
    setAuthState: _ => () => {},
};

const AuthContext = createContext(defaultAuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState<AuthState>(defaultAuthState);

    return (
        <AuthContext.Provider
            value={{ authState: state, setAuthState: setState }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
