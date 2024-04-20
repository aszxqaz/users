import { SignInDto, SignUpDto } from '../api/types';
import { AuthState, DashboardState } from './features';

export type AppState = {
    auth: AuthState;
    dashboard: DashboardState;
};

export type User = {
    email: string;
    name: string;
};

export type SignInArgs = SignInDto;
export type SignUpArgs = SignUpDto;
