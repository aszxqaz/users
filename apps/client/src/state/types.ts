import { SignInDto, SignUpDto } from '../api/types';
import { AuthState, DashboardState } from './features';

export type AppState = {
    auth: AuthState;
    dashboard: DashboardState;
};

export type User = {
    id: number;
    email: string;
    name: string;
    isBlocked: boolean;
};

export type SignInArgs = SignInDto;
export type SignUpArgs = SignUpDto;
