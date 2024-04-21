import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { DashboardState } from '../machinery';
import { PartialDispatch } from '../types';

type DashboardContext = {
    dashboardState: DashboardState;
    setDashboardState: PartialDispatch<DashboardState>;
};

const defaultDashboardState = DashboardState.initial;

const defaultDashboardContext: DashboardContext = {
    dashboardState: DashboardState.initial,
    setDashboardState: _ => {},
};

const DashboardContext = createContext(defaultDashboardContext);

export function DashboardProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState(defaultDashboardState);

    return (
        <DashboardContext.Provider
            value={{ dashboardState: state, setDashboardState: setState }}
        >
            {children}
        </DashboardContext.Provider>
    );
}

export const useDashboardContext = () => useContext(DashboardContext);
