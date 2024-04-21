import { useContext } from 'react';
import { StateChanged } from '../aliases';
import { AppContext } from '../appState';
import { DashboardState } from '../features/dashboard';
import { AuthState } from '../features';

export function useAppState() {
    const { state, setState } = useContext(AppContext);

    const setAuthState = (dispatch: StateChanged<AuthState>) => {
        setState((state) => ({
            ...state,
            auth: dispatch(state.auth),
        }));
    };

    const setDashboardState = (dispatch: StateChanged<DashboardState>) => {
        setState((state) => ({
            ...state,
            dashboard: dispatch(state.dashboard),
        }));
    };

    return {
        appState: state,
        authState: state.auth,
        dashboardState: state.dashboard,
        setAppState: setState,
        setAuthState,
        setDashboardState,
    };
}

export function useAuthState() {
    const { authState, setAuthState } = useAppState();
    return {
        state: authState,
        setState: setAuthState,
    };
}
