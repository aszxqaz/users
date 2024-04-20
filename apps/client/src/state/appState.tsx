import { PropsWithChildren, createContext, useState } from 'react';
import { Dispatch } from './aliases';
import { AppState } from './types';
import { AuthState, DashboardState } from './features';

const defaultAppState: AppState = {
    auth: AuthState.initial,
    dashboard: DashboardState.initial,
};

type AppContext = {
    state: AppState;
    setState: Dispatch<AppState>;
};

export const AppContext = createContext<AppContext>({
    state: defaultAppState,
    setState: () => defaultAppState,
});

export function AppContextProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState(defaultAppState);

    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
}
